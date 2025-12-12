import { services } from '@/data/content';

export default function Services() {
  return (
    <div className="section">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-primary">Services</h1>
        <p className="text-gray-700 mt-3">Structured offerings spanning program strategy to detailed aeroelastic modelling.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {services.map((service) => (
            <div key={service.title} className="card">
              <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
              <p className="text-gray-700 mt-2">{service.description}</p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-1">
                {service.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
