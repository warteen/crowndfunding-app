
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const FAQ: React.FC = () => {
  const questions = [
    {
      question: "Comment fonctionne FundingPulse ?",
      answer:
        "FundingPulse est une plateforme de financement participatif qui permet aux créateurs de présenter leurs projets et de collecter des fonds auprès d'une communauté de contributeurs. Les créateurs définissent un objectif de financement et une durée pour leur campagne. Si l'objectif est atteint, ils reçoivent les fonds collectés. Sinon, les contributeurs sont remboursés.",
    },
    {
      question: "Comment créer une campagne ?",
      answer:
        "Pour créer une campagne, cliquez sur le bouton 'Créer une campagne' en haut de la page. Vous serez guidé à travers les étapes de création : définition du projet, établissement de l'objectif financier, ajout de médias et description détaillée. Une fois soumise, votre campagne sera examinée par notre équipe avant d'être publiée.",
    },
    {
      question: "Comment contribuer à une campagne ?",
      answer:
        "Pour soutenir une campagne, naviguez vers la page de la campagne qui vous intéresse, choisissez le montant que vous souhaitez contribuer, puis suivez les instructions de paiement. Vous recevrez une confirmation par email une fois votre contribution traitée.",
    },
    {
      question: "Quels types de projets sont acceptés ?",
      answer:
        "FundingPulse accepte une variété de projets dans les domaines de l'éducation, l'environnement, la santé, les technologies, les arts, l'entrepreneuriat social et plus encore. Les projets doivent respecter nos conditions d'utilisation et ne pas être illégaux, frauduleux ou nuisibles. Nous encourageons particulièrement les initiatives à impact social positif.",
    },
    {
      question: "Quels frais sont appliqués aux campagnes ?",
      answer:
        "FundingPulse prélève des frais de 5% sur les fonds collectés pour les campagnes réussies, plus des frais de traitement des paiements de 3%. Ces frais nous permettent de maintenir et d'améliorer la plateforme, tout en offrant un support de qualité aux créateurs de campagnes.",
    },
    {
      question: "Que se passe-t-il si l'objectif n'est pas atteint ?",
      answer:
        "Si une campagne n'atteint pas son objectif financier à la date limite, toutes les contributions sont remboursées aux donateurs. Nous appelons cela le modèle 'tout ou rien', qui garantit que les projets ne démarrent que s'ils ont suffisamment de financement pour être viables.",
    },
    {
      question: "Comment les fonds sont-ils versés aux créateurs ?",
      answer:
        "Les fonds collectés sont versés aux créateurs par virement bancaire dans les 15 jours suivant la fin réussie de la campagne, après déduction des frais de la plateforme. Les créateurs doivent avoir fourni leurs coordonnées bancaires complètes et validé leur identité.",
    },
    {
      question: "Puis-je modifier ma campagne après son lancement ?",
      answer:
        "Oui, vous pouvez apporter certaines modifications à votre campagne après son lancement, comme ajouter des mises à jour ou clarifier des informations dans la description. Cependant, vous ne pouvez pas modifier l'objectif financier ou la durée de la campagne une fois qu'elle est en ligne.",
    },
    {
      question: "Comment contacter l'équipe de support ?",
      answer:
        "Pour toute question, vous pouvez nous contacter via notre formulaire de contact accessible depuis la page 'Contact'. Notre équipe s'efforcera de vous répondre dans un délai de 48 heures ouvrables. Pour les questions urgentes, vous pouvez également nous contacter par email à support@fundingpulse.com.",
    },
    {
      question: "Ma contribution est-elle remboursable ?",
      answer:
        "Les contributions peuvent être remboursées sur demande jusqu'à 48 heures après le paiement. Au-delà, les remboursements ne sont possibles que si la campagne n'atteint pas son objectif ou si elle est annulée. Contactez notre service client pour toute demande spécifique.",
    },
  ];

  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Questions fréquemment posées
          </h1>
          <p className="text-muted-foreground mb-8">
            Trouvez des réponses aux questions les plus courantes sur FundingPulse.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {questions.map((q, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {q.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-campaign-green/10 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-3">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-muted-foreground mb-4">
              Contactez notre équipe de support pour toute autre question.
            </p>
            <a href="/contact">
              <Button className="bg-campaign-green hover:bg-campaign-green/80">
                Nous contacter
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
