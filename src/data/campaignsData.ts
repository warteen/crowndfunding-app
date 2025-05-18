
export interface ICampaign {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  category: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  creator: {
    name: string;
    previousCampaigns: number;
  };
  imageUrl: string;
  createdAt: string;
}

export const campaignCategories = [
  "Éducation",
  "Environnement",
  "Santé",
  "Technologies",
  "Arts",
  "Social",
  "Entrepreneuriat"
];

export const campaignsData: ICampaign[] = [
  {
    id: 1,
    title: "Aide à l'école rurale de Mbandu",
    slug: "aide-ecole-rurale-mbandu",
    description: "Financer l'achat de matériel scolaire pour les élèves défavorisés.",
    fullDescription: "Notre projet vise à équiper 150 élèves de l'école primaire de Mbandu avec le matériel scolaire nécessaire pour l'année. L'école est située dans une zone rurale où les familles ont des ressources limitées. Avec votre aide, nous pourrons fournir des cahiers, des stylos, des manuels et d'autres fournitures essentielles. Nous organiserons également des ateliers de formation pour les enseignants afin d'améliorer les méthodes pédagogiques.",
    category: "Éducation",
    goal: 3000,
    raised: 1800,
    backers: 42,
    daysLeft: 15,
    creator: {
      name: "Association Éducation Pour Tous",
      previousCampaigns: 3
    },
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    createdAt: "2023-11-15"
  },
  {
    id: 2,
    title: "Reforestation de la forêt de Kimbala",
    slug: "reforestation-foret-kimbala",
    description: "Planter 5000 arbres pour lutter contre la déforestation locale.",
    fullDescription: "Notre projet vise à restaurer l'écosystème de la forêt de Kimbala, gravement affectée par la déforestation. Avec votre soutien, nous planterons 5000 arbres indigènes sur une période de 6 mois. Cette initiative aidera à préserver la biodiversité locale, à améliorer la qualité de l'air et à protéger les ressources en eau. Nous travaillerons avec les communautés locales pour assurer l'entretien et la surveillance des plantations.",
    category: "Environnement",
    goal: 7500,
    raised: 3200,
    backers: 85,
    daysLeft: 30,
    creator: {
      name: "Éco-Défense",
      previousCampaigns: 5
    },
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1975&auto=format&fit=crop",
    createdAt: "2023-10-05"
  },
  {
    id: 3,
    title: "Centre médical mobile pour zones isolées",
    slug: "centre-medical-mobile",
    description: "Mettre en place une clinique mobile pour desservir les villages isolés.",
    fullDescription: "Notre projet consiste à acquérir et équiper un véhicule qui servira de clinique mobile pour offrir des soins médicaux de base dans 12 villages isolés. Ces communautés n'ont actuellement pas accès aux services de santé les plus élémentaires. La clinique mobile offrira des consultations générales, des vaccinations, des soins prénataux et des médicaments essentiels. Une équipe de médecins bénévoles assurera le fonctionnement du service deux fois par mois dans chaque village.",
    category: "Santé",
    goal: 12000,
    raised: 4800,
    backers: 120,
    daysLeft: 45,
    creator: {
      name: "Médecins Sans Frontières Locales",
      previousCampaigns: 7
    },
    imageUrl: "https://images.unsplash.com/photo-1631815586151-93a1570a5d4a?q=80&w=1974&auto=format&fit=crop",
    createdAt: "2023-09-20"
  },
  {
    id: 4,
    title: "Laboratoire d'innovation technologique",
    slug: "laboratoire-innovation-tech",
    description: "Créer un espace d'apprentissage des nouvelles technologies pour les jeunes.",
    fullDescription: "Notre projet vise à établir un laboratoire d'innovation technologique accessible aux jeunes de 12 à 25 ans. Nous fournirons des ordinateurs, des kits robotiques, des imprimantes 3D et d'autres équipements technologiques. Des ateliers hebdomadaires seront organisés pour enseigner la programmation, la conception numérique et la robotique. Ce laboratoire sera un lieu où la créativité et l'innovation pourront s'épanouir, préparant les jeunes aux défis du monde numérique.",
    category: "Technologies",
    goal: 9000,
    raised: 6700,
    backers: 95,
    daysLeft: 10,
    creator: {
      name: "TechFuture",
      previousCampaigns: 2
    },
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    createdAt: "2023-11-01"
  },
  {
    id: 5,
    title: "Festival des arts traditionnels",
    slug: "festival-arts-traditionnels",
    description: "Organiser un festival pour promouvoir les arts et la culture locale.",
    fullDescription: "Notre projet est d'organiser un festival de trois jours célébrant les arts traditionnels de notre région. L'événement mettra en valeur la musique, la danse, l'artisanat et la cuisine locale. Plus de 50 artistes et artisans participeront à des spectacles, des expositions et des ateliers. Le festival sera gratuit pour le public, permettant un accès large à la culture. Les fonds collectés serviront à couvrir les frais logistiques, la location d'équipement et la rémunération équitable des artistes.",
    category: "Arts",
    goal: 5000,
    raised: 2500,
    backers: 60,
    daysLeft: 20,
    creator: {
      name: "Collectif Culturel",
      previousCampaigns: 4
    },
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    createdAt: "2023-10-15"
  },
  {
    id: 6,
    title: "Jardin communautaire urbain",
    slug: "jardin-communautaire-urbain",
    description: "Transformer un terrain vague en jardin productif pour le quartier.",
    fullDescription: "Notre projet transformera un terrain vague de 500m² en un jardin communautaire productif. Nous aménagerons 30 parcelles de jardinage pour les familles du quartier, ainsi que des espaces communs pour les herbes aromatiques et les arbres fruitiers. Le jardin sera géré collectivement et servira aussi de lieu éducatif pour les écoles locales. Nous installerons un système de récupération d'eau de pluie et utiliserons des méthodes de culture biologique. Ce projet renforcera la cohésion sociale et améliorera l'accès à une alimentation saine.",
    category: "Social",
    goal: 4500,
    raised: 3800,
    backers: 74,
    daysLeft: 5,
    creator: {
      name: "Verts Urbains",
      previousCampaigns: 1
    },
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop",
    createdAt: "2023-11-10"
  }
];
