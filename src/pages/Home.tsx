
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { campaignsData } from "@/data/campaignsData";

const Home: React.FC = () => {
  // Get 3 featured campaigns
  const featuredCampaigns = campaignsData
    .sort((a, b) => b.raised - a.raised)
    .slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-campaign-dark z-[-1] overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=2070&auto=format&fit=crop')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <div className="container py-24 md:py-32 px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            CrowdFunding
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-muted-foreground">
            Donnez vie à vos projets grâce au financement participatif. Découvrez des projets innovants ou lancez votre propre campagne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/campaigns">
              <Button className="text-base px-8 py-6 bg-campaign-green hover:bg-campaign-green/80">
                Découvrir les campagnes
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="outline" className="text-base px-8 py-6 border-campaign-green text-campaign-green hover:bg-campaign-green hover:text-white">
                Créer une campagne
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Campagnes à la une</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les projets qui font parler d'eux et soutenez les causes qui vous tiennent à cœur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-background rounded-lg overflow-hidden shadow-md border border-border/40 hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={campaign.imageUrl} 
                    alt={campaign.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-campaign-green text-white rounded">
                      {campaign.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2">{campaign.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{campaign.description}</p>
                  
                  <div className="mb-4">
                    <div className="campaign-progress">
                      <div 
                        className="campaign-progress-bar" 
                        style={{ width: `${Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span><strong>{campaign.raised} TND</strong> collectés</span>
                      <span>{campaign.daysLeft} jours restants</span>
                    </div>
                  </div>
                  
                  <Link to={`/campaigns/${campaign.slug}`} className="w-full">
                    <Button className="w-full">
                      Voir la campagne
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/campaigns">
              <Button className="bg-campaign-green hover:bg-campaign-green/80">
                Voir toutes les campagnes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Financer ou créer une campagne en quelques étapes simples.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-campaign-green/10 text-campaign-green rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Découvrez</h3>
              <p className="text-muted-foreground">
                Parcourez les différentes campagnes et trouvez celles qui vous inspirent.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-campaign-green/10 text-campaign-green rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Contribuez</h3>
              <p className="text-muted-foreground">
                Soutenez les projets avec le montant de votre choix et suivez leur évolution.
              </p>
            </div>

            <div className="bg-secondary/30 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-campaign-green/10 text-campaign-green rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Créez</h3>
              <p className="text-muted-foreground">
                Lancez votre propre campagne et collectez des fonds pour concrétiser vos idées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4">
          <div className="bg-campaign-green/10 rounded-xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Prêt à lancer votre projet ?
              </h2>
              <p className="text-lg mb-8">
                Inscrivez-vous gratuitement et commencez à collecter des fonds pour votre initiative.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button className="bg-campaign-green hover:bg-campaign-green/80">
                    Créer un compte
                  </Button>
                </Link>
                <Link to="/campaigns">
                  <Button variant="outline" className="border-campaign-green text-campaign-green hover:bg-campaign-green hover:text-white">
                    Explorer les campagnes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
