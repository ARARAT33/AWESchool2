"use client";

import { use, useEffect, useState } from "react";
import { getSubject, getLesson, Subject, Lesson } from "@/lib/data/subjects";
import { useI18nStore } from "@/lib/i18n";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { LessonView } from "@/components/lesson-view";
import { ExamView } from "@/components/exam-view";
import { LanguageSelector } from "@/components/language-selector";
import { useProgressStore } from "@/lib/store/progress";
import { GraduationCap, BookOpen, Home, ArrowLeft, Trophy, User } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    lang: string;
    subjectId: string;
    lessonId: string;
  }>;
}

export default function LessonRoutePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { lang, subjectId, lessonId } = resolvedParams;
  
  const { setLanguage } = useI18nStore();
  const { userName, userAvatar, setNameAndAvatar } = useProgressStore();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<"onboarding" | "study" | "exam">("study");
  const [onboardName, setOnboardName] = useState("");
  const [onboardAvatar, setOnboardAvatar] = useState("👨‍🎓");

  // Load subject and lesson
  const subject: Subject | undefined = getSubject(subjectId);
  const lesson: Lesson | undefined = getLesson(subjectId, lessonId);

  // Sync route lang parameter to store
  useEffect(() => {
    if (lang) {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  // Handle onboarding for first time visitors of direct link
  useEffect(() => {
    if (!userName) {
      setActiveStep("onboarding");
    } else {
      setActiveStep("study");
    }
  }, [userName]);

  const handleOnboardSubmit = () => {
    if (!onboardName.trim()) return;
    setNameAndAvatar(onboardName.trim(), onboardAvatar);
    setActiveStep("study");
  };

  if (!subject || !lesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="p-4 bg-rose-50 text-rose-600 rounded-full text-4xl">⚠️</div>
        <h2 className="font-extrabold text-gray-800 text-xl font-serif">
          <Translate text="Առարկան կամ դասը չի գտնվել:" />
        </h2>
        <p className="text-xs text-gray-400 max-w-sm">
          <Translate text="Խնդրում ենք ստուգել հղման ճշտությունը կամ վերադառնալ գլխավոր էջ:" />
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-violet-600 text-white font-bold text-xs rounded-xl shadow-md"
        >
          <Translate text="Գլխավոր Էջ" />
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16">
      {/* Dynamic Route Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-150/50 z-30 px-4 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-gray-50 hover:bg-violet-50 text-gray-500 hover:text-violet-600 rounded-xl border border-gray-150/30 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline"><Translate text="Գլխավոր" /></span>
            </Link>
            
            <div className="h-4 w-[1px] bg-gray-200" />

            <div className="flex items-center gap-1.5">
              <span className="text-xl select-none">{subject.icon}</span>
              <span className="font-bold text-gray-800 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-xs">
                <Translate text={subject.name} />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto pt-6 px-4">
        {/* Step Views */}
        {activeStep === "onboarding" && (
          <div className="max-w-md mx-auto bg-white p-6 md:p-8 rounded-3xl border border-gray-150 shadow-lg text-center space-y-6 my-10 animate-scale-up">
            <div className="space-y-2">
              <span className="text-4xl">👋</span>
              <h3 className="font-extrabold text-gray-800 text-lg md:text-xl">
                <Translate text="Բարի գալուստ AWESchool" />
              </h3>
              <p className="text-xs text-gray-400">
                <Translate text="Մուտքագրեք ձեր անունը՝ այս դասը սկսելու և ձեր առաջընթացը պահպանելու համար:" />
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-center py-2">
                {["👨‍🎓", "👩‍🎓", "🧑‍🔬", "👩‍💻", "👨‍🚀", "🧙‍♂️"].map((av) => (
                  <button
                    key={av}
                    onClick={() => setOnboardAvatar(av)}
                    className={`text-2xl p-2 rounded-xl transition-all ${
                      onboardAvatar === av ? "bg-violet-100 ring-2 ring-violet-500 scale-110" : "hover:bg-gray-50"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder={t("enter_name")}
                value={onboardName}
                onChange={(e) => setOnboardName(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none rounded-xl text-gray-700 text-sm font-medium transition-all"
              />

              <button
                onClick={handleOnboardSubmit}
                disabled={!onboardName.trim()}
                className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:bg-gray-150"
              >
                <Translate text="Սկսել" />
              </button>
            </div>
          </div>
        )}

        {activeStep === "study" && (
          <div className="animate-fade-in">
            <LessonView
              lesson={lesson}
              onBack={() => {
                // Return to home page
                window.location.href = "/";
              }}
              onStartExam={() => setActiveStep("exam")}
            />
          </div>
        )}

        {activeStep === "exam" && (
          <div className="animate-fade-in">
            <ExamView
              lesson={lesson}
              onBack={() => setActiveStep("study")}
              onComplete={(score) => {
                // Score has been saved inside ExamView, redirect or celebrate is handled
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
