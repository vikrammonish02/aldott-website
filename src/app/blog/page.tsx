import Link from 'next/link';
import { blogPosts } from '@/data/content';

export default function Blog() {
  return (
    <div className="section">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-primary">Insights & Blog</h1>
        <p className="text-gray-700 mt-2">Technical perspectives on loads, certification, and offshore delivery.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <aside className="card md:col-span-1 bg-secondary">
            <h3 className="font-semibold text-primary">Filters</h3>
            <p className="text-sm text-gray-700 mt-2">Tag and author filters will be powered by Prisma-backed queries.</p>
          </aside>
          <div className="md:col-span-2 space-y-4">
            {blogPosts.map((post) => (
              <div key={post.slug} className="card">
                <div className="text-sm text-gray-500">{post.date}</div>
                <h3 className="text-xl font-semibold text-primary">{post.title}</h3>
                <p className="text-gray-700 mt-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-semibold mt-4 inline-flex">Read article →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
