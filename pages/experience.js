import { fetchAPI } from '../lib/api';

function formatDate(d) {
  if (!d) return 'Present';
  return new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short' });
}

export default function Experience({ experience }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Experience</h1>
      <div className="border-l-2 border-gray-200 pl-6 space-y-8">
        {(experience || []).map((e) => (
          <div key={e.id} className="relative">
            <span className="absolute -left-[31px] top-1 w-3 h-3 bg-brand rounded-full" />
            <h3 className="font-semibold">{e.role} · {e.company}</h3>
            <p className="text-sm text-gray-500">
              {formatDate(e.start_date)} — {e.is_current ? 'Present' : formatDate(e.end_date)}
            </p>
            <p className="text-gray-700 mt-2">{e.description}</p>
          </div>
        ))}
        {(!experience || experience.length === 0) && <p className="text-gray-500">No experience added yet.</p>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const experience = await fetchAPI('/experience');
  return { props: { experience }, revalidate: 60 };
}