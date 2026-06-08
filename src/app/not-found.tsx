export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-600">Page not found.</p>
      <a href="/" className="text-primary underline">
        Go home
      </a>
    </div>
  );
}
