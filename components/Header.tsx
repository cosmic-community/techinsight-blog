import Link from 'next/link'
import { getAllCategories } from '@/lib/cosmic'
import { Category } from '@/types'

export default async function Header() {
  const categories = await getAllCategories() as Category[]

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
            TechInsight
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            {categories.length > 0 && (
              <div className="relative group">
                <button className="hover:text-blue-400 transition-colors flex items-center gap-1">
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {category.metadata?.name || category.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}