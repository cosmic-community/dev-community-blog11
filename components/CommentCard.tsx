import { Comment } from '@/types'

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-900">{comment.metadata?.author_name || 'Anônimo'}</p>
        <span className="text-xs text-gray-500">
          Curtidas: {comment.metadata?.likes_count ?? 0}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-700">{comment.metadata?.content || ''}</p>
    </div>
  )
}