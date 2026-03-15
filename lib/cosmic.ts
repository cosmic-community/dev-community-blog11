import { createBucketClient } from '@cosmicjs/sdk'
import { marked } from 'marked'
import {
  Category,
  Comment,
  CosmicResponse,
  Post,
  PostWithEngagement,
  EngagementMap
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = (await cosmic.objects
      .find({ type: 'posts' })
      .depth(1)) as CosmicResponse<Post>
    return response.objects.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime()
      const dateB = new Date(b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'posts', slug }).depth(1)
    const post = response.object as Post
    if (!post || !post.metadata) return null
    return post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = (await cosmic.objects
      .find({ type: 'categories' })
      .depth(1)) as CosmicResponse<Category>
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects.findOne({ type: 'categories', slug }).depth(1)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

export async function getPostsByCategoryId(categoryId: string): Promise<Post[]> {
  try {
    const response = (await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .depth(1)) as CosmicResponse<Post>
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by category')
  }
}

export async function getComments(): Promise<Comment[]> {
  try {
    const response = (await cosmic.objects
      .find({ type: 'comments' })
      .depth(1)) as CosmicResponse<Comment>
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch comments')
  }
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  try {
    const response = (await cosmic.objects
      .find({ type: 'comments', 'metadata.post': postId })
      .depth(1)) as CosmicResponse<Comment>
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch comments for post')
  }
}

export function getTotalLikesForComments(comments: Comment[]): number {
  return comments.reduce((sum, comment) => sum + (comment.metadata?.likes_count ?? 0), 0)
}

export async function getPostsEngagementMap(): Promise<EngagementMap> {
  const comments = await getComments()
  const map: EngagementMap = {}

  comments.forEach((comment) => {
    const postId = comment.metadata?.post?.id
    if (!postId) return
    if (!map[postId]) {
      map[postId] = { totalLikes: 0, commentsCount: 0 }
    }
    map[postId].commentsCount += 1
    map[postId].totalLikes += comment.metadata?.likes_count ?? 0
  })

  return map
}

export async function getPostsWithEngagement(): Promise<PostWithEngagement[]> {
  const [posts, engagementMap] = await Promise.all([getPosts(), getPostsEngagementMap()])

  return posts.map((post) => ({
    ...post,
    engagement: engagementMap[post.id] || { totalLikes: 0, commentsCount: 0 }
  }))
}

export function getMarkdownHtml(markdown: string): string {
  return marked.parse(markdown || '')
}