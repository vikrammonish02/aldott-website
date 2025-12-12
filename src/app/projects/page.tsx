import Link from 'next/link';
import { projects } from '@/data/content';

export default function Projects() {
  return (
    <div className="section">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-primary">Featured Projects</h1>
        <p className="text-gray-700 mt-3">Select case studies across offshore, floating, and hybrid portfolios.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {projects.map((project) => (
            <div key={project.slug} className="card">
              <div className="text-sm text-gray-500">{project.location}</div>
              <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
              <p className="text-gray-700 mt-2">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.category.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-primary px-2 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="text-primary text-sm font-semibold mt-4 inline-flex">Read case →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
