'use client';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="section">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="card">
          <h1 className="text-3xl font-bold text-primary">Contact Aldott</h1>
          <p className="text-gray-700 mt-2">Tell us about your program. We respond within one business day.</p>
        </div>
        <div className="card">
          {submitted ? (
            <div className="text-primary font-semibold">Thanks for reaching out! Your message has been captured for follow-up.</div>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.info('Contact message would be stored via Prisma API');
                setSubmitted(true);
              }}
            >
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-semibold text-gray-700">Name<input className="mt-1 border rounded-lg px-3 py-2" required /></label>
                <label className="flex flex-col text-sm font-semibold text-gray-700">Email<input className="mt-1 border rounded-lg px-3 py-2" type="email" required /></label>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex flex-col text-sm font-semibold text-gray-700">Company<input className="mt-1 border rounded-lg px-3 py-2" /></label>
                <label className="flex flex-col text-sm font-semibold text-gray-700">Country<input className="mt-1 border rounded-lg px-3 py-2" /></label>
              </div>
              <label className="flex flex-col text-sm font-semibold text-gray-700">Message<textarea className="mt-1 border rounded-lg px-3 py-2" rows={4} required /></label>
              <button type="submit" className="btn-primary w-fit">Send message</button>
            </form>
          )}
        </div>
        <div className="card grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-primary">Germany</h3>
            <p className="text-gray-700">Hamburg, Germany</p>
          </div>
          <div>
            <h3 className="font-semibold text-primary">India</h3>
            <p className="text-gray-700">Pune, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}
