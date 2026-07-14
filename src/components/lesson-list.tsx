"use client";

import { useMemo } from "react";
import { Subject, Lesson } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { 
  Play, CheckCircle2, Bookmark, BookmarkCheck, Lock, Award, ArrowLeft, Heart, RefreshCw 
} from "lucide-react";

interface LessonListProps {
  subject: Subject;
  mode: "school" | "university";
  onSelectLesson: (lesson: Lesson) => void;
  onBack: () => void;
}

export function LessonList({ subject, mode, onSelectLesson, onBack }: LessonListProps) {
  const { t } = useTranslation();
  const { 
    completedLessons, 
    lessonScores, 
    bookmarks, 
    toggleBookmark, 
    favorites, 
    toggleFavorite 
  } = useProgressStore();

  const isFavorite = favorites.includes(subject.id);

  const lessonsWithStatus = useMemo(() => {
    let previousCompleted = true;
    return subject.lessons.map((lesson, idx) => {
      const isCompleted = completedLessons.includes(lesson.id);
      const isBookmarked = bookmarks.includes(lesson.id);
      const score = lessonScores[lesson.id] || null;
      
      // In university mode, subsequent lessons are locked unless previous is completed
      const isLocked = mode === "university" && idx > 0 && !previousCompleted;
      
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
  }, [subject.lessons, completedLessons, lessonScores, bookmarks, mode]);

  const completedCount = useMemo(() => {
    return lessonsWithStatus.filter((l) => l.isCompleted).length;
  }, [lessonsWithStatus]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-2">
      {/* Subject Header Card */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-150/70 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 bg-gray-50 hover:bg-violet-50 text-gray-500 hover:text-violet-600 rounded-xl border border-gray-150/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl select-none">{subject.icon}</span>
              <h2 className="font-extrabold text-gray-800 text-xl md:text-2xl">
                <Translate text={subject.name} />
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              <Translate text={subject.description} />
            </p>
          </div>
        </div>

        {/* Favorite & Progress Info */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => toggleFavorite(subject.id)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
              isFavorite
                ? "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100"
                : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
            <Translate text={isFavorite ? "Առաջնային է" : "Ավելացնել Առաջնային"} />
          </button>

          <div className="bg-violet-50 text-violet-700 px-4 py-2 rounded-xl border border-violet-100 font-bold text-xs">
            {completedCount} / {subject.lessons.length} <Translate text="Ավարտված" />
          </div>
        </div>
      </div>

      {/* Curriculum Roadmap Header */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="font-bold text-gray-700 text-sm md:text-base uppercase tracking-wider">
          <Translate text={mode === "university" ? "Համալսարանական Ծրագիր" : "Դպրոցական Դասացուցակ"} />
        </h3>
        {mode === "university" && (
          <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-100/50 px-2 py-1 rounded-lg font-bold">
            🔒 <Translate text="Հաջորդական բացման ռեժիմ" />
          </span>
        )}
      </div>

      {/* Lesson List Items */}
      <div className="space-y-3.5">
        {lessonsWithStatus.map((lesson, idx) => {
          return (
            <div
              key={lesson.id}
              id={`lesson-row-${lesson.id}`}
              className={`group flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 bg-white border rounded-2xl transition-all ${
                lesson.isLocked
                  ? "opacity-60 bg-gray-50/50 border-gray-100"
                  : "border-gray-150/70 hover:border-violet-300 hover:shadow-md hover:shadow-violet-50/30"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1">
                {/* Index Circle or Lock */}
                <div className="relative shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm select-none border transition-colors ${
                    lesson.isLocked
                      ? "bg-gray-100 border-gray-200 text-gray-400"
                      : lesson.isCompleted
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-violet-50 border-violet-100 text-violet-600"
                  }`}>
                    {lesson.isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : lesson.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-50" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                </div>

                {/* Lesson details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-violet-700 transition-colors">
                      <Translate text={lesson.title} />
                    </h4>
                    {lesson.score !== null && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        <Award className="w-3 h-3 text-emerald-600" />
                        {lesson.score}%
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400">
                    <Translate text="Այս դասը պարունակում է տեսական նյութ և ավարտական քննություն:" />
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3.5 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50 shrink-0">
                {/* Bookmark Toggle */}
                <button
                  onClick={() => toggleBookmark(lesson.id)}
                  disabled={lesson.isLocked}
                  className={`p-2 rounded-xl transition-all ${
                    lesson.isLocked
                      ? "text-gray-300 cursor-not-allowed"
                      : lesson.isBookmarked
                      ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  }`}
                >
                  {lesson.isBookmarked ? (
                    <BookmarkCheck className="w-4.5 h-4.5" />
                  ) : (
                    <Bookmark className="w-4.5 h-4.5" />
                  )}
                </button>

                {/* Study / Exam trigger */}
                {lesson.isLocked ? (
                  <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1 border border-gray-200">
                    <Lock className="w-3 h-3" />
                    <Translate text="Փակ է" />
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectLesson(lesson)}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                      lesson.isCompleted
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-violet-600 hover:bg-violet-700 text-white"
                    }`}
                  >
                    <Play className="w-3 h-3 fill-white text-white" />
                    <Translate text={lesson.isCompleted ? "Կրկնել դասը" : "Սկսել դասը"} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
