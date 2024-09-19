import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="text-center p-8 max-w-md mx-auto shadow-lg">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4">
          Oops! Page not found.
        </h2>
        <p className="text-lg text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="mt-6 px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300">
            Go Back Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default NotFound;
