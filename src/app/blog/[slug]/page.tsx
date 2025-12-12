import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/content';
import Link from 'next/link';

interface Props { params: { slug: string } }

export default function BlogDetail({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="section">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="card">
          <div className="text-sm text-gray-500">{post.date} · by <Link href={`/authors/${post.author}`} className="text-primary">{post.author}</Link></div>
          <h1 className="text-3xl font-bold text-primary">{post.title}</h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
        <div className="card prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="card">
          <h3 className="font-semibold text-primary">Related posts</h3>
          <div className="mt-3 space-y-2">
            {blogPosts.filter((p) => p.slug !== post.slug).map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="text-primary font-semibold block">{related.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
