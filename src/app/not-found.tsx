import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#006B4F] flex items-center justify-center font-bold text-3xl mb-4 border border-emerald-200 shadow-sm">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-heading mb-2">
        Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md mb-6">
        Sorry, the pet care page or service you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#006B4F] hover:bg-[#00543E] text-white font-bold text-sm shadow-md transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
