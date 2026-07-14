"use client";

import { useState } from "react";
import { Lesson, Question } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { 
  ArrowLeft, Check, X, Award, HelpCircle, BookOpen, AlertCircle, ChevronRight, Zap
} from "lucide-react";
import confetti from "canvas-confetti";

interface ExamViewProps {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export function ExamView({ lesson, onBack, onComplete }: ExamViewProps) {
  const { t } = useTranslation();
  const { completeLesson } = useProgressStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  const currentQuestion: Question = lesson.exam[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    
    const isCorrect = selectedOption === currentQuestion.answerIndex;
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowHint(false);
    setSubmitted(false);
    setSelectedOption(null);

    if (currentIdx < lesson.exam.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate final score percentage
      const scorePercent = Math.round((correctAnswers / lesson.exam.length) * 100);
      
      // Save progress
      completeLesson(lesson.id, scorePercent);

      // Confetti shower if passed perfectly
      if (scorePercent === 100) {
        try {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.error(e);
        }
      }

      setExamFinished(true);
    }
  };

  const currentScorePercentage = Math.round((correctAnswers / lesson.exam.length) * 100);
  const isPassed = currentScorePercentage >= 60;

  if (examFinished) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 text-center space-y-6 animate-fade-in">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-md ${
          isPassed 
            ? "bg-emerald-50 border-emerald-500 text-emerald-600" 
            : "bg-rose-50 border-rose-500 text-rose-600"
        }`}>
          {isPassed ? <Award className="w-10 h-10 fill-emerald-50 animate-bounce" /> : <AlertCircle className="w-10 h-10" />}
        </div>

        <div className="space-y-2">
          <h2 className="font-extrabold text-gray-800 text-2xl">
            {isPassed ? <Translate text="Շնորհավորում ենք:" /> : <Translate text="Փորձիր նորից" />}
          </h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
            {isPassed 
              ? <Translate text="Դուք հաջողությամբ անցաք այս դասի քննությունը և ստացաք նոր միավորներ:" />
              : <Translate text="Ցավոք, դուք չհավաքեցիք անցողիկ շեմը (60%): Կրկնեք դասը և փորձեք նորից:" />
            }
          </p>
        </div>

        {/* Big Score circle */}
        <div className="bg-white rounded-3xl p-6 border border-gray-150/80 shadow-sm max-w-xs mx-auto space-y-1">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block">
            <Translate text="Քննության Արդյունք" />
          </span>
          <div className={`text-4xl font-extrabold ${isPassed ? "text-emerald-600" : "text-rose-600"}`}>
            {currentScorePercentage}%
          </div>
          <span className="text-[11px] text-gray-400 block font-medium">
            {correctAnswers} / {lesson.exam.length} <Translate text="ճիշտ պատասխան" />
          </span>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs md:text-sm rounded-xl transition-all active:scale-[0.98]"
          >
            <Translate text="Դեպի դասերը" />
          </button>
          {!isPassed && (
            <button
              onClick={() => {
                setCurrentIdx(0);
                setSelectedOption(null);
                setSubmitted(false);
                setCorrectAnswers(0);
                setShowHint(false);
                setExamFinished(false);
              }}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              <Translate text="Կրկնել քննությունը" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-500 hover:text-violet-600 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <Translate text="Չեղարկել քննությունը" />
        </button>

        <div className="bg-violet-50 text-violet-700 px-3 py-1 rounded-xl border border-violet-100/50 font-bold text-xs flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 fill-violet-600" />
          <span>
            {currentIdx + 1} / {lesson.exam.length} <Translate text="Հարց" />
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-violet-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx) / lesson.exam.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl border border-gray-150/80 shadow-md p-6 md:p-8 space-y-6 relative overflow-hidden">
        {/* Top Watermark */}
        <div className="absolute right-0 top-0 bg-violet-50/50 text-violet-600 px-3 py-1.5 font-mono text-[9px] font-bold rounded-bl-2xl uppercase border-l border-b border-violet-100/30">
          EXAM QUESTION
        </div>

        {/* Question Text */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-violet-500 uppercase tracking-wider">
            <Translate text="Հարց" /> {currentIdx + 1}
          </span>
          <h3 className="font-extrabold text-gray-800 text-base md:text-lg leading-snug">
            <Translate text={currentQuestion.question} />
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = idx === currentQuestion.answerIndex;
            
            let cardStyle = "border-gray-150 hover:border-violet-200 hover:bg-violet-50/20";
            let circleStyle = "border-gray-200 text-gray-400";
            
            if (isSelected) {
              cardStyle = "border-violet-500 bg-violet-50/30 ring-2 ring-violet-200";
              circleStyle = "bg-violet-600 border-violet-600 text-white";
            }

            if (submitted) {
              if (isCorrectAnswer) {
                cardStyle = "border-emerald-500 bg-emerald-50/40 text-emerald-800 font-medium ring-2 ring-emerald-200";
                circleStyle = "bg-emerald-500 border-emerald-500 text-white";
              } else if (isSelected) {
                cardStyle = "border-rose-500 bg-rose-50/40 text-rose-800 font-medium ring-2 ring-rose-200";
                circleStyle = "bg-rose-500 border-rose-500 text-white";
              } else {
                cardStyle = "border-gray-100 opacity-50 cursor-not-allowed";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={submitted}
                className={`w-full flex items-center justify-between p-4 border rounded-2xl text-left text-xs md:text-sm transition-all duration-200 ${cardStyle}`}
              >
                <span className="font-medium pr-3"><Translate text={opt} /></span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border text-[11px] font-bold ${circleStyle}`}>
                  {submitted && isCorrectAnswer ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : submitted && isSelected ? (
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        {submitted && (
          <div className={`p-4 rounded-2xl space-y-2 text-xs md:text-sm leading-relaxed border animate-fade-in ${
            selectedOption === currentQuestion.answerIndex
              ? "bg-emerald-50 border-emerald-100 text-emerald-900"
              : "bg-rose-50 border-rose-100 text-rose-900"
          }`}>
            <div className="font-extrabold flex items-center gap-1.5 text-sm">
              {selectedOption === currentQuestion.answerIndex ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                  <Translate text="Ճիշտ է:" />
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-rose-600 stroke-[3]" />
                  <Translate text="Սխալ պատասխան, նորից փորձիր:" />
                </>
              )}
            </div>
            <p className="opacity-90 font-sans">
              <Translate text={currentQuestion.explanation} />
            </p>
          </div>
        )}

        {/* Footer actions inside Question card */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 flex-wrap gap-2">
          {/* Hint button */}
          {!submitted ? (
            <div className="space-y-1 w-full sm:w-auto">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  <Translate text="Ցույց տալ հուշումը" />
                </button>
              ) : (
                <div className="text-xs text-amber-800 bg-amber-50 border border-amber-100/50 p-3 rounded-xl max-w-sm flex items-start gap-1.5 font-sans animate-scale-up">
                  <span className="shrink-0 text-amber-500 font-bold">💡</span>
                  <p><Translate text={currentQuestion.hint} /></p>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}

          {/* Submit/Next actions */}
          {!submitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-150 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-sm shadow-violet-100 active:scale-[0.98]"
            >
              <Translate text="Ուղարկել" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs md:text-sm rounded-xl flex items-center justify-center gap-1 transition-all shadow-sm active:scale-[0.98]"
            >
              <span>
                {currentIdx < lesson.exam.length - 1 ? <Translate text="Հաջորդ հարցը" /> : <Translate text="Ավարտել քննությունը" />}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
