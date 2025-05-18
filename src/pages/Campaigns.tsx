
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import { campaignsData, campaignCategories } from "@/data/campaignsData";
import { Search } from "lucide-react";

const Campaigns: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Filtrage des campagnes
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "all" || campaign.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Tri des campagnes
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "mostFunded":
        return b.raised - a.raised;
      case "mostBackers":
        return b.backers - a.backers;
      case "endingSoon":
        return a.daysLeft - b.daysLeft;
      default:
        return 0;
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  return (
    <Layout>
      <div className="container py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Découvrez les campagnes</h1>

        <div className="bg-background/60 p-6 rounded-lg border border-border/40 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une campagne"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <div className="md:col-span-3">
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {campaignCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récentes</SelectItem>
                  <SelectItem value="oldest">Plus anciennes</SelectItem>
                  <SelectItem value="mostFunded">Plus financées</SelectItem>
                  <SelectItem value="mostBackers">Plus de contributeurs</SelectItem>
                  <SelectItem value="endingSoon">Se terminent bientôt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-1">
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={clearFilters}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>

        {sortedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Aucune campagne trouvée</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche.
            </p>
            <Button onClick={clearFilters} className="mt-4 bg-campaign-green hover:bg-campaign-green/80">
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Campaigns;
