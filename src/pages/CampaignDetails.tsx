import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import { ICampaign, campaignsData } from "@/data/campaignsData";

const CampaignDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    // Simuler un chargement de données
    setIsLoading(true);
    setTimeout(() => {
      const foundCampaign = campaignsData.find(
        (c) => c.slug === slug
      );
      setCampaign(foundCampaign || null);
      setIsLoading(false);
    }, 500);
  }, [slug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary w-3/4 mx-auto mb-8 rounded"></div>
            <div className="h-80 bg-secondary mb-8 rounded"></div>
            <div className="h-4 bg-secondary w-full mb-2 rounded"></div>
            <div className="h-4 bg-secondary w-5/6 mb-2 rounded"></div>
            <div className="h-4 bg-secondary w-4/6 mb-8 rounded"></div>
            <div className="h-8 bg-secondary w-40 mx-auto rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="container py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Campagne introuvable</h1>
          <p className="text-muted-foreground mb-8">
            La campagne que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <Link to="/campaigns">
            <Button className="bg-campaign-green hover:bg-campaign-green/80">
              Voir toutes les campagnes
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const progressPercentage = Math.min(
    Math.round((campaign.raised / campaign.goal) * 100),
    100
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and limit to 2 decimal places
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleContribute = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Montant invalide",
        description: "Veuillez entrer un montant valide.",
        variant: "destructive",
      });
      return;
    }

    // Simulate contribution
    toast({
      title: "Contribution simulée",
      description: `Vous venez de contribuer ${amount} TND à la campagne "${campaign.title}".`,
      duration: 5000,
    });
    
    setAmount("");
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <Link to="/campaigns" className="text-campaign-green hover:underline flex items-center gap-2">
            &larr; Retour aux campagnes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
            
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">À propos de cette campagne</h2>
              <p className="text-foreground whitespace-pre-line">
                {campaign.fullDescription}
              </p>
            </div>
            
            <Separator className="my-8" />
            
            <div>
              <h2 className="text-xl font-semibold mb-4">À propos du créateur</h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground">
                  {campaign.creator.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{campaign.creator.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {campaign.creator.previousCampaigns} campagnes précédentes
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-background border border-border rounded-lg p-6 sticky top-24">
              <div className="text-sm text-muted-foreground mb-2">
                Catégorie: {campaign.category}
              </div>
              
              <div className="flex justify-between items-baseline mb-2">
                <div className="text-2xl font-bold">{campaign.raised} TND</div>
                <div className="text-muted-foreground">
                  sur {campaign.goal} TND
                </div>
              </div>
              
              <div className="campaign-progress mb-1">
                <div
                  className="campaign-progress-bar"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm mb-6">
                <div>{progressPercentage}% atteint</div>
                <div>{campaign.backers} contributeurs</div>
              </div>
              
              <div className="mb-6 p-4 border border-campaign-green/20 bg-campaign-green/5 rounded-lg">
                <div className="font-semibold text-campaign-green mb-1">
                  Il reste {campaign.daysLeft} jours
                </div>
                <div className="text-sm text-muted-foreground">
                  Cette campagne se terminera bientôt.
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                  Montant du financement (TND)
                </label>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Ex: 50"
                  className="w-full p-3 border border-border rounded-md bg-transparent"
                />
              </div>
              
              <Button 
                onClick={handleContribute}
                className="w-full bg-campaign-green hover:bg-campaign-green/80 mb-4"
              >
                Contribuer maintenant
              </Button>
              
              <div className="text-center text-xs text-muted-foreground">
                * Cette démonstration simule une contribution sans réelle transaction.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
