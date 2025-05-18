
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ICampaign } from "@/data/campaignsData";

interface CampaignCardProps {
  campaign: ICampaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const progressPercentage = Math.min(
    Math.round((campaign.raised / campaign.goal) * 100),
    100
  );

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <Link to={`/campaign/${campaign.slug}`} className="campaign-link">
        <div className="aspect-video overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-foreground">
            {campaign.category}
          </span>
          <span className="text-xs text-muted-foreground">
            {campaign.daysLeft} jours restants
          </span>
        </div>
        <Link to={`/campaign/${campaign.slug}`} className="campaign-link">
          <h3 className="text-lg font-semibold mt-2 hover:text-campaign-green transition-colors line-clamp-2">
            {campaign.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {campaign.description}
        </p>
        
        <div className="space-y-2">
          <div className="campaign-progress">
            <div 
              className="campaign-progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="font-medium">
              {campaign.raised} TND <span className="text-muted-foreground">collectés</span>
            </span>
            <span className="text-muted-foreground">
              {progressPercentage}% de {campaign.goal} TND
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {campaign.backers} contributeurs
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4">
        <Link to={`/campaign/${campaign.slug}`} className="w-full">
          <Button variant="outline" className="w-full hover:bg-campaign-green hover:text-white transition-colors">
            Voir la campagne
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CampaignCard;
