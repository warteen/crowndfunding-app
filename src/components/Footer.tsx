
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold">
              <span className="gradient-text">Crowdfunding</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Plateforme de financement participatif permettant aux porteurs de
              projets de concrétiser leurs idées et aux contributeurs de soutenir
              les causes qui leur tiennent à cœur.
            </p>
            
            
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="text-muted-foreground hover:text-primary transition-colors">
                  Campagnes
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-muted-foreground hover:text-primary transition-colors">
                  Créer une campagne
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Crowdfunding. By <a href="https://www.beecoders.tn/" className="hover:text-primary transition-colors">
              Beecoder
            </a></p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button type="button" className="hover:text-primary transition-colors bg-transparent border-none p-0 m-0 underline cursor-pointer">
              Mentions légales
            </button>
            <button type="button" className="hover:text-primary transition-colors bg-transparent border-none p-0 m-0 underline cursor-pointer">
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
