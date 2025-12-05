import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
}

const categoryColors: Record<string, string> = {
  'web-development': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  'artificial-intelligence': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  'cloud-computing': 'bg-green-100 text-green-800 hover:bg-green-200',
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const colorClass = categoryColors[category.slug] || 'bg-gray-100 text-gray-800 hover:bg-gray-200'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors ${colorClass}`}
    >
      {category.metadata?.name || category.title}
    </Link>
  )
}