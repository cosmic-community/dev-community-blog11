import Link from 'next/link'
import CategoryPill from '@/components/CategoryPill'
import { PostWithEngagement } from '@/types'

interface PostCardProps {
  post: PostWithEngagement
}

export default function PostCard({ post }: PostCardProps) {
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {featuredImage && (
        <img
          src={`${featuredImage.imgix_url}?w=1200&h=700&fit=crop&auto=format,compress`}
          alt={post.title}
          width={600}
          height={350}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <CategoryPill category={category} />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            <Link href={`/posts/${post.slug}`} className="hover:text-gray-700">
              {post.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-600">
            Comentários: <span className="font-medium text-gray-900">{post.engagement.commentsCount}</span> · Curtidas:{' '}
            <span className="font-medium text-gray-900">{post.engagement.totalLikes}</span>
          </p>
        </div>
        <Link
          href={`/posts/${post.slug}`}
          className="mt-auto inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-700"
        >
          Ler post →
        </Link>
      </div>
    </article>
  )
}