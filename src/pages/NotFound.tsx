import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-16 space-y-6">
          <div className="text-8xl mb-4">🔍</div>
          <div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Oops! Page not found
            </p>
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            </Link>
            <Link to="/?search=bitcoin">
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                Search Markets
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
