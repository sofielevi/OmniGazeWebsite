"use client";

import { useState } from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { Section } from "@/components/marketing/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/api-client";
import { Eye, ChevronRight, ChevronLeft, Share2, Mail, Trophy, AlertTriangle, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How quickly can you find all dependencies for a critical application?",
    options: [
      { text: "Under 5 minutes - we have complete documentation", score: 100 },
      { text: "Within an hour - we know where to look", score: 70 },
      { text: "Takes a day - we need to ask multiple people", score: 40 },
      { text: "We don't know - it requires an investigation", score: 10 },
    ],
  },
  {
    id: 2,
    question: "Is your infrastructure documentation up to date?",
    options: [
      { text: "Yes, automatically updated daily", score: 100 },
      { text: "Mostly - manually updated each month", score: 60 },
      { text: "Partially - some is outdated", score: 30 },
      { text: "No - we don't have reliable documentation", score: 0 },
    ],
  },
  {
    id: 3,
    question: "What happens if your primary IT architect is out sick for a week?",
    options: [
      { text: "No problem - everything is documented", score: 100 },
      { text: "Minor challenges - most people know enough", score: 60 },
      { text: "Significant problems - critical knowledge is missing", score: 30 },
      { text: "Chaos - only one person knows the systems", score: 0 },
    ],
  },
  {
    id: 4,
    question: "Do you have full visibility into all your cloud resources?",
    options: [
      { text: "Yes, central dashboard with all cloud accounts", score: 100 },
      { text: "Mostly - we know the official accounts", score: 60 },
      { text: "Partially - there are probably unknown resources", score: 30 },
      { text: "No - we don't know what's running where", score: 0 },
    ],
  },
  {
    id: 5,
    question: "How many 'shadow IT' systems do you think exist in your organization?",
    options: [
      { text: "None - we have strict governance", score: 100 },
      { text: "Few (under 10) - we discover them over time", score: 70 },
      { text: "Some (10-50) - it's a known problem", score: 40 },
      { text: "Many (50+) or we don't know", score: 10 },
    ],
  },
  {
    id: 6,
    question: "Can you trace an application from server to business value?",
    options: [
      { text: "Yes, complete mapping to business capabilities", score: 100 },
      { text: "Partially - we know the most important ones", score: 50 },
      { text: "Rarely - it's hard to see the connection", score: 20 },
      { text: "No - IT and business are separate silos", score: 0 },
    ],
  },
  {
    id: 7,
    question: "How long did your last major IT migration take?",
    options: [
      { text: "As planned or faster", score: 100 },
      { text: "Up to 25% longer than planned", score: 70 },
      { text: "50-100% longer than planned", score: 40 },
      { text: "More than double the time", score: 10 },
    ],
  },
  {
    id: 8,
    question: "How confident are you in your disaster recovery plan?",
    options: [
      { text: "Very confident - tested and documented", score: 100 },
      { text: "Reasonably confident - we have a plan", score: 60 },
      { text: "Uncertain - the plan is outdated", score: 30 },
      { text: "Very uncertain - no working plan", score: 0 },
    ],
  },
];

function getScoreCategory(score: number): {
  level: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  recommendations: string[];
} {
  if (score >= 80) {
    return {
      level: "Excellent",
      color: "text-green-400",
      icon: <Trophy className="w-8 h-8" />,
      description: "You have exceptional visibility into your IT landscape. You're among the top 10% of organizations.",
      recommendations: [
        "Consider further automation to maintain this level",
        "Share your best practices with other teams",
        "Focus on advanced analytics and AI-driven insights",
      ],
    };
  }
  if (score >= 60) {
    return {
      level: "Good",
      color: "text-blue-400",
      icon: <CheckCircle className="w-8 h-8" />,
      description: "You have good visibility, but there's room for improvement. You're in the top 30% of organizations.",
      recommendations: [
        "Automate manual documentation to save time",
        "Establish continuous discovery to keep data fresh",
        "Create better links between IT and business value",
      ],
    };
  }
  if (score >= 40) {
    return {
      level: "Moderate",
      color: "text-yellow-400",
      icon: <AlertTriangle className="w-8 h-8" />,
      description: "You have moderate visibility with significant gaps. This is common, but poses risk.",
      recommendations: [
        "Prioritize mapping critical applications first",
        "Reduce dependence on individual knowledge",
        "Implement automatic infrastructure discovery",
      ],
    };
  }
  return {
    level: "Critical",
    color: "text-red-400",
    icon: <AlertTriangle className="w-8 h-8" />,
    description: "You have limited visibility into your IT landscape. This poses significant risk to the organization.",
    recommendations: [
      "Start by mapping all known systems",
      "Identify and document critical dependencies",
      "Implement a discovery tool as soon as possible",
      "Reduce single points of failure in IT knowledge",
    ],
  };
}

export default function VisibilityQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const totalScore = answers.length > 0
    ? Math.round(answers.reduce((a, b) => a + b, 0) / answers.length)
    : 0;

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmailSubmitted(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const category = getScoreCategory(totalScore);

    // Submit lead to API
    await submitLead({
      email,
      source: 'visibility-quiz',
      data: {
        score: totalScore,
        level: category.level,
        answers: answers,
      },
    });

    setIsSubmitting(false);
    setEmailSubmitted(true);
  };

  const shareOnLinkedIn = () => {
    const category = getScoreCategory(totalScore);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://omnigaze.com/tools/visibility-quiz')}`,
      '_blank'
    );
  };

  const category = getScoreCategory(totalScore);

  return (
    <>
      <Header />

      <main className="pt-32 pb-24">
        <Section>
          {!showResult ? (
            /* Quiz */
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--amber-400)]/20 text-[var(--amber-400)] text-xs mb-4">
                  <Eye size={14} />
                  IT Visibility Quiz
                </div>
                <h1 className="font-display text-3xl md:text-4xl mb-2">
                  What&apos;s Your IT Visibility Score?
                </h1>
                <p className="text-[var(--text-secondary)]">
                  8 questions - 2 minutes - Free
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-[var(--text-muted)] mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--amber-400)] to-[var(--amber-500)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)]">
                <h2 className="font-display text-xl md:text-2xl mb-8">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.score)}
                      className="w-full text-left p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--amber-400)] hover:bg-[var(--amber-400)]/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--amber-400)] group-hover:bg-[var(--amber-400)] flex items-center justify-center text-sm font-medium transition-all">
                          <span className="group-hover:text-[var(--bg-deep)]">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="flex-1">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft size={16} />
                    Previous question
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results */
            <div className="max-w-2xl mx-auto">
              {/* Score Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${category.color} bg-current/20`}>
                  {category.icon}
                </div>
                <div className="text-sm text-[var(--text-muted)] mb-2">Your IT Visibility Score</div>
                <div className={`font-display text-6xl ${category.color} mb-2`}>
                  {totalScore}%
                </div>
                <div className={`text-xl font-medium ${category.color}`}>
                  {category.level}
                </div>
              </div>

              {/* Score Visualization */}
              <div className="mb-8">
                <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${
                      totalScore >= 80 ? 'bg-green-400' :
                      totalScore >= 60 ? 'bg-blue-400' :
                      totalScore >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${totalScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[var(--text-muted)] mt-2">
                  <span>0%</span>
                  <span>Critical</span>
                  <span>Moderate</span>
                  <span>Good</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] mb-6">
                <p className="text-[var(--text-secondary)] mb-4">
                  {category.description}
                </p>
                <div className="text-sm text-[var(--text-muted)]">
                  You score better than {totalScore}% of organizations that have taken this quiz.
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-subtle)] mb-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <ChevronRight size={16} className="text-[var(--amber-400)]" />
                  Recommendations for You
                </h3>
                <ul className="space-y-3">
                  {category.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-3 text-[var(--text-secondary)]">
                      <span className="text-[var(--amber-400)]">-</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email Capture */}
              {!emailSubmitted ? (
                <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--amber-400)]/30 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mail size={16} className="text-[var(--amber-400)]" />
                    <span className="font-medium">Get Your Personal Report</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    We&apos;ll send you a detailed report with specific recommendations based on your answers.
                  </p>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1"
                      required
                    />
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                      {isSubmitting ? '...' : 'Send Report'}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30 text-center mb-6">
                  <div className="text-green-400 mb-2">Thanks!</div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    We&apos;ll be in touch at {email}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Button onClick={shareOnLinkedIn} variant="secondary" className="flex-1">
                  <Share2 size={16} />
                  Share Your Result
                </Button>
                <Button onClick={restart} variant="ghost">
                  Take Quiz Again
                </Button>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[var(--amber-400)]/20 to-[var(--amber-500)]/10 rounded-2xl p-8 border border-[var(--amber-400)]/30 text-center">
                <h3 className="font-display text-xl mb-2">
                  Want to Improve Your Score?
                </h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  OmniGaze gives you complete visibility into your infrastructure - automatically and without agents.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/register" variant="primary">
                    Start Free
                    <ChevronRight size={16} />
                  </ButtonLink>
                  <ButtonLink href="/features" variant="secondary">
                    See How It Works
                  </ButtonLink>
                </div>
              </div>
            </div>
          )}
        </Section>
      </main>

      <Footer />
    </>
  );
}
