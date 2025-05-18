
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Notre mission</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl mb-8 text-muted-foreground">
              Crowndfunding a été créée avec une vision simple : permettre à chacun de donner vie à ses idées et de soutenir les projets qui ont du sens.
            </p>
            
            <div className="aspect-video overflow-hidden rounded-lg mb-8">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop"
                alt="Notre équipe au travail"
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Qui sommes-nous ?</h2>
            
            <p className="mb-6">
              Fondée en 2023, FundingPulse est née de la conviction que le financement participatif peut être un puissant vecteur de changement social et d'innovation. Notre équipe est composée de professionnels passionnés par l'entrepreneuriat social et convaincus que chaque idée mérite une chance de se concrétiser.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Notre vision</h2>
            
            <p className="mb-6">
              Nous croyons en un monde où le financement n'est pas un obstacle à la réalisation de projets porteurs de sens. FundingPulse s'engage à créer un écosystème où créateurs et contributeurs peuvent collaborer facilement pour donner vie à des initiatives qui ont un impact positif sur la société et l'environnement.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Nos valeurs</h2>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Transparence</strong> - Nous promouvons une communication claire et honnête entre créateurs et contributeurs.</li>
              <li><strong>Accessibilité</strong> - Notre plateforme est conçue pour être simple d'utilisation et accessible à tous.</li>
              <li><strong>Impact social</strong> - Nous privilégions les projets qui ont un impact positif sur la société et l'environnement.</li>
              <li><strong>Innovation</strong> - Nous encourageons les idées nouvelles et les approches créatives pour résoudre les problèmes.</li>
              <li><strong>Communauté</strong> - Nous croyons à la force du collectif et au pouvoir du soutien mutuel.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mb-4">Notre impact</h2>
            
            <p className="mb-6">
              Depuis notre création, FundingPulse a permis de financer plus de 200 projets dans divers domaines, de l'éducation à l'environnement, en passant par la santé, les arts et l'innovation technologique. Grâce à notre communauté de contributeurs engagés, nous avons aidé à collecter plus de 1,5 million d'euros pour des initiatives qui transforment positivement notre monde.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Prêt à nous rejoindre ?</h2>
            <p className="text-muted-foreground mb-6">
              Rejoignez notre communauté de créateurs et de contributeurs engagés.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/campaigns">
                <Button className="bg-campaign-green hover:bg-campaign-green/80">
                  Explorer les campagnes
                </Button>
              </Link>
              <Link to="/create">
                <Button variant="outline" className="border-campaign-green text-campaign-green hover:bg-campaign-green hover:text-white">
                  Créer une campagne
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
