// Quiz Questions Data
// This file contains all quiz questions about medicinal plants
// You can easily add, modify, or remove questions by editing this file

export const quizQuestions = [
  {
    id: 1,
    category: "Traditional Medicine",
    difficulty: "easy",
    question:
      "Which medicinal plant is commonly known as the 'Queen of Herbs'?",
    options: ["Turmeric", "Tulsi (Holy Basil)", "Ginger", "Garlic"],
    correct: 1,
    explanation:
      "Tulsi (Holy Basil) is often called the 'Queen of Herbs' due to its numerous medicinal properties and sacred significance in Indian culture.",
    tags: ["ayurveda", "indian medicine", "sacred plants"],
  },
  {
    id: 2,
    category: "Plant Chemistry",
    difficulty: "medium",
    question:
      "What is the active compound in turmeric that gives it anti-inflammatory properties?",
    options: ["Capsaicin", "Curcumin", "Allicin", "Gingerol"],
    correct: 1,
    explanation:
      "Curcumin is the main bioactive compound in turmeric responsible for its golden color and powerful anti-inflammatory effects.",
    tags: ["chemistry", "compounds", "anti-inflammatory"],
  },
  {
    id: 3,
    category: "Plant Anatomy",
    difficulty: "easy",
    question:
      "Which part of the ginger plant is commonly used for medicinal purposes?",
    options: ["Leaves", "Flowers", "Rhizome (Root)", "Seeds"],
    correct: 2,
    explanation:
      "The rhizome (underground stem) of ginger is the part most commonly used for its medicinal properties, especially for digestive issues and nausea.",
    tags: ["plant parts", "ginger", "digestive health"],
  },
  {
    id: 4,
    category: "Therapeutic Uses",
    difficulty: "easy",
    question: "Aloe vera gel is primarily used for treating which condition?",
    options: [
      "Respiratory issues",
      "Skin conditions and burns",
      "Digestive problems",
      "Joint pain",
    ],
    correct: 1,
    explanation:
      "Aloe vera gel is widely known for its soothing properties in treating skin conditions, burns, and wounds due to its anti-inflammatory and healing compounds.",
    tags: ["skin care", "healing", "topical treatment"],
  },
  {
    id: 5,
    category: "Scientific Names",
    difficulty: "medium",
    question: "Which medicinal plant is known as 'Indian Winter Cherry'?",
    options: ["Brahmi", "Ashwagandha", "Shankhpushpi", "Jatamansi"],
    correct: 1,
    explanation:
      "Ashwagandha (Withania somnifera) is commonly known as 'Indian Winter Cherry' and is prized for its adaptogenic properties.",
    tags: ["adaptogens", "stress relief", "ayurveda"],
  },
  {
    id: 6,
    category: "Multiple Benefits",
    difficulty: "medium",
    question: "What is the primary benefit of consuming neem leaves?",
    options: [
      "Boosting immunity",
      "Improving digestion",
      "Blood purification",
      "All of the above",
    ],
    correct: 3,
    explanation:
      "Neem leaves offer multiple benefits including boosting immunity, improving digestion, and blood purification, making it a versatile medicinal plant.",
    tags: ["immunity", "detox", "multipurpose"],
  },
  {
    id: 7,
    category: "Plant Chemistry",
    difficulty: "medium",
    question:
      "Which compound in garlic is responsible for its antimicrobial properties?",
    options: ["Allicin", "Quercetin", "Saponins", "Flavonoids"],
    correct: 0,
    explanation:
      "Allicin is the sulfur compound in garlic that provides its characteristic smell and powerful antimicrobial properties.",
    tags: ["antimicrobial", "garlic", "sulfur compounds"],
  },
  {
    id: 8,
    category: "Cognitive Health",
    difficulty: "medium",
    question: "Brahmi is traditionally used to enhance which bodily function?",
    options: [
      "Cardiovascular health",
      "Digestive system",
      "Memory and cognitive function",
      "Respiratory health",
    ],
    correct: 2,
    explanation:
      "Brahmi (Bacopa monnieri) is renowned in Ayurveda for enhancing memory, cognitive function, and overall brain health.",
    tags: ["brain health", "memory", "nootropics"],
  },
  {
    id: 9,
    category: "Traditional Medicine",
    difficulty: "hard",
    question:
      "Which of these plants is traditionally used in Ayurveda for treating diabetes?",
    options: [
      "Bitter Gourd",
      "Fenugreek",
      "Gymnema Sylvestre",
      "All of the above",
    ],
    correct: 3,
    explanation:
      "All three plants - Bitter Gourd (Karela), Fenugreek (Methi), and Gymnema Sylvestre (Gurmar) - are traditionally used in Ayurveda for managing blood sugar levels.",
    tags: ["diabetes", "blood sugar", "ayurveda"],
  },
  {
    id: 10,
    category: "Plant Properties",
    difficulty: "hard",
    question: "What makes Echinacea particularly valuable in herbal medicine?",
    options: [
      "Pain relief properties",
      "Immune system support",
      "Sleep improvement",
      "Digestive aid",
    ],
    correct: 1,
    explanation:
      "Echinacea is primarily valued for its immune-boosting properties and is commonly used to prevent and treat cold and flu symptoms.",
    tags: ["immune system", "cold prevention", "western herbalism"],
  },
];

// Quiz categories for filtering and organization
export const quizCategories = [
  {
    id: "traditional-medicine",
    name: "Traditional Medicine",
    description: "Ancient healing practices and cultural significance",
    color: "bg-emerald-500",
  },
  {
    id: "plant-chemistry",
    name: "Plant Chemistry",
    description: "Active compounds and their effects",
    color: "bg-blue-500",
  },
  {
    id: "plant-anatomy",
    name: "Plant Anatomy",
    description: "Parts of plants used medicinally",
    color: "bg-green-500",
  },
  {
    id: "therapeutic-uses",
    name: "Therapeutic Uses",
    description: "Medical applications and treatments",
    color: "bg-purple-500",
  },
  {
    id: "scientific-names",
    name: "Scientific Names",
    description: "Botanical nomenclature and classification",
    color: "bg-indigo-500",
  },
  {
    id: "multiple-benefits",
    name: "Multiple Benefits",
    description: "Plants with diverse medicinal properties",
    color: "bg-teal-500",
  },
  {
    id: "cognitive-health",
    name: "Cognitive Health",
    description: "Brain and mental health support",
    color: "bg-pink-500",
  },
  {
    id: "plant-properties",
    name: "Plant Properties",
    description: "Specific medicinal properties and effects",
    color: "bg-orange-500",
  },
];

// Difficulty levels
export const difficultyLevels = [
  {
    id: "easy",
    name: "Easy",
    description: "Basic knowledge about common medicinal plants",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "medium",
    name: "Medium",
    description: "Intermediate knowledge about plant properties",
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    id: "hard",
    name: "Hard",
    description: "Advanced knowledge about specialized topics",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

// Function to get questions by category
export const getQuestionsByCategory = (category) => {
  return quizQuestions.filter(
    (question) =>
      question.category.toLowerCase().replace(/\s+/g, "-") === category
  );
};

// Function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty) => {
  return quizQuestions.filter((question) => question.difficulty === difficulty);
};

// Function to get random questions
export const getRandomQuestions = (count = 5) => {
  const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to get questions by tags
export const getQuestionsByTag = (tag) => {
  return quizQuestions.filter((question) =>
    question.tags.some((questionTag) =>
      questionTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};
