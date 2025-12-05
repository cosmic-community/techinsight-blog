// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'

export async function generateStaticParams() {
  const authors = await getAllAuthors() as Author[]
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="min-h-screen">
      {/* Author Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-8 max-w-4xl">
            {author.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                alt={author.title}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            )}
            <div>
              <h1 className="text-5xl font-bold mb-4">{author.metadata?.name || author.title}</h1>
              {author.metadata?.bio && (
                <p className="text-xl text-blue-100 mb-6">
                  {author.metadata.bio}
                </p>
              )}
              <div className="flex gap-4">
                {author.metadata?.twitter && (
                  <a 
                    href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Twitter
                  </a>
                )}
                {author.metadata?.linkedin && (
                  <a 
                    href={`https://${author.metadata.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    LinkedIn
                  </a>
                )}
                {author.metadata?.github && (
                  <a 
                    href={`https://${author.metadata.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">
          Posts by {author.metadata?.name || author.title}
        </h2>
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No posts by this author yet.</p>
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