"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <button
        className="px-4 py-2 bg-primary text-white rounded"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
