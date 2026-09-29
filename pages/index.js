import Link from 'next/link';
import { fetchAPI } from '../lib/api';

export default function Home({ about, projects, skills }) {
  return (
    <div className="space-y-16">
      <section className="flex flex-col md:flex-row items-center gap-10">
        {about?.profile_image && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${about.profile_image}`}
            alt={about.full_name}
            className="w-40 h-40 rounded-full object-cover shadow-md"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{about?.full_name || 'Your Name'}</h1>
          <p className="text-brand font-medium mt-1">{about?.title || 'Full-Stack Developer'}</p>
          <p className="text-gray-600 mt-4 max-w-xl">{about?.bio || 'Add your bio from the CMS admin panel.'}</p>
          <Link href="/contact" className="inline-block mt-6 bg-brand text-white px-5 py-2 rounded-md font-medium hover:bg-brand-dark transition">
            Get in touch
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {(projects || []).filter((p) => p.featured).slice(0, 4).map((p) => (
            <div key={p.id} className="border rounded-lg p-4 hover:shadow-md transition">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.description}</p>
            </div>
          ))}
          {(!projects || projects.filter((p) => p.featured).length === 0) && (
            <p className="text-gray-500 text-sm">Add and mark a project as "featured" in the CMS to show it here.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {(skills || []).map((s) => (
            <span key={s.id} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s.name}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const [about, projects, skills] = await Promise.all([
    fetchAPI('/about'),
    fetchAPI('/projects'),
    fetchAPI('/skills'),
  ]);
  return { props: { about, projects, skills }, revalidate: 60 };
}