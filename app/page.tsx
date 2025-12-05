import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryBadge from '@/components/CategoryBadge'

export default async function HomePage() {
  const posts = await getAllPosts() as Post[]
  const categories = await getAllCategories() as Category[]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">TechInsight Blog</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Explore the latest insights in web development, artificial intelligence, and cloud computing
          </p>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="bg-gray-50 py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-600 font-medium">Browse by category:</span>
              {categories.map((category) => (
                <CategoryBadge key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Section */}
      <section className="container mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No posts available yet.</p>
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