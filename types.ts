export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  type: string
  created_at?: string
  modified_at?: string
  metadata?: Record<string, unknown>
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata?: {
    name?: string
    description?: string
  }
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata?: {
    title?: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    } | null
    category?: Category
  }
}

export interface Comment extends CosmicObject {
  type: 'comments'
  metadata?: {
    post?: Post
    author_name?: string
    content?: string
    likes_count?: number
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

export interface EngagementSummary {
  totalLikes: number
  commentsCount: number
}

export type EngagementMap = Record<string, EngagementSummary>

export interface PostWithEngagement extends Post {
  engagement: EngagementSummary
}