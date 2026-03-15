import CommentCard from '@/components/CommentCard'
import { Comment } from '@/types'

interface CommentsSectionProps {
  comments: Comment[]
}

export default function CommentsSection({ comments }: CommentsSectionProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600">
        Sem comentários ainda. Volte em breve!
      </div>
    )
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Comentários</h2>
      <div className="space-y-3">
        {comments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  )
}