import Link from 'next/link';
import { services, projects } from '@/data/content';

export default function Home() {
  return (
    <div>
      <section className="section bg-white">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="uppercase tracking-wide text-sm text-primary font-semibold">Your R&D Powerhouse for Global Wind Energy</p>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 text-primary">Engineering-grade offshore and onshore consulting.</h1>
            <p className="mt-4 text-lg text-gray-700">17+ years of expertise across OEMs, developers, and certifiers. We accelerate loads, certification, and project readiness.</p>
            <div className="mt-6 flex gap-4">
              <Link href="/contact" className="btn-primary">Schedule a discussion</Link>
              <Link href="/services" className="btn-secondary">View services</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">Why Aldott</h3>
            <ul className="mt-4 space-y-3 text-gray-700">
              <li>Design house mindset with deep offshore focus</li>
              <li>Hands-on certification dialogue and documentation</li>
              <li>OpenFAST-driven loads and structural validation</li>
              <li>Global delivery footprint across Europe and India</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Services</h2>
            <Link href="/services" className="text-sm text-primary font-semibold">All services →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="card">
                <h3 className="font-semibold text-lg text-primary">{service.title}</h3>
                <p className="text-gray-700 mt-2">{service.description}</p>
                <ul className="mt-3 list-disc list-inside text-gray-600 space-y-1">
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Featured Projects</h2>
            <Link href="/projects" className="text-sm text-primary font-semibold">Case studies →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.slug} className="card">
                <div className="text-sm text-gray-500">{project.location}</div>
                <h3 className="font-semibold text-lg text-primary mt-1">{project.title}</h3>
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
      </section>

      <section className="section">
        <div className="mx-auto max-w-6xl card">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary">Ready for your next certification milestone?</h3>
              <p className="text-gray-700 mt-3">We partner with OEMs, developers, and certifiers to deliver bankable outcomes and on-time packages.</p>
            </div>
            <div className="flex gap-4 justify-end">
              <Link href="/contact" className="btn-primary">Contact Aldott</Link>
              <Link href="/openfast" className="btn-secondary">OpenFAST Cloud</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
