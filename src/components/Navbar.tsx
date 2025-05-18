
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-foreground">
            <span className="gradient-text">Crowdfunding</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/campaigns" className="text-foreground hover:text-primary transition-colors">
            Campagnes
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            À propos
          </Link>
          <Link to="/faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
          {user?.role === "Administrateur" && (
            <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
              Administration
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Link to="/create">
                <Button className="bg-campaign-green hover:bg-campaign-green/80">
                  Créer une campagne
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" /> Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline">
                  <LogIn className="h-4 w-4 mr-2" /> Connexion
                </Button>
              </Link>
              <Link to="/signup">
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" /> Inscription
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/campaigns" className="py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
              Campagnes
            </Link>
            <Link to="/about" className="py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
              À propos
            </Link>
            <Link to="/faq" className="py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
              FAQ
            </Link>
            <Link to="/contact" className="py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
              Contact
            </Link>
            {user?.role === "Administrateur" && (
              <Link to="/admin" className="py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                Administration
              </Link>
            )}
            
            {isAuthenticated ? (
              <>
                <div className="py-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Link to="/create" onClick={toggleMenu}>
                  <Button className="w-full bg-campaign-green hover:bg-campaign-green/80">
                    Créer une campagne
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => { handleLogout(); toggleMenu(); }}>
                  <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" /> Connexion
                  </Button>
                </Link>
                <Link to="/signup" onClick={toggleMenu}>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" /> Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
