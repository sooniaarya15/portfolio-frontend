import { fetchAPI } from '../lib/api';

export default function Skills({ skills }) {
  const grouped = (skills || []).reduce((acc, s) => {
    const cat = s.category || 'Other';
    acc[cat] = acc[cat] || [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Skills</h1>
      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="mb-8">
          <h2 className="font-semibold text-brand mb-3">{category}</h2>
          <div className="space-y-3">
            {list.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{s.name}</span>
                  <span>{s.proficiency ?? 0}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-brand h-2 rounded-full" style={{ width: `${s.proficiency ?? 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {(!skills || skills.length === 0) && <p className="text-gray-500">No skills added yet.</p>}
    </div>
  );
}

export async function getStaticProps() {
  const skills = await fetchAPI('/skills');
  return { props: { skills }, revalidate: 60 };
}