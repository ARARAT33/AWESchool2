"use client";

import { useState, useMemo } from "react";
import { subjects, getSubject, Subject, Lesson } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { Translate, useTranslation } from "@/hooks/use-translation";
import { Book, Bookmark, ChevronLeft, ChevronRight, Lock, CheckCircle2, Award, Info, Sparkles } from "lucide-react";

interface UniversityBookProps {
  onSelectLesson: (subjectId: string, lessonId: string) => void;
  onStartExam: (subjectId: string, lessonId: string) => void;
}

export function UniversityBook({ onSelectLesson, onStartExam }: UniversityBookProps) {
  const { t } = useTranslation();
  const { completedLessons, lessonScores, bookmarks, toggleBookmark } = useProgressStore();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const activeSubject = useMemo(() => {
    return getSubject(selectedSubjectId) || subjects[0];
  }, [selectedSubjectId]);

  const activeLesson = useMemo(() => {
    if (!selectedLessonId) return null;
    return activeSubject.lessons.find((l) => l.id === selectedLessonId) || null;
  }, [activeSubject, selectedLessonId]);

  const handleSubjectChange = (id: string) => {
    setSelectedSubjectId(id);
    setSelectedLessonId(null);
    setCurrentPageIndex(0);
  };

  const handleLessonSelect = (lesson: Lesson, isUnlocked: boolean) => {
    if (!isUnlocked) return;
    setSelectedLessonId(lesson.id);
    setCurrentPageIndex(0);
  };

  const handleNextPage = () => {
    if (!activeLesson) return;
    if (currentPageIndex < activeLesson.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Shelf (Tabs representing book volumes) */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none bg-gray-50/50 p-2 rounded-2xl border border-gray-100">
        {subjects.map((subj) => {
          const isActive = selectedSubjectId === subj.id;
          return (
            <button
              key={subj.id}
              onClick={() => handleSubjectChange(subj.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                isActive
                  ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-100 scale-105"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-sm">{subj.icon}</span>
              <Translate text={subj.name} />
            </button>
          );
        })}
      </div>

      {/* Physical Opened Book Layout */}
      <div className="grid gap-6 lg:grid-cols-2 bg-[#FAF6EE] border-4 border-[#8B5A2B] rounded-[32px] shadow-2xl p-6 md:p-8 relative min-h-[540px] overflow-hidden">
        {/* Binder Ring Overlay (recreates middle binder of book) */}
        <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col justify-around py-8 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-10 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 rounded-full shadow-md border-l border-gray-600" />
          ))}
        </div>

        {/* LEFT PAGE: Chapters & Navigation */}
        <div id="book-left-page" className="bg-white rounded-2xl border border-[#EBE3D5] p-5 md:p-6 shadow-sm flex flex-col justify-between space-y-6 relative">
          {/* Notebook line decoration */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-red-100 pointer-events-none" />

          <div className="space-y-4 pl-4">
            <div className="flex items-center gap-2 border-b border-[#F4EFE6] pb-3">
              <span className="text-xl">{activeSubject.icon}</span>
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-wider text-violet-600 font-bold">
                  <Translate text="Ակադեմիական Գիրք" />
                </h3>
                <h2 className="font-extrabold text-base md:text-lg text-gray-800">
                  <Translate text={activeSubject.name} />
                </h2>
              </div>
            </div>

            {/* Chapters list (Lessons) */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {activeSubject.lessons.map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isBookActive = selectedLessonId === lesson.id;
                
                // Sequential locks
                const isUnlocked = idx === 0 || completedLessons.includes(activeSubject.lessons[idx - 1].id);
                const score = lessonScores[lesson.id] || 0;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson, isUnlocked)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      !isUnlocked
                        ? "opacity-40 bg-gray-50 border-gray-100 cursor-not-allowed"
                        : isBookActive
                        ? "bg-violet-50/50 border-violet-200 text-violet-800 ring-2 ring-violet-100/50"
                        : "bg-white hover:bg-gray-50/50 border-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-xs text-gray-400">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                      </span>
                      <p className="font-bold text-xs md:text-sm truncate pr-1">
                        <Translate text={lesson.title} />
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isCompleted && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold">
                          {score}%
                        </span>
                      )}
                      {!isUnlocked ? (
                        <Lock className="w-3.5 h-3.5 text-gray-400" />
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-violet-600 rounded-full" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pl-4 pt-3 border-t border-[#F4EFE6] text-[10px] text-gray-400 flex justify-between">
            <span>AWESchool Volume • {activeSubject.id.toUpperCase()}</span>
            <span>{activeSubject.lessons.length} Chapters</span>
          </div>
        </div>

        {/* RIGHT PAGE: Active Chapter Reading Sheet / Exam Launcher */}
        <div id="book-right-page" className="bg-white rounded-2xl border border-[#EBE3D5] p-5 md:p-6 shadow-sm flex flex-col justify-between space-y-6 relative">
          {/* Notebook line decoration */}
          <div className="absolute right-4 top-0 bottom-0 w-[1px] bg-red-100 pointer-events-none" />

          {activeLesson ? (
            <div className="flex-1 flex flex-col justify-between h-full pr-4">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-[#F4EFE6] pb-3">
                  <div>
                    <span className="font-mono text-[9px] font-bold text-violet-500 uppercase">
                      <Translate text="Ընթացիկ Գլուխ" />
                    </span>
                    <h4 className="font-extrabold text-sm md:text-base text-gray-800 leading-tight">
                      <Translate text={activeLesson.title} />
                    </h4>
                  </div>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                    {currentPageIndex + 1} / {activeLesson.pages.length}
                  </span>
                </div>

                {/* Body Content */}
                <div className="text-xs md:text-sm text-gray-600 leading-relaxed font-serif pt-1 min-h-[220px]">
                  <Translate text={activeLesson.pages[currentPageIndex]} />
                </div>
              </div>

              {/* Navigation and Exam launchers */}
              <div className="space-y-3 pt-4 border-t border-[#F4EFE6]">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPageIndex === 0}
                    className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 text-gray-700 transition-all active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {currentPageIndex === activeLesson.pages.length - 1 ? (
                    <button
                      onClick={() => onStartExam(activeSubject.id, activeLesson.id)}
                      className="py-1.5 px-4 bg-violet-600 hover:bg-violet-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all active:scale-95 animate-pulse"
                    >
                      <Translate text="Անցնել Քննությանը" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectLesson(activeSubject.id, activeLesson.id)}
                      className="py-1.5 px-3.5 bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold rounded-xl text-xs transition-all active:scale-95"
                    >
                      <Translate text="Մեծ Էկրան" />
                    </button>
                  )}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPageIndex === activeLesson.pages.length - 1}
                    className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30 hover:bg-gray-50 text-gray-700 transition-all active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4 pr-4">
              <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center text-2xl text-violet-600">
                📖
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-gray-800 text-sm md:text-base">
                  <Translate text="Ընտրեք Գլուխը ձախից" />
                </h4>
                <p className="text-[11px] text-gray-400 max-w-xs leading-normal">
                  <Translate text="Յուրաքանչյուր առարկա պարունակում է ինտերակտիվ գիտելիքների թերթիկներ և վերջում՝ քննություն:" />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
