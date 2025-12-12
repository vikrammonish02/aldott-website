import { notFound } from 'next/navigation';
import { projects } from '@/data/content';
import ReactMarkdown from 'react-markdown';

interface Props {
  params: { slug: string };
}

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="section">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card">
          <div className="text-sm text-gray-500">{project.location}</div>
          <h1 className="text-3xl font-bold text-primary">{project.title}</h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {project.category.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <p className="text-gray-700 mt-3">{project.outcomes}</p>
        </div>
        <div className="card prose max-w-none">
          <ReactMarkdown>{project.body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
