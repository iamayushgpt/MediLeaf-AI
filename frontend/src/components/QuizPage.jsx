import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import quizService from "../services/quizService";
import {
  Brain,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  XCircle,
  Star,
  Trophy,
  Leaf,
  Clock,
  Target,
} from "lucide-react";

const QuizPage = () => {
  const [currentMode, setCurrentMode] = useState("menu"); // 'menu', 'quiz', 'facts'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Data state
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [funFacts, setFunFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Get random questions for the quiz
        const questions = quizService.getRandomQuestions(8);
        const facts = quizService.getAllFacts();

        setQuizQuestions(questions);
        setFunFacts(facts);
      } catch (error) {
        console.error("Error loading quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Timer effect for quiz
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startQuiz = () => {
    setCurrentMode("quiz");
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const startFacts = () => {
    setCurrentMode("facts");
    setCurrentFactIndex(0);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null || timeLeft === 0) return;

    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowResult(true);

    if (answerIndex === quizQuestions[currentQuestionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1); // Indicate time's up
      setShowResult(true);
      setIsTimerActive(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      setQuizCompleted(true);
      setIsTimerActive(false);
    }
  };

  const nextFact = () => {
    if (currentFactIndex < funFacts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      setCurrentFactIndex(0); // Loop back to first fact
    }
  };

  const prevFact = () => {
    if (currentFactIndex > 0) {
      setCurrentFactIndex(currentFactIndex - 1);
    } else {
      setCurrentFactIndex(funFacts.length - 1); // Loop to last fact
    }
  };

  const resetQuiz = () => {
    setCurrentMode("menu");
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setIsTimerActive(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80)
      return {
        message: "Excellent! You're a medicinal plant expert! 🌟",
        color: "text-green-600",
      };
    if (percentage >= 60)
      return {
        message: "Great job! You know your herbs well! 🌿",
        color: "text-blue-600",
      };
    if (percentage >= 40)
      return {
        message: "Good effort! Keep learning about medicinal plants! 🌱",
        color: "text-yellow-600",
      };
    return {
      message:
        "Keep exploring! There's so much to learn about medicinal plants! 🌿",
      color: "text-orange-600",
    };
  };

  // Menu View
  if (currentMode === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link
                to="/home"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Learn & Explore
                  </h1>
                  <p className="text-xs text-gray-600">
                    Interactive Learning Hub
                  </p>
                </div>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading ? (
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading quiz content...</p>
            </div>
          </main>
        ) : (
          /* Main Content */
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Medicinal Plants
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Test your knowledge with our interactive quiz or discover
                fascinating facts about the world of medicinal plants!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Quiz Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-lg transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Knowledge Quiz
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Test your knowledge about medicinal plants with our
                    interactive quiz. Challenge yourself with questions about
                    herbs, their properties, and traditional uses!
                  </p>
                  <div className="flex items-center justify-center space-x-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>{quizQuestions.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>30s per question</span>
                    </div>
                  </div>
                  <button
                    onClick={startQuiz}
                    disabled={quizQuestions.length === 0}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trophy className="h-5 w-5" />
                    <span>Start Quiz</span>
                  </button>
                </div>
              </div>

              {/* Fun Facts Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:shadow-lg transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Fun Facts
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover amazing and surprising facts about medicinal plants
                    from around the world. Learn interesting trivia and expand
                    your botanical knowledge!
                  </p>
                  <div className="flex items-center justify-center space-x-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>{funFacts.length} Amazing Facts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Leaf className="h-4 w-4" />
                      <span>Botanical Trivia</span>
                    </div>
                  </div>
                  <button
                    onClick={startFacts}
                    disabled={funFacts.length === 0}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Lightbulb className="h-5 w-5" />
                    <span>Explore Facts</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        )}
      </div>
    );
  }

  // Quiz View
  if (currentMode === "quiz") {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (quizCompleted) {
      const scoreMsg = getScoreMessage();
      return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quiz Completed!
              </h2>
              <div className="text-6xl font-bold text-purple-600 mb-4">
                {score}/{quizQuestions.length}
              </div>
              <p className={`text-xl mb-8 ${scoreMsg.color} font-medium`}>
                {scoreMsg.message}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Try Again</span>
                </button>
                <Link
                  to="/home"
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-xl hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
        {/* Quiz Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={resetQuiz}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Exit Quiz</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / quizQuestions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  timeLeft <= 10
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                <Clock className="h-4 w-4" />
                <span className="font-mono font-bold">{timeLeft}s</span>
              </div>
            </div>
          </div>
        </header>

        {/* Quiz Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null || timeLeft === 0}
                  className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === null && timeLeft > 0
                      ? "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      : selectedAnswer === index
                      ? index === currentQuestion.correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : index === currentQuestion.correct && showResult
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 bg-gray-50 text-gray-500"
                  } ${
                    selectedAnswer !== null || timeLeft === 0
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? index === currentQuestion.correct
                            ? "border-green-500 bg-green-500"
                            : "border-red-500 bg-red-500"
                          : index === currentQuestion.correct && showResult
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {showResult &&
                        (selectedAnswer === index ? (
                          index === currentQuestion.correct ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <XCircle className="h-5 w-5 text-white" />
                          )
                        ) : index === currentQuestion.correct ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : null)}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Explanation:
                </h3>
                <p className="text-blue-800">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <div className="text-center">
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-8 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
                >
                  <span>
                    {currentQuestionIndex < quizQuestions.length - 1
                      ? "Next Question"
                      : "View Results"}
                  </span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Time's Up Message */}
            {selectedAnswer === -1 && (
              <div className="text-center">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-orange-900 mb-2">
                    ⏰ Time's Up!
                  </h3>
                  <p className="text-orange-800">
                    The correct answer was:{" "}
                    <strong>
                      {currentQuestion.options[currentQuestion.correct]}
                    </strong>
                  </p>
                  <p className="text-orange-700 mt-2">
                    {currentQuestion.explanation}
                  </p>
                </div>
                <button
                  onClick={nextQuestion}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-8 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
                >
                  <span>
                    {currentQuestionIndex < quizQuestions.length - 1
                      ? "Next Question"
                      : "View Results"}
                  </span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // Fun Facts View
  if (currentMode === "facts") {
    const currentFact = funFacts[currentFactIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100">
        {/* Facts Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setCurrentMode("menu")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Menu</span>
              </button>
              <div className="flex items-center space-x-3">
                <Lightbulb className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Fun Facts
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {currentFactIndex + 1} of {funFacts.length}
              </div>
            </div>
          </div>
        </header>

        {/* Facts Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-white/20 text-center max-w-3xl">
            <div className="text-8xl mb-8">{currentFact.icon}</div>

            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              {currentFact.category}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {currentFact.title}
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              {currentFact.fact}
            </p>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevFact}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {funFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFactIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentFactIndex
                        ? "bg-emerald-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextFact}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default QuizPage;
