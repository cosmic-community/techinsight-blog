// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const categories = await getAllCategories() as Category[]
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug) as Category | null

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as Post[]

  return (
    <div className="min-h-screen">
      {/* Category Hero */}
      <section className="relative bg-gray-900 text-white py-20">
        {category.metadata?.cover_image && (
          <>
            <img
              src={`${category.metadata.cover_image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
          </>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-bold mb-4">{category.metadata?.name || category.title}</h1>
          {category.metadata?.description && (
            <p className="text-xl text-gray-200 max-w-3xl">
              {category.metadata.description}
            </p>
          )}
          <p className="text-gray-300 mt-4">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No posts in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}