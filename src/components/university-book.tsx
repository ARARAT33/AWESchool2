"use client";

import { useState, useMemo } from "react";
import { Subject, Lesson } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { BookOpen, GraduationCap, ArrowLeft, Heart, Lock, CheckCircle2, Bookmark, BookmarkCheck, Play, Award } from "lucide-react";

interface UniversityBookProps {
  subject: Subject;
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export function UniversityBook({ subject, onSelectLesson, onBack }: UniversityBookProps) {
  const { t } = useTranslation();
  const { completedLessons, lessonScores, bookmarks, toggleBookmark, favorites, toggleFavorite } = useProgressStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(subject.lessons[0]?.id || "");

  const isFavorite = favorites.includes(subject.id);

  const lessonsWithStatus = useMemo(() => {
    let previousCompleted = true;
    return subject.lessons.map((lesson, idx) => {
      const isCompleted = completedLessons.includes(lesson.id);
      const isBookmarked = bookmarks.includes(lesson.id);
      const score = lessonScores[lesson.id] || null;
      
      // sequential locking
      const isLocked = idx > 0 && !previousCompleted;
      
      if (!isLocked && isCompleted) {
        previousCompleted = true;
      } else {
        previousCompleted = false;
      }

      return {
        ...lesson,
        isCompleted,
        isBookmarked,
        score,
        isLocked
      };
    });
  }, [subject.lessons, completedLessons, lessonScores, bookmarks]);

  const activeLesson = useMemo(() => {
    return lessonsWithStatus.find((l) => l.id === selectedLessonId) || lessonsWithStatus[0];
  }, [lessonsWithStatus, selectedLessonId]);

  const completedCount = useMemo(() => {
    return lessonsWithStatus.filter((l) => l.isCompleted).length;
  }, [lessonsWithStatus]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      {/* Mini Academic Nav header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-gray-500 hover:text-violet-600 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <Translate text="Դեպի ամբողջ ցանկը" />
        </button>

        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600 animate-bounce" />
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50">
            <Translate text="Համալսարանական Գիտական Ռեժիմ" />
          </span>
        </div>
      </div>

      {/* The Textbook Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-amber-50/20 rounded-3xl border border-amber-200/50 shadow-2xl overflow-hidden min-h-[580px]">
        {/* LEFT COLUMN: The Book Spine / Syllabus Index */}
        <div className="lg:col-span-4 bg-slate-900 text-slate-100 p-6 flex flex-col justify-between border-r border-slate-800">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl select-none">{subject.icon}</span>
                <button
                  onClick={() => toggleFavorite(subject.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    isFavorite ? "bg-rose-500/20 text-rose-400" : "bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isFavorite ? "fill-rose-400" : ""}`} />
                </button>
              </div>
              <h3 className="font-extrabold text-white text-lg md:text-xl font-serif tracking-tight pt-1">
                <Translate text={subject.name} />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                <Translate text={subject.description} />
              </p>
            </div>

            <div className="w-full bg-slate-800 h-[1px]" />

            {/* Syllabus Chapters List */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                <Translate text="Դասախոսությունների Ծրագիր" />
              </span>
              <div className="space-y-1.5">
                {lessonsWithStatus.map((lesson, idx) => {
                  const isActive = lesson.id === selectedLessonId;
                  return (
                    <button
                      key={lesson.id}
                      id={`univ-tab-${lesson.id}`}
                      disabled={lesson.isLocked}
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all text-xs font-medium ${
                        lesson.isLocked
                          ? "opacity-40 cursor-not-allowed"
                          : isActive
                          ? "bg-indigo-600 text-white shadow-md font-semibold"
                          : "bg-slate-800/40 hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="truncate pr-2">
                        {idx + 1}. <Translate text={lesson.title} />
                      </span>
                      {lesson.isLocked ? (
                        <Lock className="w-3 h-3 text-slate-500" />
                      ) : lesson.isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span><Translate text="Ավարտված" /></span>
            <span className="text-white font-mono">{completedCount} / {subject.lessons.length}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: The Open Journal Pages */}
        <div className="lg:col-span-8 bg-stone-50 p-6 md:p-10 flex flex-col justify-between relative shadow-inner overflow-hidden">
          {/* Paper lines overlay */}
          <div className="absolute inset-0 bg-paper-lines pointer-events-none opacity-[0.06]" />

          {activeLesson ? (
            <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between animate-fade-in">
              <div className="space-y-4">
                {/* Topic Header inside Journal */}
                <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block font-serif">
                      LECTURE ESSENTIALS
                    </span>
                    <h4 className="font-extrabold text-stone-800 text-xl md:text-2xl font-serif">
                      <Translate text={activeLesson.title} />
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bookmark */}
                    <button
                      onClick={() => toggleBookmark(activeLesson.id)}
                      className={`p-2 rounded-xl transition-all ${
                        activeLesson.isBookmarked 
                          ? "bg-amber-100 text-amber-600" 
                          : "bg-stone-200/50 text-stone-500 hover:bg-stone-200"
                      }`}
                    >
                      {activeLesson.isBookmarked ? (
                        <BookmarkCheck className="w-4.5 h-4.5" />
                      ) : (
                        <Bookmark className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Lecture abstract / body */}
                <div className="py-4 space-y-4 max-w-2xl font-serif text-stone-700 leading-relaxed text-sm md:text-base border-b border-stone-200/60 pb-6">
                  <p className="indent-8">
                    <Translate text="Սույն դասընթացի շրջանակներում մենք համապարփակ կերպով կուսումնասիրենք սահմանված թեման, վերլուծելով դրա հիմնարար օրենքներն ու գործնական նշանակությունը ժամանակակից գիտական աշխարհում:" />
                  </p>
                  <p className="indent-8 font-medium italic text-stone-600 bg-stone-100/50 p-4 rounded-2xl border-l-4 border-indigo-500">
                    💡 <Translate text={activeLesson.pages[0]} />
                  </p>
                  <p className="indent-8">
                    <Translate text="Ավարտելով տեսական բոլոր էջերի ընթերցումը՝ ուսանողը պատրաստ կլինի հանձնելու ամփոփիչ քննությունը՝ ստանալու համապատասխան որակավորում և XP միավորներ:" />
                  </p>
                </div>
              </div>

              {/* Action and Score metrics */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6">
                <div>
                  {activeLesson.score !== null ? (
                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-2xl">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <div>
                        <span className="text-[10px] text-emerald-600 block font-semibold uppercase tracking-wider">
                          <Translate text="Լավագույն Գնահատական" />
                        </span>
                        <span className="text-sm font-extrabold text-emerald-800">{activeLesson.score}% <Translate text="Ճիշտ" /></span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-stone-400 font-sans">
                      ⚠️ <Translate text="Այս դասախոսությունը դեռևս ավարտված չէ:" />
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelectLesson(activeLesson)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs md:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <Translate text={activeLesson.isCompleted ? "Վերանայել և Կրկնել" : "Սկսել Դասընթացը"} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-stone-400 text-sm">
              <BookOpen className="w-12 h-12 text-stone-300 mb-2" />
              <Translate text="Ընտրեք դասախոսություն ձախ կողմից" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
