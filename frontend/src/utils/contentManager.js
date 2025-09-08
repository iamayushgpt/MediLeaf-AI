// Content Management Utilities
// Helper functions for managing quiz and facts content

import fs from "fs";
import path from "path";

/**
 * Content Management Helper Class
 * Provides utilities for managing quiz and facts content
 */
class ContentManager {
  constructor() {
    this.dataPath = path.join(process.cwd(), "src", "data");
    this.quizDataPath = path.join(this.dataPath, "quizData.js");
    this.factsDataPath = path.join(this.dataPath, "funFactsData.js");
  }

  /**
   * Validate question structure
   * @param {Object} question - Question object to validate
   * @returns {Object} Validation result
   */
  validateQuestion(question) {
    const required = [
      "id",
      "category",
      "difficulty",
      "question",
      "options",
      "correct",
      "explanation",
    ];
    const missing = required.filter((field) => !question.hasOwnProperty(field));

    const errors = [];

    if (missing.length > 0) {
      errors.push(`Missing required fields: ${missing.join(", ")}`);
    }

    if (question.options && question.options.length !== 4) {
      errors.push("Question must have exactly 4 options");
    }

    if (question.correct && (question.correct < 0 || question.correct > 3)) {
      errors.push("Correct answer index must be between 0 and 3");
    }

    if (
      question.difficulty &&
      !["easy", "medium", "hard"].includes(question.difficulty)
    ) {
      errors.push("Difficulty must be easy, medium, or hard");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate fact structure
   * @param {Object} fact - Fact object to validate
   * @returns {Object} Validation result
   */
  validateFact(fact) {
    const required = ["id", "title", "fact", "icon", "category"];
    const missing = required.filter((field) => !fact.hasOwnProperty(field));

    const errors = [];

    if (missing.length > 0) {
      errors.push(`Missing required fields: ${missing.join(", ")}`);
    }

    if (fact.fact && fact.fact.length < 50) {
      errors.push("Fact content should be at least 50 characters long");
    }

    if (fact.title && fact.title.length < 5) {
      errors.push("Title should be at least 5 characters long");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate content template for a new question
   * @returns {Object} Question template
   */
  generateQuestionTemplate() {
    return {
      id: null, // Will be auto-assigned
      category: "Category Name",
      difficulty: "medium",
      question: "Your question here?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correct: 0,
      explanation: "Detailed explanation of why this answer is correct...",
      tags: ["tag1", "tag2", "tag3"],
    };
  }

  /**
   * Generate content template for a new fact
   * @returns {Object} Fact template
   */
  generateFactTemplate() {
    return {
      id: null, // Will be auto-assigned
      title: "Interesting Title",
      fact: "Your fascinating fact about medicinal plants...",
      icon: "🌿",
      category: "Category",
      source: "Source of Information",
      tags: ["tag1", "tag2"],
      difficulty: "easy",
      relatedPlants: ["Plant1", "Plant2"],
    };
  }

  /**
   * Generate content statistics
   * @param {Array} questions - Array of questions
   * @param {Array} facts - Array of facts
   * @returns {Object} Statistics
   */
  generateStatistics(questions, facts) {
    const questionsByDifficulty = {
      easy: questions.filter((q) => q.difficulty === "easy").length,
      medium: questions.filter((q) => q.difficulty === "medium").length,
      hard: questions.filter((q) => q.difficulty === "hard").length,
    };

    const questionsByCategory = {};
    questions.forEach((q) => {
      questionsByCategory[q.category] =
        (questionsByCategory[q.category] || 0) + 1;
    });

    const factsByCategory = {};
    facts.forEach((f) => {
      factsByCategory[f.category] = (factsByCategory[f.category] || 0) + 1;
    });

    return {
      totalQuestions: questions.length,
      totalFacts: facts.length,
      questionsByDifficulty,
      questionsByCategory,
      factsByCategory,
      avgQuestionsPerCategory:
        questions.length / Object.keys(questionsByCategory).length,
      avgFactsPerCategory: facts.length / Object.keys(factsByCategory).length,
    };
  }

  /**
   * Find duplicate IDs in content
   * @param {Array} content - Array of content objects
   * @returns {Array} Duplicate IDs
   */
  findDuplicateIds(content) {
    const ids = content.map((item) => item.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    return [...new Set(duplicates)];
  }

  /**
   * Find next available ID
   * @param {Array} content - Array of content objects
   * @returns {number} Next available ID
   */
  getNextId(content) {
    const maxId = Math.max(...content.map((item) => item.id || 0));
    return maxId + 1;
  }

  /**
   * Validate all content in arrays
   * @param {Array} questions - Array of questions
   * @param {Array} facts - Array of facts
   * @returns {Object} Validation results
   */
  validateAllContent(questions, facts) {
    const questionErrors = [];
    const factErrors = [];

    questions.forEach((question, index) => {
      const validation = this.validateQuestion(question);
      if (!validation.valid) {
        questionErrors.push({
          index,
          id: question.id,
          errors: validation.errors,
        });
      }
    });

    facts.forEach((fact, index) => {
      const validation = this.validateFact(fact);
      if (!validation.valid) {
        factErrors.push({
          index,
          id: fact.id,
          errors: validation.errors,
        });
      }
    });

    const questionDuplicates = this.findDuplicateIds(questions);
    const factDuplicates = this.findDuplicateIds(facts);

    return {
      valid:
        questionErrors.length === 0 &&
        factErrors.length === 0 &&
        questionDuplicates.length === 0 &&
        factDuplicates.length === 0,
      questionErrors,
      factErrors,
      questionDuplicates,
      factDuplicates,
      statistics: this.generateStatistics(questions, facts),
    };
  }

  /**
   * Generate content report
   * @param {Array} questions - Array of questions
   * @param {Array} facts - Array of facts
   * @returns {string} Formatted report
   */
  generateContentReport(questions, facts) {
    const validation = this.validateAllContent(questions, facts);
    const stats = validation.statistics;

    let report = "# Content Report\n\n";

    report += "## Statistics\n";
    report += `- Total Questions: ${stats.totalQuestions}\n`;
    report += `- Total Facts: ${stats.totalFacts}\n`;
    report += `- Questions by Difficulty:\n`;
    report += `  - Easy: ${stats.questionsByDifficulty.easy}\n`;
    report += `  - Medium: ${stats.questionsByDifficulty.medium}\n`;
    report += `  - Hard: ${stats.questionsByDifficulty.hard}\n\n`;

    report += "## Questions by Category\n";
    Object.entries(stats.questionsByCategory).forEach(([category, count]) => {
      report += `- ${category}: ${count}\n`;
    });

    report += "\n## Facts by Category\n";
    Object.entries(stats.factsByCategory).forEach(([category, count]) => {
      report += `- ${category}: ${count}\n`;
    });

    if (!validation.valid) {
      report += "\n## Issues Found\n";

      if (validation.questionDuplicates.length > 0) {
        report += `- Duplicate Question IDs: ${validation.questionDuplicates.join(
          ", "
        )}\n`;
      }

      if (validation.factDuplicates.length > 0) {
        report += `- Duplicate Fact IDs: ${validation.factDuplicates.join(
          ", "
        )}\n`;
      }

      if (validation.questionErrors.length > 0) {
        report += "\n### Question Errors\n";
        validation.questionErrors.forEach((error) => {
          report += `- Question ${error.id} (index ${
            error.index
          }): ${error.errors.join(", ")}\n`;
        });
      }

      if (validation.factErrors.length > 0) {
        report += "\n### Fact Errors\n";
        validation.factErrors.forEach((error) => {
          report += `- Fact ${error.id} (index ${
            error.index
          }): ${error.errors.join(", ")}\n`;
        });
      }
    } else {
      report += "\n## ✅ All Content Valid!\n";
    }

    return report;
  }
}

// Export for use in Node.js scripts
export default ContentManager;

// Example usage:
/*
import ContentManager from './contentManager.js';
import { quizQuestions } from '../data/quizData.js';
import { funFacts } from '../data/funFactsData.js';

const manager = new ContentManager();

// Validate all content
const validation = manager.validateAllContent(quizQuestions, funFacts);
console.log('Content valid:', validation.valid);

// Generate report
const report = manager.generateContentReport(quizQuestions, funFacts);
console.log(report);

// Create new question template
const newQuestion = manager.generateQuestionTemplate();
newQuestion.id = manager.getNextId(quizQuestions);
console.log('New question template:', newQuestion);
*/
