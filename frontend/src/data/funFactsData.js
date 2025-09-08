// Fun Facts Data
// This file contains all fun facts about medicinal plants
// You can easily add, modify, or remove facts by editing this file

export const funFacts = [
  {
    id: 1,
    title: "Ancient Pharmacy",
    fact: "The world's oldest known medical text, the Ebers Papyrus from ancient Egypt (1550 BCE), contains over 700 medicinal plant recipes!",
    icon: "📜",
    category: "History",
    source: "Ancient Egyptian Medicine",
    tags: ["ancient medicine", "egypt", "historical texts"],
    difficulty: "easy",
    relatedPlants: ["Aloe", "Garlic", "Onion"],
  },
  {
    id: 2,
    title: "Aspirin Origins",
    fact: "Aspirin was originally derived from willow bark (Salix species), which has been used for pain relief for over 2,400 years!",
    icon: "💊",
    category: "Medicine",
    source: "Modern Pharmacology",
    tags: ["pain relief", "willow bark", "modern medicine"],
    difficulty: "easy",
    relatedPlants: ["Willow"],
  },
  {
    id: 3,
    title: "Turmeric Power",
    fact: "Turmeric contains over 300 chemical compounds! The most famous is curcumin, which gives it the golden color and healing properties.",
    icon: "✨",
    category: "Chemistry",
    source: "Phytochemistry Research",
    tags: ["turmeric", "curcumin", "chemical compounds"],
    difficulty: "medium",
    relatedPlants: ["Turmeric"],
  },
  {
    id: 4,
    title: "Ginseng Longevity",
    fact: "Wild ginseng plants can live for over 100 years! The older the root, the more potent its medicinal properties are believed to be.",
    icon: "🌿",
    category: "Nature",
    source: "Botanical Studies",
    tags: ["ginseng", "longevity", "plant age"],
    difficulty: "medium",
    relatedPlants: ["Ginseng"],
  },
  {
    id: 5,
    title: "Aloe Vera Resilience",
    fact: "Aloe vera can survive without water for up to 3 years! Its leaves store water and nutrients, making it incredibly resilient.",
    icon: "🌵",
    category: "Survival",
    source: "Desert Botany",
    tags: ["aloe vera", "water storage", "adaptation"],
    difficulty: "easy",
    relatedPlants: ["Aloe Vera"],
  },
  {
    id: 6,
    title: "Foxglove Discovery",
    fact: "The heart medication digitalis was discovered when a doctor noticed that patients improved after drinking tea made from foxglove flowers.",
    icon: "💗",
    category: "Discovery",
    source: "Medical History",
    tags: ["foxglove", "digitalis", "heart medicine"],
    difficulty: "hard",
    relatedPlants: ["Foxglove"],
  },
  {
    id: 7,
    title: "Cinchona Bark",
    fact: "Quinine, used to treat malaria, comes from the bark of the cinchona tree. It was so valuable it was called 'Jesuit's bark'!",
    icon: "🦟",
    category: "Disease",
    source: "Tropical Medicine",
    tags: ["malaria", "quinine", "cinchona"],
    difficulty: "hard",
    relatedPlants: ["Cinchona"],
  },
  {
    id: 8,
    title: "Tulsi Sacred",
    fact: "Tulsi (Holy Basil) is so revered in Hindu culture that many households have a dedicated Tulsi plant and worship it daily!",
    icon: "🙏",
    category: "Culture",
    source: "Hindu Traditions",
    tags: ["tulsi", "holy basil", "hindu culture"],
    difficulty: "easy",
    relatedPlants: ["Tulsi", "Holy Basil"],
  },
  {
    id: 9,
    title: "Garlic Strength",
    fact: "Ancient Olympic athletes in Greece ate garlic before competitions for strength and endurance. It was one of the first 'performance enhancers'!",
    icon: "🏃‍♂️",
    category: "Sports",
    source: "Ancient Olympic History",
    tags: ["garlic", "olympics", "performance enhancement"],
    difficulty: "medium",
    relatedPlants: ["Garlic"],
  },
  {
    id: 10,
    title: "Ginkgo Ancient",
    fact: "Ginkgo trees are living fossils! They've existed for over 270 million years and individual trees can live for over 1,000 years.",
    icon: "🕰️",
    category: "Ancient",
    source: "Paleobotany",
    tags: ["ginkgo", "living fossil", "ancient plants"],
    difficulty: "medium",
    relatedPlants: ["Ginkgo"],
  },
  {
    id: 11,
    title: "Cannabis Medicine",
    fact: "Cannabis has been used medicinally for over 5,000 years! Ancient Chinese texts describe its use for treating pain and inflammation.",
    icon: "🌱",
    category: "History",
    source: "Ancient Chinese Medicine",
    tags: ["cannabis", "ancient china", "pain relief"],
    difficulty: "medium",
    relatedPlants: ["Cannabis"],
  },
  {
    id: 12,
    title: "Echinacea Power",
    fact: "Native Americans used echinacea for more ailments than any other plant! They called it the 'cure-all' plant.",
    icon: "🌸",
    category: "Culture",
    source: "Native American Medicine",
    tags: ["echinacea", "native american", "immune system"],
    difficulty: "easy",
    relatedPlants: ["Echinacea"],
  },
  {
    id: 13,
    title: "Opium Poppy History",
    fact: "The opium poppy has been cultivated for over 5,000 years, making it one of humanity's oldest medicinal plants!",
    icon: "🌺",
    category: "History",
    source: "Archaeological Evidence",
    tags: ["opium poppy", "ancient cultivation", "pain medicine"],
    difficulty: "hard",
    relatedPlants: ["Opium Poppy"],
  },
  {
    id: 14,
    title: "Tea Tree Oil",
    fact: "Australian Aboriginal people have used tea tree leaves for wound healing for thousands of years by crushing and inhaling them!",
    icon: "🍃",
    category: "Culture",
    source: "Aboriginal Traditional Medicine",
    tags: ["tea tree", "aboriginal medicine", "wound healing"],
    difficulty: "medium",
    relatedPlants: ["Tea Tree"],
  },
  {
    id: 15,
    title: "Vanilla Medicinal",
    fact: "Vanilla was originally used by the Aztecs as a medicine to treat fever and stomach pain, not as a flavoring!",
    icon: "🌿",
    category: "History",
    source: "Aztec Medicine",
    tags: ["vanilla", "aztec", "fever treatment"],
    difficulty: "medium",
    relatedPlants: ["Vanilla"],
  },
];

// Fun fact categories for organization
export const factCategories = [
  {
    id: "history",
    name: "History",
    description: "Historical uses and ancient discoveries",
    icon: "📜",
    color: "bg-amber-500",
  },
  {
    id: "medicine",
    name: "Medicine",
    description: "Modern medical applications and discoveries",
    icon: "💊",
    color: "bg-red-500",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Chemical compounds and molecular science",
    icon: "⚗️",
    color: "bg-blue-500",
  },
  {
    id: "nature",
    name: "Nature",
    description: "Natural adaptations and survival mechanisms",
    icon: "🌿",
    color: "bg-green-500",
  },
  {
    id: "culture",
    name: "Culture",
    description: "Cultural significance and traditional uses",
    icon: "🌍",
    color: "bg-purple-500",
  },
  {
    id: "discovery",
    name: "Discovery",
    description: "Scientific discoveries and breakthroughs",
    icon: "🔬",
    color: "bg-teal-500",
  },
  {
    id: "disease",
    name: "Disease",
    description: "Disease treatment and prevention",
    icon: "🏥",
    color: "bg-pink-500",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Performance enhancement and athletic use",
    icon: "🏃‍♂️",
    color: "bg-orange-500",
  },
  {
    id: "ancient",
    name: "Ancient",
    description: "Ancient plants and prehistoric usage",
    icon: "🦕",
    color: "bg-indigo-500",
  },
  {
    id: "survival",
    name: "Survival",
    description: "Plant survival strategies and adaptations",
    icon: "🏜️",
    color: "bg-yellow-500",
  },
];

// Function to get facts by category
export const getFactsByCategory = (category) => {
  return funFacts.filter(
    (fact) => fact.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to get facts by difficulty
export const getFactsByDifficulty = (difficulty) => {
  return funFacts.filter((fact) => fact.difficulty === difficulty);
};

// Function to get random facts
export const getRandomFacts = (count = 5) => {
  const shuffled = [...funFacts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get facts by plant
export const getFactsByPlant = (plantName) => {
  return funFacts.filter((fact) =>
    fact.relatedPlants.some((plant) =>
      plant.toLowerCase().includes(plantName.toLowerCase())
    )
  );
};

// Function to get facts by tag
export const getFactsByTag = (tag) => {
  return funFacts.filter((fact) =>
    fact.tags.some((factTag) =>
      factTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};
