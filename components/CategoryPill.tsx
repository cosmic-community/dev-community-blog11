import { Category } from '@/types'

export default function CategoryPill({ category }: { category?: Category }) {
  if (!category) {
    return null
  }

  return (
    <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
      {category.title}
    </span>
  )
}