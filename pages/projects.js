import { fetchAPI } from '../lib/api';

export default function Projects({ projects }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        {(projects || []).map((p) => (
          <div key={p.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
            {p.image && (
              <img src={`${process.env.NEXT_PUBLIC_API_URL}${p.image}`} alt={p.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <div className="flex gap-3 mt-3 text-sm">
                {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" className="text-brand font-medium">Live</a>}
                {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer" className="text-brand font-medium">Code</a>}
              </div>
            </div>
          </div>
        ))}
        {(!projects || projects.length === 0) && <p className="text-gray-500">No projects yet — add some in the CMS.</p>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const projects = await fetchAPI('/projects');
  return { props: { projects }, revalidate: 60 };
}