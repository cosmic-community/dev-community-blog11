// app/posts/[slug]/page.tsx
import CategoryPill from '@/components/CategoryPill'
import CommentsSection from '@/components/CommentsSection'
import EmptyState from '@/components/EmptyState'
import { getPostBySlug, getCommentsByPostId, getMarkdownHtml, getTotalLikesForComments } from '@/lib/cosmic'
import { Post } from '@/types'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return (
      <EmptyState
        title="Post não encontrado"
        description="Este conteúdo pode ter sido removido ou não está publicado."
      />
    )
  }

  const comments = await getCommentsByPostId(post.id)
  const totalLikes = getTotalLikesForComments(comments)
  const contentHtml = getMarkdownHtml(post.metadata?.content || '')

  const category = post.metadata?.category

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <CategoryPill category={category} />
        <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="text-sm text-gray-500">
          Curtidas nos comentários: <span className="font-medium text-gray-900">{totalLikes}</span>
        </p>
        {post.metadata?.featured_image && (
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={800}
            height={450}
            className="w-full rounded-xl object-cover"
          />
        )}
      </header>

      <section
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <CommentsSection comments={comments} />
    </article>
  )
}