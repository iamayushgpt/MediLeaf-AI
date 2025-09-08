const PLANT_DATABASE = {
  Aloevera: {
    scientificName: "Aloe barbadensis miller",
    family: "Asphodelaceae",
    commonNames: ["Aloe Vera", "True Aloe", "Barbados Aloe"],
    imageUrl: "",
    medicinalUses: [
      "Skin healing and burns treatment",
      "Digestive health support",
      "Wound healing acceleration",
      "Anti-inflammatory properties",
      "Moisturizing and soothing skin conditions"
    ],
    preparation:
      "Extract clear gel from fresh leaves. Can be applied topically for skin conditions or consumed in small quantities for digestive health.",
    precautions:
      "May cause allergic reactions in sensitive individuals. Avoid during pregnancy and breastfeeding. Can have laxative effects if consumed in large quantities.",
    activeCompounds: ["Aloin", "Emodin", "Polysaccharides", "Vitamins A, C, E"],
    dosage: "Topical: Apply gel directly. Oral: 1-2 tablespoons of juice daily",
    contraindications: ["Pregnancy", "Breastfeeding", "Kidney problems", "Diabetes medications"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Amla: {
    scientificName: "Phyllanthus emblica",
    family: "Phyllanthaceae",
    commonNames: ["Indian Gooseberry", "Amalaki", "Emblic"],
    imageUrl: "",
    medicinalUses: [
      "Rich source of Vitamin C",
      "Hair health and growth promotion",
      "Immunity booster",
      "Powerful antioxidant properties",
      "Liver detoxification support"
    ],
    preparation:
      "Fresh fruit can be eaten raw, made into juice, or dried and powdered. Often used in traditional formulations like Chyawanprash.",
    precautions:
      "Generally safe for most people. May increase bleeding risk with blood-thinning medications.",
    activeCompounds: ["Vitamin C", "Tannins", "Gallic acid", "Ellagic acid"],
    dosage: "Fresh fruit: 1-2 pieces daily. Powder: 3-6 g daily. Juice: 10-20 ml daily",
    contraindications: ["Blood-thinning medications", "Excessive consumption may cause acidity"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Amruthaballi: {
    scientificName: "Tinospora cordifolia",
    family: "Menispermaceae",
    commonNames: ["Guduchi", "Giloy", "Heart-leaved Tinospora"],
    imageUrl: "",
    medicinalUses: [
      "Immunity enhancement",
      "Fever reduction",
      "Blood sugar support",
      "Liver protection",
      "Respiratory support"
    ],
    preparation: "Fresh stem crushed for juice; dried powder or decoction.",
    precautions: "May lower blood sugar; diabetics should monitor levels.",
    activeCompounds: ["Tinosporin", "Berberine", "Giloin", "Alkaloids"],
    dosage: "Fresh juice: 5-10 ml daily. Powder: 1-3 g twice daily. Decoction: 20-40 ml twice daily",
    contraindications: ["Auto-immune diseases", "Pregnancy", "Surgery (discontinue 2 weeks before)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Arali: {
    scientificName: "Nerium oleander",
    family: "Apocynaceae",
    commonNames: ["Oleander", "Rose Bay", "Desert Rose"],
    imageUrl: "",
    medicinalUses: [
      "Traditional topical applications (historical/traditional uses only)",
      "Topical treatments under expert supervision"
    ],
    preparation: "External use only; prepared extracts for topical application by experts.",
    precautions: "Highly toxic if ingested. Keep away from children and pets.",
    activeCompounds: ["Cardiac glycosides", "Oleandrin", "Neriifolin"],
    dosage: "External use only under professional supervision",
    contraindications: ["Internal consumption", "Pregnancy", "Children"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Astma_weed: {
    scientificName: "Euphorbia hirta",
    family: "Euphorbiaceae",
    commonNames: ["Asthma Plant", "Pill-bearing Spurge", "Red Spurge"],
    imageUrl: "",
    medicinalUses: [
      "Respiratory relief",
      "Cough suppression",
      "Bronchitis support",
      "Anti-inflammatory properties"
    ],
    preparation: "Leaves boiled for tea; extracts or dried powder made from leaves.",
    precautions: "May cause skin irritation; start with small doses; avoid in pregnancy.",
    activeCompounds: ["Flavonoids", "Tannins", "Alkaloids", "Sterols"],
    dosage: "Tea: 1-2 cups daily. Extract: 2-5 ml twice daily",
    contraindications: ["Pregnancy", "Breastfeeding", "Skin allergies"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Badipala: {
    scientificName: "Cyclea peltata",
    family: "Menispermaceae",
    commonNames: ["Patha", "Cyclea", "Indian Moonseed"],
    imageUrl: "",
    medicinalUses: [
      "Wound healing",
      "Skin condition treatment",
      "Anti-inflammatory",
      "Pain relief"
    ],
    preparation: "Fresh leaves crushed into paste for external use; decoction under guidance.",
    precautions: "External use preferred; internal under professional supervision.",
    activeCompounds: ["Alkaloids", "Flavonoids", "Saponins"],
    dosage: "External paste: apply 2-3 times daily. Decoction: as directed",
    contraindications: ["Pregnancy", "Breastfeeding", "Liver conditions"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Balloon_Vine: {
    scientificName: "Cardiospermum halicacabum",
    family: "Sapindaceae",
    commonNames: ["Heart Seed", "Love in a Puff", "Balloon Plant"],
    imageUrl: "",
    medicinalUses: [
      "Joint pain relief",
      "Anti-inflammatory topical uses",
      "Skin condition support"
    ],
    preparation: "Leaves processed into oil/extract for external application.",
    precautions: "Limited long-term safety data; use under supervision.",
    activeCompounds: ["Saponins", "Flavonoids", "Cardiac glycosides"],
    dosage: "External application as directed",
    contraindications: ["Pregnancy", "Breastfeeding", "Heart conditions without supervision"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Bamboo: {
    scientificName: "Bambusa vulgaris",
    family: "Poaceae",
    commonNames: ["Common Bamboo", "Golden Bamboo"],
    imageUrl: "",
    medicinalUses: [
      "Digestive support (young shoots when cooked)",
      "Cooling properties",
      "Respiratory support in traditional use"
    ],
    preparation: "Cook young shoots thoroughly; leaf extracts prepared for traditional use.",
    precautions: "Raw shoots contain toxins; ensure proper cooking.",
    activeCompounds: ["Silica", "Potassium", "Fiber"],
    dosage: "Cooked shoots: 50-100 g",
    contraindications: ["Raw consumption", "Kidney stones (monitor)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Beans: {
    scientificName: "Phaseolus vulgaris",
    family: "Fabaceae",
    commonNames: ["Common Bean", "French Bean", "Kidney Bean"],
    imageUrl: "",
    medicinalUses: [
      "Protein source",
      "Digestive health",
      "Support in balanced diets"
    ],
    preparation: "Always cook thoroughly to remove lectins.",
    precautions: "Raw beans are toxic; cook well.",
    activeCompounds: ["Protein", "Fiber", "Folate", "Phaseolamin"],
    dosage: "Cooked: 1/2 to 1 cup daily",
    contraindications: ["Raw consumption", "Severe digestive disorders"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Betel: {
    scientificName: "Piper betle",
    family: "Piperaceae",
    commonNames: ["Betel Leaf", "Paan", "Wild Betel"],
    imageUrl: "",
    medicinalUses: [
      "Digestive stimulant (traditional)",
      "Mild antimicrobial in traditional use",
      "Oral hygiene (traditional use)"
    ],
    preparation: "Fresh leaves chewed or used in preparations; avoid areca nut.",
    precautions: "Excessive use linked to oral health risks when combined with areca nut.",
    activeCompounds: ["Essential oils", "Phenols", "Tannins", "Chavicol"],
    dosage: "Fresh leaves: 1-2 leaves daily",
    contraindications: ["Excessive use", "Oral cancer history"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Bhrami: {
    scientificName: "Bacopa monnieri",
    family: "Plantaginaceae",
    commonNames: ["Brahmi", "Water Hyssop", "Herb of Grace"],
    imageUrl: "",
    medicinalUses: [
      "Cognitive support",
      "Memory enhancement (traditional)",
      "Anxiety reduction support"
    ],
    preparation: "Fresh leaves used or dried powder/oil extracts.",
    precautions: "May cause drowsiness; interacts with CNS meds.",
    activeCompounds: ["Bacosides", "Alkaloids", "Saponins"],
    dosage: "Fresh juice: 5-10 ml daily. Powder: 1-3 g twice daily",
    contraindications: ["Sedative medications", "Surgery (2 weeks before)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Bringaraja: {
    scientificName: "Eclipta prostrata",
    family: "Asteraceae",
    commonNames: ["False Daisy", "Bhringraj", "Trailing Eclipta"],
    imageUrl: "",
    medicinalUses: [
      "Hair growth support (topical oils)",
      "Liver support (traditional)",
      "Scalp health"
    ],
    preparation: "Leaf juice or oil preparations; powder for internal traditional use.",
    precautions: "May cause allergic reactions in sensitive individuals.",
    activeCompounds: ["Wedelic acid", "Ecliptin", "Alkaloids"],
    dosage: "Fresh juice: 5-10 ml daily. Powder/oil: as directed",
    contraindications: ["Known allergies", "Pregnancy (high medicinal doses)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Caricature: {
    scientificName: "Graptophyllum pictum",
    family: "Acanthaceae",
    commonNames: ["Caricature Plant", "Painted Leaf"],
    imageUrl: "",
    medicinalUses: ["Hemorrhoid relief (external)", "Wound healing (external)"],
    preparation: "Leaf poultice/extract for external application.",
    precautions: "Internal safety data limited; prefer external use.",
    activeCompounds: ["Flavonoids", "Tannins", "Alkaloids"],
    dosage: "External: apply 2-3 times daily",
    contraindications: ["Internal consumption without guidance"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Castor: {
    scientificName: "Ricinus communis",
    family: "Euphorbiaceae",
    commonNames: ["Castor Bean", "Palma Christi"],
    imageUrl: "",
    medicinalUses: [
      "Laxative (processed castor oil)",
      "Topical skin/hair applications (processed oil)"
    ],
    preparation: "Use only processed castor oil; never consume raw seeds.",
    precautions: "Seeds contain ricin — highly toxic; do not ingest seeds.",
    activeCompounds: ["Ricinoleic acid", "Ricin (toxic)"],
    dosage: "Castor oil (laxative) only as directed by professional",
    contraindications: ["Pregnancy", "Intestinal obstruction", "Children"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Catharanthus: {
    scientificName: "Catharanthus roseus",
    family: "Apocynaceae",
    commonNames: ["Madagascar Periwinkle", "Rosy Periwinkle", "Vinca"],
    imageUrl: "",
    medicinalUses: [
      "Source of alkaloids used in oncology (medical supervision only)",
      "Traditional uses for various conditions"
    ],
    preparation: "Leaf extracts require professional supervision.",
    precautions: "Contains potent alkaloids; interacts with many medications.",
    activeCompounds: ["Vincristine", "Vinblastine", "Alkaloids"],
    dosage: "Only under professional medical supervision",
    contraindications: ["Self-medication", "Pregnancy", "Breastfeeding"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Chakte: {
    scientificName: "Cassia fistula",
    family: "Fabaceae",
    commonNames: ["Golden Shower Tree", "Pudding Pipe Tree", "Indian Laburnum"],
    imageUrl: "",
    medicinalUses: ["Laxative (traditional)", "Skin applications (traditional)"],
    preparation: "Ripe fruit pulp used as laxative; bark decoction in some uses.",
    precautions: "May cause purging if overused.",
    activeCompounds: ["Anthraquinones", "Sennosides", "Tannins"],
    dosage: "Fruit pulp: 10-20 g (traditional); follow guidance",
    contraindications: ["Pregnancy", "Severe dehydration", "Children under 12"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Chilly: {
    scientificName: "Capsicum annuum",
    family: "Solanaceae",
    commonNames: ["Chili Pepper", "Bell Pepper", "Sweet Pepper"],
    imageUrl: "",
    medicinalUses: ["Topical analgesic (capsaicin)", "Digestive stimulant (culinary)"],
    preparation: "Used fresh, dried, or as capsaicin-containing topical formulations.",
    precautions: "Can irritate skin and eyes; avoid sensitive areas.",
    activeCompounds: ["Capsaicin", "Vitamin C", "Carotenoids"],
    dosage: "Culinary: as desired; topical: follow product directions",
    contraindications: ["Stomach ulcers", "Severe reflux", "Skin hypersensitivity"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  "Citron lime (herelikai)": {
    scientificName: "Citrus medica",
    family: "Rutaceae",
    commonNames: ["Citron", "Buddha's Hand", "Finger Citron"],
    imageUrl: "",
    medicinalUses: ["Digestive support", "Source of Vitamin C"],
    preparation: "Juice, zest, or dried peel used in preparations.",
    precautions: "May interact with certain meds; acidic nature affects enamel.",
    activeCompounds: ["Vitamin C", "Limonene", "Citric acid"],
    dosage: "Fresh juice: 10-20 ml daily",
    contraindications: ["Citrus allergies", "Severe reflux"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Coffee: {
    scientificName: "Coffea arabica",
    family: "Rubiaceae",
    commonNames: ["Arabian Coffee", "Coffee Bean"],
    imageUrl: "",
    medicinalUses: ["Stimulant (caffeine)", "Antioxidant properties"],
    preparation: "Roasted beans brewed as beverage; extracts standardized for supplements.",
    precautions: "Caffeine sensitivity varies; limit in pregnancy and anxiety.",
    activeCompounds: ["Caffeine", "Chlorogenic acids", "Trigonelline"],
    dosage: "Moderate consumption: 1-3 cups daily (up to ~400 mg caffeine total)",
    contraindications: ["Pregnancy (limit intake)", "Arrhythmias", "Severe anxiety"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  "Common rue(naagdalli)": {
    scientificName: "Ruta graveolens",
    family: "Rutaceae",
    commonNames: ["Common Rue", "Herb of Grace", "Garden Rue"],
    imageUrl: "",
    medicinalUses: ["Traditional menstrual regulation (historical)", "Insect repellent (external)"],
    preparation: "Strong preparations can be toxic; external diluted use only under supervision.",
    precautions: "Highly toxic in large amounts; avoid in pregnancy.",
    activeCompounds: ["Rutin", "Coumarins", "Essential oils"],
    dosage: "Only under professional supervision",
    contraindications: ["Pregnancy", "Breastfeeding", "Children", "Large internal doses"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Coriender: {
    scientificName: "Coriandrum sativum",
    family: "Apiaceae",
    commonNames: ["Coriander", "Cilantro"],
    imageUrl: "",
    medicinalUses: ["Digestive aid", "Mild carminative", "Antioxidant support"],
    preparation: "Leaves used fresh; seeds dried and used as spice or decoction.",
    precautions: "Rare allergic reactions possible.",
    activeCompounds: ["Linalool", "Cineole", "Polyphenols"],
    dosage: "Culinary use as desired; seed decoction as traditional guidance",
    contraindications: ["Known allergy to coriander"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Curry: {
    scientificName: "Murraya koenigii",
    family: "Rutaceae",
    commonNames: ["Curry leaf", "Kari patta"],
    imageUrl: "",
    medicinalUses: ["Digestive support", "Antioxidant", "Glucose management support (traditional)"],
    preparation: "Fresh leaves used in cooking or decoctions; oil extracts for topical use.",
    precautions: "Generally safe in culinary amounts; concentrated extracts use with caution.",
    activeCompounds: ["Carbazole alkaloids", "Limonene", "Eugenol"],
    dosage: "Culinary use as desired; extracts as per product guidance",
    contraindications: ["Allergy to plants in Rutaceae (rare)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Doddpathre: {
    scientificName: "Cissus quadrangularis",
    family: "Vitaceae",
    commonNames: ["Veld grape", "Hadjod", "Bone setter"],
    imageUrl: "",
    medicinalUses: ["Bone healing (traditional)", "Anti-inflammatory", "Wound support"],
    preparation: "Stem extracts or powdered form used in traditional formulations.",
    precautions: "Use under guidance in high doses; possible digestive upset.",
    activeCompounds: ["Triterpenoids", "Flavonoids", "Ascorbic acid"],
    dosage: "Powder/extract as per traditional guidance; consult expert",
    contraindications: ["Pregnancy (avoid high doses)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Drumstick: {
    scientificName: "Moringa oleifera",
    family: "Moringaceae",
    commonNames: ["Drumstick", "Moringa", "Horseradish tree"],
    imageUrl: "",
    medicinalUses: ["Nutrient-dense food", "Antioxidant", "Anti-inflammatory (traditional)"],
    preparation: "Leaves used fresh or dried; pods cooked; seed oil used externally.",
    precautions: "Generally safe in food amounts; concentrated extracts use cautiously.",
    activeCompounds: ["Moringinine", "Vitamins", "Polyphenols"],
    dosage: "Culinary use as desired; supplements per product guidance",
    contraindications: ["Pregnancy (some parts advised to avoid high medicinal doses)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Ekka: {
    scientificName: "",
    family: "",
    commonNames: [],
    imageUrl: "",
    medicinalUses: ["Traditional/local uses — fill specific data later"],
    preparation: "Traditional preparations vary by region.",
    precautions: "Unknown local sensitivities — use caution until validated.",
    activeCompounds: [],
    dosage: "",
    contraindications: [],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Eucalyptus: {
    scientificName: "Eucalyptus globulus",
    family: "Myrtaceae",
    commonNames: ["Eucalyptus", "Blue gum"],
    imageUrl: "",
    medicinalUses: ["Respiratory relief (inhalation)", "Antiseptic topical uses"],
    preparation: "Leaf steam/inhalation, essential oil (diluted) for topical use.",
    precautions: "Essential oil is potent — dilute; avoid in infants/young children.",
    activeCompounds: ["Eucalyptol (1,8-cineole)", "Terpenes"],
    dosage: "Inhalation: steam inhalation as needed; oils as per product directions",
    contraindications: ["Infants", "Severe asthma (use with care)"],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Ganigale: {
    scientificName: "",
    family: "",
    commonNames: [],
    imageUrl: "",
    medicinalUses: ["Traditional/local remedies — to be specified"],
    preparation: "Local traditional preparations; fill later with accurate data.",
    precautions: "Use caution until verified.",
    activeCompounds: [],
    dosage: "",
    contraindications: [],
    disclaimer: "Not medical advice. Consult a healthcare professional before use."
  },

  Ganike: {
    scientificName: "",
    family: "",
    commonNames: [],
    imageUrl: "",
    medicinalUses: ["Traditional/local remedies — to be specified"],
    preparation: "Local traditional preparations; fill later with accurate data.",
    precautions: "Use caution until verified.",
    activeCompounds: [],
  }
};

const getPlantInfo = (plantName) => {
  return PLANT_DATABASE[plantName] || null;
};

const getAllPlantNames = () => {
  return Object.keys(PLANT_DATABASE);
};

const getPlantsByFamily = (family) => {
  return Object.entries(PLANT_DATABASE)
    .filter(
      ([name, info]) => info.family.toLowerCase() === family.toLowerCase()
    )
    .map(([name, info]) => ({ name, ...info }));
};

const getPlantsByMedicinalUse = (use) => {
  return Object.entries(PLANT_DATABASE)
    .filter(([name, info]) =>
      info.medicinalUses.some((medUse) =>
        medUse.toLowerCase().includes(use.toLowerCase())
      )
    )
    .map(([name, info]) => ({ name, ...info }));
};

const getDatabaseStats = () => {
  const plants = Object.values(PLANT_DATABASE);
  const families = [...new Set(plants.map((plant) => plant.family))];
  const totalUses = plants.reduce(
    (total, plant) => total + plant.medicinalUses.length,
    0
  );

  return {
    totalPlants: plants.length,
    totalFamilies: families.length,
    totalMedicinalUses: totalUses,
    averageUsesPerPlant: Math.round((totalUses / plants.length) * 10) / 10,
    families: families.sort(),
  };
};

module.exports = {
  PLANT_DATABASE,
  getPlantInfo,
  getAllPlantNames,
  getPlantsByFamily,
  getPlantsByMedicinalUse,
  getDatabaseStats,
};
