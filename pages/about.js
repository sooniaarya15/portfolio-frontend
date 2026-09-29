import { fetchAPI } from '../lib/api';

export default function About({ about }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      {about?.profile_image && (
        <img src={`${process.env.NEXT_PUBLIC_API_URL}${about.profile_image}`} alt={about.full_name} className="w-32 h-32 rounded-full mb-6" />
      )}
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{about?.bio || 'Bio coming soon.'}</p>
      <div className="mt-6 text-sm text-gray-500 space-y-1">
        {about?.location && <p>📍 {about.location}</p>}
        {about?.email && <p>✉️ {about.email}</p>}
        {about?.resume_url && (
          <a href={about.resume_url} target="_blank" rel="noreferrer" className="text-brand font-medium inline-block mt-2">
            Download Resume →
          </a>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const about = await fetchAPI('/about');
  return { props: { about }, revalidate: 60 };
}