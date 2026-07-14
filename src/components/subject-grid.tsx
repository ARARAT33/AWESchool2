"use client";

import { useState, useMemo } from "react";
import { subjects, SUBJECT_CATEGORIES, Subject } from "@/lib/data/subjects";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { Search, Heart, GraduationCap, ArrowRight, Star } from "lucide-react";

interface SubjectGridProps {
  onSelectSubject: (subject: Subject) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SubjectGrid({ onSelectSubject, searchQuery, setSearchQuery }: SubjectGridProps) {
  const { t } = useTranslation();
  const { completedLessons, favorites, toggleFavorite } = useProgressStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: subjects.length };
    subjects.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  const sortedSubjects = useMemo(() => {
    // Sort so that favorites are at the beginning
    return [...subjects].sort((a, b) => {
      const aFav = favorites.includes(a.id) ? 1 : 0;
      const bFav = favorites.includes(b.id) ? 1 : 0;
      return bFav - aFav;
    });
  }, [favorites]);

  const filteredSubjects = useMemo(() => {
    return sortedSubjects.filter((s) => {
      // Category filter
      if (activeCategory !== "all" && s.category !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSubject = s.name.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
        const matchesLessons = s.lessons.some((l) => l.title.toLowerCase().includes(query));
        return matchesSubject || matchesLessons;
      }
      return true;
    });
  }, [sortedSubjects, activeCategory, searchQuery]);

  const getSubjectProgress = (subject: Subject) => {
    const total = subject.lessons.length;
    if (total === 0) return 0;
    const completed = subject.lessons.filter((l) => completedLessons.includes(l.id)).length;
    return {
      percentage: Math.round((completed / total) * 100),
      completed,
      total
    };
  };

  return (
    <div className="space-y-6">
      {/* Search & Category filter */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Categories Carousel / Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none shrink-0 -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setActiveCategory("all")}
            id="cat-tab-all"
            className={`px-4 py-2 text-xs font-semibold rounded-2xl whitespace-nowrap transition-all ${
              activeCategory === "all"
                ? "bg-violet-600 text-white shadow-md shadow-violet-100"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            🌟 <Translate text="Բոլորը" /> ({categoryCounts.all})
          </button>
          {SUBJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              id={`cat-tab-${cat.id}`}
              className={`px-4 py-2 text-xs font-semibold rounded-2xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-100"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <span>{cat.icon}</span>
              <Translate text={cat.name} />
              <span className="text-[10px] opacity-70">({categoryCounts[cat.id] || 0})</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t("search_lessons")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-150 outline-none rounded-2xl focus:border-violet-500 focus:ring-4 focus:ring-violet-50 text-xs md:text-sm text-gray-700 shadow-sm transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => {
            const prog = getSubjectProgress(subject);
            const isFav = favorites.includes(subject.id);
            return (
              <div
                key={subject.id}
                id={`subject-card-${subject.id}`}
                className="group relative bg-white rounded-3xl border border-gray-100 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-50/40 p-5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-violet-50 group-hover:bg-violet-100/80 rounded-2xl text-2xl transition-colors select-none">
                      {subject.icon}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(subject.id);
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        isFav 
                          ? "bg-rose-50 text-rose-500 hover:bg-rose-100" 
                          : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-rose-500" : ""}`} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-violet-600 tracking-wider uppercase bg-violet-50 px-2 py-0.5 rounded-full">
                        <Translate text={SUBJECT_CATEGORIES.find((c) => c.id === subject.category)?.name || subject.category} />
                      </span>
                      {isFav && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          <Translate text="Առաջնային" />
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-base md:text-lg group-hover:text-violet-700 transition-colors">
                      <Translate text={subject.name} />
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      <Translate text={subject.description} />
                    </p>
                  </div>
                </div>

                {/* Progress bar and CTA button */}
                <div className="mt-5 space-y-4 pt-4 border-t border-gray-50">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
                      <span>{prog.completed} / {prog.total} <Translate text="դասեր" /></span>
                      <span className="font-bold text-gray-700">{prog.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-violet-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${prog.percentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectSubject(subject)}
                    className="w-full py-2.5 px-4 bg-gray-50 group-hover:bg-violet-600 group-hover:text-white text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-1.5 text-xs md:text-sm transition-all active:scale-[0.98]"
                  >
                    <Translate text="Բացել Առարկան" />
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 p-8 space-y-2">
          <p className="text-gray-400 text-sm">
            <Translate text="Արդյունքներ չեն գտնվել:" />
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="text-violet-600 font-bold text-xs underline"
          >
            <Translate text="Մաքրել որոնումը" />
          </button>
        </div>
      )}
    </div>
  );
}
