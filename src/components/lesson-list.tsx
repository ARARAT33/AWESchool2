"use client";

import { useMemo } from "react";
import { getSubject, Lesson } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { Translate, useTranslation } from "@/hooks/use-translation";
import { ArrowLeft, BookOpen, Bookmark, ChevronRight, CheckCircle2, Lock, Star, Award } from "lucide-react";

interface LessonListProps {
  subjectId: string;
  onBack: () => void;
  onSelectLesson: (lessonId: string) => void;
  onStartExam: (lessonId: string) => void;
}

export function LessonList({ subjectId, onBack, onSelectLesson, onStartExam }: LessonListProps) {
  const { t } = useTranslation();
  const { completedLessons, lessonScores, bookmarks, toggleBookmark } = useProgressStore();

  const subject = useMemo(() => {
    return getSubject(subjectId);
  }, [subjectId]);

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Subject not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-xl">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subject Header Card */}
      <div className="relative bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-42 h-42 bg-indigo-500/20 rounded-full blur-3xl" />

        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-all mb-6 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <Translate text="Հետ" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-3xl shadow-inner shrink-0">
            {subject.icon}
          </div>
          <div>
            <h2 className="font-extrabold text-xl md:text-2xl tracking-tight mb-2">
              <Translate text={subject.name} />
            </h2>
            <p className="text-xs md:text-sm text-violet-100/90 leading-relaxed max-w-xl">
              <Translate text={subject.description} />
            </p>
          </div>
        </div>
      </div>

      {/* Sequential Lessons List */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-800 text-base md:text-lg flex items-center gap-2 px-1">
          <BookOpen className="w-4 h-4 text-violet-600" />
          <Translate text="Դասընթացի Ծրագիրը" />
        </h3>

        <div className="grid gap-3">
          {subject.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const score = lessonScores[lesson.id] || 0;
            const isBookmarked = bookmarks.includes(lesson.id);

            // In our sequential flow, lesson 1 is unlocked.
            // Lesson N is unlocked if Lesson N-1 is completed.
            const isUnlocked = index === 0 || completedLessons.includes(subject.lessons[index - 1].id);

            return (
              <div
                key={lesson.id}
                id={`lesson-row-${lesson.id}`}
                className={`group border rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isUnlocked
                    ? "bg-white border-gray-100 hover:border-violet-200 hover:shadow-sm"
                    : "bg-gray-50/50 border-gray-100 opacity-80"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Step number indicator or status */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-600"
                        : !isUnlocked
                        ? "bg-gray-100 text-gray-400"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : !isUnlocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-violet-700 transition-colors">
                        <Translate text={lesson.title} />
                      </h4>
                      {isBookmarked && (
                        <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {lesson.pages.length} <Translate text="էջեր" /> • {lesson.exam.length} <Translate text="հարցեր" />
                    </p>
                  </div>
                </div>

                {/* Right side operations */}
                <div className="flex items-center justify-end gap-3 self-end md:self-auto">
                  {/* Bookmark Toggler */}
                  {isUnlocked && (
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-amber-500 transition-all active:scale-95"
                      title={t("bookmarks")}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-500" : ""}`} />
                    </button>
                  )}

                  {/* Completion score indicator */}
                  {isCompleted && (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl text-xs font-bold">
                      <Award className="w-3.5 h-3.5" />
                      <span>{score}%</span>
                    </div>
                  )}

                  {/* Play/Action Button */}
                  {isUnlocked ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectLesson(lesson.id)}
                        className="py-1.5 px-3 md:py-2 md:px-4 bg-violet-50 hover:bg-violet-100 text-violet-700 font-bold rounded-xl text-xs md:text-sm flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Translate text="Կարդալ" />
                      </button>
                      <button
                        onClick={() => onStartExam(lesson.id)}
                        className={`py-1.5 px-3 md:py-2 md:px-4 text-white font-bold rounded-xl text-xs md:text-sm flex items-center gap-1 transition-all active:scale-95 ${
                          isCompleted
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "bg-violet-600 hover:bg-violet-700"
                        }`}
                      >
                        <Translate text={isCompleted ? "Քննություն" : "Քննություն"} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-gray-400 font-medium select-none bg-gray-100 px-2.5 py-1 rounded-lg">
                      <Lock className="w-3 h-3" />
                      <Translate text="Փակ է" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
