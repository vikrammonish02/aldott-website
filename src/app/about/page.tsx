import { testimonials } from '@/data/content';

export default function About() {
  return (
    <div className="section">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="card">
          <h1 className="text-3xl font-bold text-primary">About Aldott</h1>
          <p className="text-gray-700 mt-4">Aldott is a design house for wind energy. We blend loads engineering, project management, and certification experience to keep complex programs moving.</p>
          <p className="text-gray-700 mt-2">Founded by Vikram Singh Rajput, Aldott brings 17+ years across offshore and onshore platforms, supporting OEMs, developers, and certifiers worldwide.</p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-primary">Founder</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-6 items-start">
            <div className="bg-secondary rounded-lg p-4">
              <div className="font-semibold">Vikram Singh Rajput</div>
              <div className="text-sm text-gray-600">Founder & Lead Engineer</div>
            </div>
            <div className="md:col-span-2 text-gray-700 space-y-3">
              <p>Vikram has led loads, controls, and certification workstreams across multiple OEMs and owner-operators.</p>
              <p>He is passionate about pragmatic engineering, transparent communication, and building high-trust teams.</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-2xl font-bold text-primary">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {testimonials.map((item) => (
              <div key={item.client} className="bg-secondary rounded-lg p-4">
                <div className="font-semibold text-primary">{item.client}</div>
                <div className="text-sm text-gray-600">{item.role} · {item.company}</div>
                <p className="text-gray-700 mt-3">“{item.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
