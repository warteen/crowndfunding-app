
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CampaignForm from "@/components/CampaignForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const CreateCampaign: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour créer une campagne",
        variant: "destructive",
      });
      navigate("/signin");
    }
  }, [isAuthenticated, navigate, toast]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Créer une campagne</h1>
          <p className="text-muted-foreground mb-8">
            Présentez votre projet et définissez votre objectif financier.
          </p>
          
          <div className="bg-background border border-border/40 rounded-lg p-6 md:p-8">
            <CampaignForm />
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              * Cette démonstration simule la création d'une campagne sans connexion à un backend.
              Aucune donnée n'est réellement enregistrée.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCampaign;
