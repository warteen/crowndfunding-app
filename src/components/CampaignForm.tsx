import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { campaignCategories } from "@/data/campaignsData";

interface FormState {
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  goal: string;
  imageUrl: string;
}

const CampaignForm: React.FC = () => {
  const { toast } = useToast();
  
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    fullDescription: "",
    category: "",
    goal: "",
    imageUrl: ""
  });
  
  const [errors, setErrors] = useState<Partial<FormState>>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, category: value }));
    
    // Clear category error
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    
    if (!formState.title.trim()) {
      newErrors.title = "Le titre est requis";
    }
    
    if (!formState.description.trim()) {
      newErrors.description = "La description courte est requise";
    }
    
    if (!formState.fullDescription.trim()) {
      newErrors.fullDescription = "La description complète est requise";
    }
    
    if (!formState.category) {
      newErrors.category = "La catégorie est requise";
    }
    
    if (!formState.goal.trim()) {
      newErrors.goal = "L'objectif financier est requis";
    } else if (isNaN(Number(formState.goal)) || Number(formState.goal) <= 0) {
      newErrors.goal = "L'objectif doit être un nombre positif";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Normally would send this to an API
      console.log("Form submitted:", formState);
      
      toast({
        title: "Campagne créée",
        description: "Votre campagne a été créée avec succès.",
        duration: 5000,
      });
      
      // Reset form
      setFormState({
        title: "",
        description: "",
        fullDescription: "",
        category: "",
        goal: "",
        imageUrl: ""
      });
    } else {
      toast({
        title: "Erreur",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground">
          Titre de la campagne <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={formState.title}
          onChange={handleChange}
          className={errors.title ? "border-red-500" : ""}
          placeholder="Ex: École pour enfants défavorisés"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground">
          Description courte <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          className={errors.description ? "border-red-500" : ""}
          placeholder="Une description concise de votre projet (100-150 caractères)"
          rows={2}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fullDescription" className="text-foreground">
          Description complète <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="fullDescription"
          name="fullDescription"
          value={formState.fullDescription}
          onChange={handleChange}
          className={errors.fullDescription ? "border-red-500" : ""}
          placeholder="Décrivez votre projet en détail. Expliquez son importance, son impact et comment les fonds seront utilisés."
          rows={6}
        />
        {errors.fullDescription && (
          <p className="text-red-500 text-sm">{errors.fullDescription}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-foreground">
            Catégorie <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={handleSelectChange} value={formState.category}>
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {campaignCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="goal" className="text-foreground">
            Objectif financier (TND) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="goal"
            name="goal"
            type="text"
            inputMode="numeric"
            value={formState.goal}
            onChange={handleChange}
            className={errors.goal ? "border-red-500" : ""}
            placeholder="Ex: 5000"
          />
          {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-foreground">
          URL de l'image (optionnel)
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formState.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-muted-foreground">
          Choisissez une image qui représente bien votre projet. Si laissé vide, une image par défaut sera utilisée.
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-campaign-green hover:bg-campaign-green/80"
      >
        Créer la campagne
      </Button>
    </form>
  );
};

export default CampaignForm;
