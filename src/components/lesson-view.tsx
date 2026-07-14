"use client";

import { useState, useEffect, useMemo } from "react";
import { Lesson, SUBJECT_CATEGORIES, getSubject } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { Translate, useTranslation } from "@/hooks/use-translation";
import { ArrowLeft, ArrowRight, BookOpen, Moon, Sun, Award, Bookmark, CheckCircle, Sparkles } from "lucide-react";

interface LessonViewProps {
  subjectId: string;
  lessonId: string;
  onBack: () => void;
  onStartExam: () => void;
}

export function LessonView({ subjectId, lessonId, onBack, onStartExam }: LessonViewProps) {
  const { t } = useTranslation();
  const { addStudySeconds, bookmarks, toggleBookmark } = useProgressStore();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [nightMode, setNightMode] = useState(false);

  // Retrieve subject and lesson safely
  const subject = useMemo(() => getSubject(subjectId), [subjectId]);
  const lesson = useMemo(() => {
    return subject?.lessons.find((l) => l.id === lessonId);
  }, [subject, lessonId]);

  const isBookmarked = bookmarks.includes(lessonId);

  // Study timer: update study seconds in global progress store
  useEffect(() => {
    const timer = setInterval(() => {
      addStudySeconds(1);
    }, 1000);
    return () => clearInterval(timer);
  }, [addStudySeconds]);

  if (!subject || !lesson) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Lesson not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl">
          Go Back
        </button>
      </div>
    );
  }

  const totalPages = lesson.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  // Generate a distinct seed keyword for the image depending on the lesson/topic
  const imageKeyword = useMemo(() => {
    const text = lesson.title.toLowerCase();
    if (text.includes("math") || text.includes("թվեր") || text.includes("մաթեմ")) return "geometry,numbers,math";
    if (text.includes("geo") || text.includes("աշխարհ") || text.includes("երկր")) return "earth,nature,map";
    if (text.includes("phys") || text.includes("ֆիզ")) return "atom,quantum,energy";
    if (text.includes("chem") || text.includes("քիմ")) return "chemistry,molecule,beaker";
    if (text.includes("bio") || text.includes("կենսաբան")) return "cell,dna,biology";
    if (text.includes("astron") || text.includes("աստղ")) return "space,galaxy,stars";
    if (text.includes("prog") || text.includes("ծրագր") || text.includes("python") || text.includes("js")) return "code,developer,algorithm";
    if (text.includes("web") || text.includes("վեբ")) return "website,design,ui";
    if (text.includes("ai") || text.includes("բանական")) return "robot,ai,neural";
    if (text.includes("chess") || text.includes("շախմատ")) return "chess,board,strategy";
    return "education,learning,science";
  }, [lesson.title]);

  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Upper Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl text-gray-600 transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <Translate text="Հետ դեպի ցանկ" />
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(lesson.id)}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 shadow-sm ${
              isBookmarked
                ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100/70"
                : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-amber-500"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400" : ""}`} />
          </button>

          {/* Night Mode Toggle */}
          <button
            onClick={() => setNightMode(!nightMode)}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 shadow-sm ${
              nightMode
                ? "bg-slate-800 border-slate-700 text-yellow-400"
                : "bg-white border-gray-100 text-slate-500 hover:bg-gray-50"
            }`}
          >
            {nightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Book/Slide Display Shell */}
      <div
        id="lesson-display-card"
        className={`relative rounded-3xl border transition-all duration-300 shadow-md flex flex-col overflow-hidden min-h-[480px] ${
          nightMode
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-gray-100 text-gray-800"
        }`}
      >
        {/* Floating progress line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100/30">
          <div
            className="bg-violet-600 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Card Header */}
        <div className={`p-5 md:p-6 border-b flex items-center justify-between ${
          nightMode ? "border-slate-800 bg-slate-900/50" : "border-gray-50 bg-gray-50/20"
        }`}>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-violet-100 text-violet-700 rounded-lg text-sm">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-wider ${
                nightMode ? "text-violet-400" : "text-violet-500"
              }`}>
                <Translate text={subject.name} />
              </span>
              <h3 className="font-bold text-sm md:text-base leading-none mt-0.5">
                <Translate text={lesson.title} />
              </h3>
            </div>
          </div>
          <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full ${
            nightMode ? "bg-slate-800 text-slate-300" : "bg-gray-100 text-gray-600"
          }`}>
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col md:grid md:grid-cols-2 gap-8 items-center justify-center">
          {/* Text Content */}
          <div className="space-y-4 w-full order-2 md:order-1">
            <div className={`text-sm md:text-base leading-relaxed ${
              nightMode ? "text-slate-300" : "text-gray-600"
            }`}>
              <Translate text={lesson.pages[currentPage]} />
            </div>
          </div>

          {/* Contextual Seeded Illustration Illustration container */}
          <div className="w-full h-44 md:h-64 relative rounded-2xl overflow-hidden bg-violet-50/20 shadow-inner order-1 md:order-2">
            {/* Seeded placeholder graphic using Picsum */}
            <img
              src={`https://picsum.photos/seed/${imageKeyword}_${currentPage}/600/400`}
              alt={lesson.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                // Fallback to a stylish abstract background if image fails to load
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            {/* Fallback SVG Illustration overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/20 flex items-center justify-center pointer-events-none">
              <span className="text-5xl">{subject.icon}</span>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className={`p-5 md:p-6 border-t flex items-center justify-between ${
          nightMode ? "border-slate-800 bg-slate-900/50" : "border-gray-50 bg-gray-50/20"
        }`}>
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 text-xs md:text-sm font-bold py-2 px-3.5 rounded-xl border transition-all ${
              currentPage === 0
                ? "opacity-40 cursor-not-allowed border-gray-100 text-gray-400"
                : nightMode
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <Translate text="Նախորդ" />
          </button>

          {isLastPage ? (
            <button
              onClick={onStartExam}
              className="flex items-center gap-1.5 text-xs md:text-sm font-bold py-2.5 px-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl shadow-md shadow-violet-100/30 transition-all active:scale-95 animate-pulse"
            >
              <Translate text="Անցնել Քննությանը" />
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              className="flex items-center gap-1 text-xs md:text-sm font-bold py-2.5 px-5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-md shadow-violet-100/20 transition-all active:scale-95"
            >
              <Translate text="Հաջորդ" />
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
