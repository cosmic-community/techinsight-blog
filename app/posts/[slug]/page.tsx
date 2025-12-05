// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import CategoryBadge from '@/components/CategoryBadge'

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[]
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug) as Post | null

  if (!post) {
    notFound()
  }

  const publishDate = post.metadata?.publish_date 
    ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="min-h-screen">
      {/* Hero Section with Featured Image */}
      {post.metadata?.featured_image && (
        <div className="relative h-[400px] w-full bg-gray-900">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.metadata.title || post.title}
            </h1>
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-200 max-w-3xl">
                {post.metadata.excerpt}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Post Metadata */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            {post.metadata?.author && (
              <Link 
                href={`/authors/${post.metadata.author.slug}`}
                className="flex items-center gap-2 hover:text-primary"
              >
                {post.metadata.author.metadata?.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="font-medium">{post.metadata.author.title}</span>
              </Link>
            )}
            {publishDate && (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {publishDate}
              </span>
            )}
            {post.metadata?.categories && post.metadata.categories.length > 0 && (
              <div className="flex items-center gap-2 ml-auto">
                {post.metadata.categories.map((category) => (
                  <CategoryBadge key={category.id} category={category} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
            <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
          </div>

          {/* Author Bio */}
          {post.metadata?.author && (
            <div className="mt-16 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex items-start gap-4">
                {post.metadata.author.metadata?.avatar && (
                  <img
                    src={`${post.metadata.author.metadata.avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <div>
                  <Link 
                    href={`/authors/${post.metadata.author.slug}`}
                    className="text-lg font-semibold hover:text-primary"
                  >
                    {post.metadata.author.title}
                  </Link>
                  {post.metadata.author.metadata?.bio && (
                    <p className="text-gray-600 mt-2">{post.metadata.author.metadata.bio}</p>
                  )}
                  <div className="flex gap-3 mt-3">
                    {post.metadata.author.metadata?.twitter && (
                      <a 
                        href={`https://twitter.com/${post.metadata.author.metadata.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Twitter
                      </a>
                    )}
                    {post.metadata.author.metadata?.linkedin && (
                      <a 
                        href={`https://${post.metadata.author.metadata.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800"
                      >
                        LinkedIn
                      </a>
                    )}
                    {post.metadata.author.metadata?.github && (
                      <a 
                        href={`https://${post.metadata.author.metadata.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}