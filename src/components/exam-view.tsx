"use client";

import { useState, useMemo } from "react";
import { getSubject, Question } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { Translate, useTranslation } from "@/hooks/use-translation";
import { ArrowLeft, CheckCircle, HelpCircle, AlertCircle, Sparkles, Award, RefreshCw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface ExamViewProps {
  subjectId: string;
  lessonId: string;
  onBack: () => void;
  onLessonCompleted: () => void;
}

export function ExamView({ subjectId, lessonId, onBack, onLessonCompleted }: ExamViewProps) {
  const { t } = useTranslation();
  const { completeLesson, achievements } = useProgressStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0); // number of correct answers
  const [examFinished, setExamFinished] = useState(false);

  // Safely find the lesson
  const subject = useMemo(() => getSubject(subjectId), [subjectId]);
  const lesson = useMemo(() => {
    return subject?.lessons.find((l) => l.id === lessonId);
  }, [subject, lessonId]);

  if (!subject || !lesson || !lesson.exam.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Exam questions not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl">
          Go Back
        </button>
      </div>
    );
  }

  const questions = lesson.exam;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isSubmitted) return;

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentQuestion.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setShowHint(false);
    } else {
      // Finish Exam
      const finalPercentage = Math.round(( (score + (selectedOption === currentQuestion.answerIndex ? 1 : 0)) / totalQuestions) * 100);
      
      // Save results
      completeLesson(lessonId, finalPercentage);

      // Trigger Confetti if passed! (>= 70%)
      if (finalPercentage >= 70) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      setExamFinished(true);
    }
  };

  const handleRestartExam = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setScore(0);
    setExamFinished(false);
  };

  if (examFinished) {
    const finalScorePercent = Math.round((score / totalQuestions) * 100);
    const passed = finalScorePercent >= 70;

    return (
      <div id="exam-result-card" className="max-w-xl mx-auto bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md text-center space-y-6 animate-scale-up">
        <div className="flex justify-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md ${
            passed ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}>
            {passed ? "🏆" : "✊"}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-extrabold text-xl md:text-2xl text-gray-800">
            {passed ? <Translate text="Շնորհավորում ենք:" /> : <Translate text="Փորձիր ևս մեկ անգամ" />}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-sm mx-auto">
            {passed 
              ? <Translate text="Դուք հաջողությամբ հանձնեցիք այս քննությունը և բացեցիք հաջորդ դասը:" />
              : <Translate text="Ցավոք, դուք չհավաքեցիք անցողիկ շեմը (70%): Կարդացեք դասը և նորից փորձեք:" />
            }
          </p>
        </div>

        {/* Score indicators */}
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              <Translate text="Գնահատական" />
            </span>
            <span className={`font-extrabold text-2xl ${passed ? "text-emerald-600" : "text-rose-500"}`}>
              {finalScorePercent}%
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
              <Translate text="Արդյունք" />
            </span>
            <span className={`font-bold text-sm block mt-1.5 ${passed ? "text-emerald-600" : "text-rose-500"}`}>
              {passed ? <Translate text="Անցել է" /> : <Translate text="Չի անցել" />}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestartExam}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <Translate text="Սկսել նորից" />
          </button>
          
          <button
            onClick={onLessonCompleted}
            className="flex-1 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-100 transition-all active:scale-95"
          >
            <Translate text="Ավարտել" />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const isCorrectChoice = selectedOption === currentQuestion.answerIndex;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Exam Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <Translate text="Հետ" />
        </button>

        <span className="text-xs font-bold font-mono bg-violet-50 text-violet-700 px-3 py-1 rounded-full">
          <Translate text="Հարց" /> {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Main Question Display */}
      <div id="question-card" className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md space-y-6">
        {/* Question Text */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-violet-500 block">
            <Translate text="Քննություն" />
          </span>
          <h3 className="font-extrabold text-gray-800 text-base md:text-lg leading-normal">
            <Translate text={currentQuestion.question} />
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            let btnStyle = "border-gray-100 hover:border-violet-200 bg-gray-50/30 text-gray-700";
            
            if (selectedOption === idx) {
              btnStyle = "border-violet-400 bg-violet-50 text-violet-800 ring-2 ring-violet-200";
            }

            if (isSubmitted) {
              if (idx === currentQuestion.answerIndex) {
                btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 font-semibold";
              } else if (selectedOption === idx) {
                btnStyle = "border-rose-300 bg-rose-50 text-rose-800";
              } else {
                btnStyle = "border-gray-100 opacity-60 bg-gray-50/10 text-gray-400";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-2xl border text-xs md:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>
                  <Translate text={opt} />
                </span>

                {isSubmitted && idx === currentQuestion.answerIndex && (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Messages */}
        {isSubmitted && (
          <div className={`p-4 rounded-2xl border animate-fade-in text-xs md:text-sm flex flex-col gap-1.5 ${
            isCorrectChoice 
              ? "bg-emerald-50 text-emerald-800 border-emerald-100" 
              : "bg-rose-50 text-rose-800 border-rose-100"
          }`}>
            <div className="flex items-center gap-1.5 font-bold">
              {isCorrectChoice ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <Translate text="Ճիշտ է:" />
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <Translate text="Սխալ պատասխան, նորից փորձիր:" />
                </>
              )}
            </div>
            <p className="opacity-90 leading-relaxed font-normal">
              <Translate text={currentQuestion.explanation} />
            </p>
          </div>
        )}

        {/* Hint and Controls footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-50">
          <div>
            {!isSubmitted && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-violet-600 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <Translate text="Ցույց տալ հուշումը" />
              </button>
            )}

            {showHint && !isSubmitted && (
              <p className="mt-2 text-xs text-amber-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/30 animate-fade-in leading-relaxed">
                <strong><Translate text="Հուշում" />:</strong> <Translate text={currentQuestion.hint} />
              </p>
            )}
          </div>

          <div className="flex justify-end shrink-0">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="w-full sm:w-auto py-2.5 px-6 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-bold rounded-xl text-xs md:text-sm transition-all shadow-sm active:scale-95"
              >
                <Translate text="Ուղարկել" />
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto py-2.5 px-6 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Translate text="Հաջորդ" />
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
