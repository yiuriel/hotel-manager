import { Link } from "react-router";

export const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-12 text-center">
      <h1 className="text-6xl font-thin">Page not found</h1>
      <p className="text-2xl font-light mt-4">
        The page you are looking for does not exist. Try searching for it or
        going back to the homepage.
      </p>
      <Link to="/app" className="text-2xl font-light mt-4 text-purple-500">
        Go back to homepage
      </Link>
    </div>
  );
};
