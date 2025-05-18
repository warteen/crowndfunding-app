
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container py-16 px-4 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-campaign-green mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
          
          <p className="text-muted-foreground mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/">
              <Button className="bg-campaign-green hover:bg-campaign-green/80">
                Retourner à l'accueil
              </Button>
            </Link>
            <Link to="/campaigns">
              <Button variant="outline">
                Voir les campagnes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
