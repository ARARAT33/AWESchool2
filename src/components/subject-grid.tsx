"use client";

import { useState, useMemo } from "react";
import { subjects, SUBJECT_CATEGORIES, Subject } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { Translate, useTranslation } from "@/hooks/use-translation";
import { Search, Star, BookOpen, GraduationCap, School, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

interface SubjectGridProps {
  onSelectSubject: (subjectId: string) => void;
  mode: "school" | "university";
  setMode: (mode: "school" | "university") => void;
}

export function SubjectGrid({ onSelectSubject, mode, setMode }: SubjectGridProps) {
  const { t } = useTranslation();
  const { favorites, toggleFavorite, completedLessons, lessonScores } = useProgressStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Process subjects with search and category filters
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subj) => {
      const matchesCategory = activeCategory === "all" || subj.category === activeCategory;
      const matchesSearch =
        subj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subj.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Calculate stats for each subject
  const getSubjectStats = (subject: Subject) => {
    const totalLessons = subject.lessons.length;
    const completedInSubject = subject.lessons.filter((l) =>
      completedLessons.includes(l.id)
    ).length;
    const progressPercent = totalLessons > 0 ? Math.round((completedInSubject / totalLessons) * 100) : 0;
    
    return {
      total: totalLessons,
      completed: completedInSubject,
      percent: progressPercent,
    };
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector & Search Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Toggle Mode */}
        <div className="flex bg-gray-100/80 p-1.5 rounded-xl w-full md:w-auto relative">
          <button
            onClick={() => setMode("school")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              mode === "school"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <School className="w-4 h-4" />
            <Translate text="Դպրոցական ռեժիմ" />
          </button>
          <button
            onClick={() => setMode("university")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              mode === "university"
                ? "bg-white text-violet-700 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <Translate text="Համալսարանական ռեժիմ" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("search_lessons")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none text-xs md:text-sm transition-all text-gray-700 bg-gray-50/50"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
            activeCategory === "all"
              ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-100"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Translate text="Բոլորը" />
        </button>
        {SUBJECT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all shrink-0 border ${
              activeCategory === cat.id
                ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-100"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>{cat.icon}</span>
            <Translate text={cat.name} />
          </button>
        ))}
      </div>

      {/* Subjects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subj) => {
            const stats = getSubjectStats(subj);
            const isFav = favorites.includes(subj.id);

            return (
              <div
                key={subj.id}
                id={`subject-card-${subj.id}`}
                className="group relative bg-white border border-gray-100 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-violet-100 transition-all flex flex-col justify-between"
              >
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(subj.id);
                  }}
                  className="absolute right-4 top-4 p-2 rounded-xl bg-gray-50 hover:bg-violet-50 text-gray-400 hover:text-amber-500 transition-all active:scale-95"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isFav ? "fill-amber-400 text-amber-500" : ""
                    }`}
                  />
                </button>

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {subj.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-violet-500 px-2.5 py-1 bg-violet-50 rounded-full">
                        <Translate text={subj.category} />
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-gray-800 text-base md:text-lg mb-2 group-hover:text-violet-700 transition-colors">
                    <Translate text={subj.name} />
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                    <Translate text={subj.description} />
                  </p>
                </div>

                {/* Footer and Stats */}
                <div className="space-y-4 pt-4 border-t border-gray-50">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {stats.completed}/{stats.total} <Translate text="դասեր" />
                      </span>
                    </div>
                    {stats.percent > 0 && (
                      <span className="text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {stats.percent}%
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-violet-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats.percent}%` }}
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onSelectSubject(subj.id)}
                    className="w-full py-2.5 px-4 bg-gray-50 group-hover:bg-violet-600 text-gray-700 group-hover:text-white font-semibold rounded-xl flex items-center justify-center gap-1.5 text-xs transition-all active:scale-[0.98]"
                  >
                    <Translate text="Սովորել" />
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white border border-dashed border-gray-200 rounded-3xl p-6">
            <div className="p-3 bg-violet-50 rounded-2xl text-violet-600 mb-3 text-2xl">🔍</div>
            <h4 className="font-bold text-gray-800 text-base mb-1">
              <Translate text="Արդյունքներ չեն գտնվել" />
            </h4>
            <p className="text-xs text-gray-500 max-w-sm">
              <Translate text="Փորձեք փոխել որոնման բառերը կամ ընտրել այլ կատեգորիա:" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
