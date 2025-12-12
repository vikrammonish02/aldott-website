import { blogPosts } from '@/data/content';
import { notFound } from 'next/navigation';

interface Props { params: { username: string } }

export default function AuthorPage({ params }: Props) {
  const posts = blogPosts.filter((p) => p.author === params.username);
  if (posts.length === 0) return notFound();

  return (
    <div className="section">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card">
          <h1 className="text-3xl font-bold text-primary">{params.username}</h1>
          <p className="text-gray-700 mt-2">Senior Wind Engineer · Aldott TechSolution</p>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.slug} className="card">
              <div className="text-sm text-gray-500">{post.date}</div>
              <h3 className="text-xl font-semibold text-primary">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
