// app/categories/[slug]/page.tsx
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import { getCategoryBySlug, getPostsByCategoryId, getPostsEngagementMap } from '@/lib/cosmic'
import { Category, Post } from '@/types'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return <EmptyState title="Categoria não encontrada" description="Tente outra categoria." />
  }

  const posts = await getPostsByCategoryId(category.id)
  const engagementMap = await getPostsEngagementMap()

  if (!posts || posts.length === 0) {
    return <EmptyState title="Sem posts" description="Não há posts nessa categoria ainda." />
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-gray-500">Categoria</p>
        <h1 className="text-3xl font-semibold text-gray-900">{category.title}</h1>
        {category.metadata?.description && (
          <p className="text-gray-600">{category.metadata.description}</p>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post: Post) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              engagement: engagementMap[post.id] || { totalLikes: 0, commentsCount: 0 }
            }}
          />
        ))}
      </div>
    </section>
  )
}