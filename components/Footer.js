export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20 py-8 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} — Built with a custom CMS.
    </footer>
  );
}