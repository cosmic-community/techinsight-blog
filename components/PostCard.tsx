import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from './CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const publishDate = post.metadata?.publish_date 
    ? new Date(post.metadata.publish_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex gap-2 mb-3">
            {post.metadata.categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-primary transition-colors">
            {post.metadata?.title || post.title}
          </h2>
        </Link>
        
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          {post.metadata?.author && (
            <Link 
              href={`/authors/${post.metadata.author.slug}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              {post.metadata.author.metadata?.avatar && (
                <img
                  src={`${post.metadata.author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{post.metadata.author.title}</span>
            </Link>
          )}
          {publishDate && (
            <span className="text-gray-400">{publishDate}</span>
          )}
        </div>
      </div>
    </article>
  )
}