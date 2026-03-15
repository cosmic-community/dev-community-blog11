import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'
import { Category } from '@/types'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold text-gray-900">
            Dev Community Blog
          </Link>
          <p className="text-sm text-gray-500">Posts, categorias e comentários da comunidade.</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm text-gray-600">
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="rounded-full border border-gray-200 px-3 py-1 text-gray-700 transition hover:border-gray-300 hover:text-gray-900"
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}