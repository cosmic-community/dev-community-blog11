import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import { getPostsWithEngagement } from '@/lib/cosmic'
import { PostWithEngagement } from '@/types'

export default async function HomePage() {
  const posts = await getPostsWithEngagement()

  if (!posts || posts.length === 0) {
    return <EmptyState title="Nenhum post encontrado" description="Adicione posts no Cosmic para começar." />
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">Blog</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">
          Últimas publicações
        </h1>
        <p className="mt-2 text-gray-600">
          Descubra conteúdos recentes e veja o que a comunidade está comentando.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post: PostWithEngagement) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}