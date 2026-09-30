import { fetchAPI } from '../lib/api';

export default function Blog({ blogs }) {
  const published = (blogs || []).filter((b) => b.published);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <div className="space-y-6">
        {published.map((b) => (
          <div key={b.id} className="border-b pb-6">
            <h2 className="font-semibold text-lg">{b.title}</h2>
            <p className="text-gray-600 mt-1">{b.excerpt}</p>
          </div>
        ))}
        {published.length === 0 && <p className="text-gray-500">No posts published yet.</p>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const blogs = await fetchAPI('/blogs');
  return { props: { blogs }, revalidate: 60 };
}