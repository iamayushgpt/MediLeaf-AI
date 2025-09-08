// Quiz and Facts Service
// This service handles fetching quiz and facts data
// It can be easily extended to fetch from an API in the future

import {
  quizQuestions,
  quizCategories,
  difficultyLevels,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  getRandomQuestions,
  getQuestionsByTag,
} from "../data/quizData.js";

import {
  funFacts,
  factCategories,
  getFactsByCategory,
  getFactsByDifficulty,
  getRandomFacts,
  getFactsByPlant,
  getFactsByTag,
} from "../data/funFactsData.js";

/**
 * Quiz Service
 */
class QuizService {
  // Quiz Questions Methods

  /**
   * Get all quiz questions
   * @returns {Array} All quiz questions
   */
  getAllQuestions() {
    return quizQuestions;
  }

  /**
   * Get questions by category
   * @param {string} category - Category name
   * @returns {Array} Filtered questions
   */
  getQuestionsByCategory(category) {
    return getQuestionsByCategory(category);
  }

  /**
   * Get questions by difficulty level
   * @param {string} difficulty - Difficulty level (easy, medium, hard)
   * @returns {Array} Filtered questions
   */
  getQuestionsByDifficulty(difficulty) {
    return getQuestionsByDifficulty(difficulty);
  }

  /**
   * Get random questions for quiz
   * @param {number} count - Number of questions to return
   * @returns {Array} Random questions
   */
  getRandomQuestions(count = 8) {
    return getRandomQuestions(count);
  }

  /**
   * Get questions by tag
   * @param {string} tag - Tag to search for
   * @returns {Array} Filtered questions
   */
  getQuestionsByTag(tag) {
    return getQuestionsByTag(tag);
  }

  /**
   * Get all quiz categories
   * @returns {Array} All categories
   */
  getQuizCategories() {
    return quizCategories;
  }

  /**
   * Get difficulty levels
   * @returns {Array} All difficulty levels
   */
  getDifficultyLevels() {
    return difficultyLevels;
  }

  // Fun Facts Methods

  /**
   * Get all fun facts
   * @returns {Array} All fun facts
   */
  getAllFacts() {
    return funFacts;
  }

  /**
   * Get facts by category
   * @param {string} category - Category name
   * @returns {Array} Filtered facts
   */
  getFactsByCategory(category) {
    return getFactsByCategory(category);
  }

  /**
   * Get facts by difficulty
   * @param {string} difficulty - Difficulty level
   * @returns {Array} Filtered facts
   */
  getFactsByDifficulty(difficulty) {
    return getFactsByDifficulty(difficulty);
  }

  /**
   * Get random facts
   * @param {number} count - Number of facts to return
   * @returns {Array} Random facts
   */
  getRandomFacts(count = 10) {
    return getRandomFacts(count);
  }

  /**
   * Get facts by plant name
   * @param {string} plantName - Plant name to search for
   * @returns {Array} Filtered facts
   */
  getFactsByPlant(plantName) {
    return getFactsByPlant(plantName);
  }

  /**
   * Get facts by tag
   * @param {string} tag - Tag to search for
   * @returns {Array} Filtered facts
   */
  getFactsByTag(tag) {
    return getFactsByTag(tag);
  }

  /**
   * Get fact categories
   * @returns {Array} All fact categories
   */
  getFactCategories() {
    return factCategories;
  }

  // Utility Methods

  /**
   * Search across questions and facts
   * @param {string} searchTerm - Term to search for
   * @returns {Object} Search results
   */
  searchContent(searchTerm) {
    const term = searchTerm.toLowerCase();

    const matchingQuestions = quizQuestions.filter(
      (question) =>
        question.question.toLowerCase().includes(term) ||
        question.category.toLowerCase().includes(term) ||
        question.explanation.toLowerCase().includes(term) ||
        question.tags.some((tag) => tag.toLowerCase().includes(term))
    );

    const matchingFacts = funFacts.filter(
      (fact) =>
        fact.title.toLowerCase().includes(term) ||
        fact.fact.toLowerCase().includes(term) ||
        fact.category.toLowerCase().includes(term) ||
        fact.tags.some((tag) => tag.toLowerCase().includes(term)) ||
        fact.relatedPlants.some((plant) => plant.toLowerCase().includes(term))
    );

    return {
      questions: matchingQuestions,
      facts: matchingFacts,
      total: matchingQuestions.length + matchingFacts.length,
    };
  }

  /**
   * Get content statistics
   * @returns {Object} Statistics about the content
   */
  getStatistics() {
    const questionsByDifficulty = {
      easy: getQuestionsByDifficulty("easy").length,
      medium: getQuestionsByDifficulty("medium").length,
      hard: getQuestionsByDifficulty("hard").length,
    };

    const factsByCategory = factCategories.reduce((acc, category) => {
      acc[category.id] = getFactsByCategory(category.name).length;
      return acc;
    }, {});

    return {
      totalQuestions: quizQuestions.length,
      totalFacts: funFacts.length,
      totalCategories: quizCategories.length,
      totalFactCategories: factCategories.length,
      questionsByDifficulty,
      factsByCategory,
    };
  }

  // Future API Integration Methods
  // These methods can be extended to fetch from backend APIs

  /**
   * Fetch questions from API (placeholder for future implementation)
   * @param {Object} params - API parameters
   * @returns {Promise} API response
   */
  async fetchQuestionsFromAPI(params = {}) {
    // TODO: Implement API call
    // return await api.get('/api/quiz/questions', { params });

    // For now, return local data
    return Promise.resolve({
      success: true,
      data: this.getAllQuestions(),
    });
  }

  /**
   * Fetch facts from API (placeholder for future implementation)
   * @param {Object} params - API parameters
   * @returns {Promise} API response
   */
  async fetchFactsFromAPI(params = {}) {
    // TODO: Implement API call
    // return await api.get('/api/quiz/facts', { params });

    // For now, return local data
    return Promise.resolve({
      success: true,
      data: this.getAllFacts(),
    });
  }

  /**
   * Submit quiz results to API (placeholder for future implementation)
   * @param {Object} results - Quiz results
   * @returns {Promise} API response
   */
  async submitQuizResults(results) {
    // TODO: Implement API call to save quiz results
    // return await api.post('/api/quiz/results', results);

    // For now, just log and return success
    console.log("Quiz results:", results);
    return Promise.resolve({
      success: true,
      message: "Results saved locally",
    });
  }
}

// Export singleton instance
export default new QuizService();
