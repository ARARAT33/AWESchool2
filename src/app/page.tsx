"use client";

import { useState } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { LanguageSelector } from "@/components/language-selector";
import { SubjectGrid } from "@/components/subject-grid";
import { UniversityBook } from "@/components/university-book";
import { LessonList } from "@/components/lesson-list";
import { LessonView } from "@/components/lesson-view";
import { ExamView } from "@/components/exam-view";
import { SettingsPanel } from "@/components/settings-panel";
import { GuidesPage } from "@/components/guides-page";
import {
  GraduationCap,
  School,
  Flame,
  Award,
  Zap,
  BookOpen,
  Settings,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
  const {
    userName,
    userAvatar,
    setNameAndAvatar,
    points,
    level,
    streak,
  } = useProgressStore();

  // Navigation states
  const [activeTab, setActiveTab] = useState<"subjects" | "settings" | "guides">("subjects");
  const [mode, setMode] = useState<"school" | "university">("school");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);

  // Initial Onboarding states
  const [onboardName, setOnboardName] = useState("");
  const [onboardAvatar, setOnboardAvatar] = useState("👨‍🎓");
  const avatarsList = ["👨‍🎓", "👩‍🎓", "🧑‍💻", "🚀", "🔬", "🎨", "🦁", "🐼", "🦊", "🧙‍♂️", "🦉", "🧠"];

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardName.trim()) return;
    setNameAndAvatar(onboardName.trim(), onboardAvatar);
  };

  const handleBackToSubject = () => {
    setSelectedLessonId(null);
    setIsExamMode(false);
  };

  const handleBackToGrid = () => {
    setSelectedSubjectId(null);
    setSelectedLessonId(null);
    setIsExamMode(false);
  };

  // If new user, show beautiful onboarding form first
  if (!userName) {
    return (
      <main className="min-h-screen bg-[#FCFBFE] flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 z-50">
          <LanguageSelector />
        </div>

        <div className="max-w-md w-full bg-white border border-gray-100 rounded-[32px] p-6 md:p-8 shadow-xl space-y-6 text-center animate-scale-up relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-violet-200/40 rounded-full blur-2xl" />
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-indigo-200/30 rounded-full blur-2xl" />

          <div className="space-y-2 relative">
            <div className="w-16 h-16 bg-violet-50 text-violet-600 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-inner">
              🚀
            </div>
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">
              AWESchool
            </h1>
            <p className="text-xs text-gray-500 leading-normal max-w-xs mx-auto">
              <Translate text="Ընտրեք առարկան, սովորեք դասերը և հանձնեք քննություններ" />
            </p>
          </div>

          <form onSubmit={handleOnboardSubmit} className="space-y-6 text-left relative">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                <Translate text="Մուտքագրեք ձեր անունը" />
              </label>
              <input
                type="text"
                value={onboardName}
                onChange={(e) => setOnboardName(e.target.value)}
                placeholder="Ձեր անունը..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-violet-400 bg-gray-50/50 text-gray-800 text-sm font-semibold transition-all"
                maxLength={25}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                <Translate text="Ընտրեք ձեր կերպարը" />
              </label>
              <div className="grid grid-cols-6 gap-2">
                {avatarsList.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setOnboardAvatar(av)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                      onboardAvatar === av
                        ? "bg-violet-600 text-white scale-110 shadow-md shadow-violet-100"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!onboardName.trim()}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:from-gray-200 disabled:to-gray-200 disabled:cursor-not-allowed text-white font-extrabold rounded-xl flex items-center justify-center gap-1.5 text-xs md:text-sm shadow-md shadow-violet-100 transition-all active:scale-[0.98]"
            >
              <Translate text="Սկսել" />
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Calculate progress level stats
  const pointsNextLevel = level * 250;
  const currentLevelPoints = points - (level - 1) * 250;
  const levelProgressPercent = Math.min(100, Math.max(0, Math.round((currentLevelPoints / 250) * 100)));

  return (
    <main className="min-h-screen bg-[#FCFBFE] text-gray-800 pb-16">
      {/* Top Main Navigation Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100/80 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center text-lg font-black shadow-md shadow-violet-100">
              A
            </div>
            <span className="font-black text-gray-800 text-base md:text-lg tracking-tight select-none">
              AWESchool
            </span>
          </div>

          {/* Student Badge Summary */}
          <div className="hidden sm:flex items-center gap-4 bg-gray-50/50 border border-gray-100 px-4 py-1.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
              <span className="text-base">{userAvatar}</span>
              <span>{userName}</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-bold text-violet-600" title={t("points")}>
                <Zap className="w-3.5 h-3.5 fill-violet-600" />
                <span>{points}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500" title={t("level")}>
                <Award className="w-3.5 h-3.5" />
                <span>Lv {level}</span>
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-1 text-xs font-bold text-orange-500" title={t("streak")}>
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                  <span>{streak}</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Left Navigation Menu (Desktop Sidebar / Tablet Drawer) */}
        <aside className="lg:block">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm space-y-2 sticky top-22">
            {/* Level progress indicator for sidebar */}
            <div className="p-3 bg-violet-50/50 rounded-2xl space-y-2 border border-violet-100/20 mb-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-violet-600">
                <span>LV {level}</span>
                <span>{levelProgressPercent}%</span>
              </div>
              <div className="w-full bg-violet-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-violet-600 h-full rounded-full transition-all duration-300" style={{ width: `${levelProgressPercent}%` }} />
              </div>
              <span className="text-[9px] text-gray-400 block text-center font-semibold">
                {currentLevelPoints}/250 pts to Level {level + 1}
              </span>
            </div>

            <button
              onClick={() => {
                setActiveTab("subjects");
                setSelectedSubjectId(null);
                setSelectedLessonId(null);
                setIsExamMode(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                activeTab === "subjects" && !selectedSubjectId && !selectedLessonId
                  ? "bg-violet-600 text-white shadow-md shadow-violet-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <Translate text="Բոլոր դասերը" />
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setSelectedSubjectId(null);
                setSelectedLessonId(null);
                setIsExamMode(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <Translate text="Կարգավորումներ" />
            </button>

            <button
              onClick={() => {
                setActiveTab("guides");
                setSelectedSubjectId(null);
                setSelectedLessonId(null);
                setIsExamMode(false);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs md:text-sm font-bold transition-all ${
                activeTab === "guides"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <Translate text="Ուղեցույց" />
            </button>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <section className="space-y-6">
          {/* Active view selectors */}
          {selectedLessonId ? (
            isExamMode ? (
              <ExamView
                subjectId={selectedSubjectId!}
                lessonId={selectedLessonId}
                onBack={handleBackToSubject}
                onLessonCompleted={handleBackToGrid}
              />
            ) : (
              <LessonView
                subjectId={selectedSubjectId!}
                lessonId={selectedLessonId}
                onBack={handleBackToSubject}
                onStartExam={() => setIsExamMode(true)}
              />
            )
          ) : selectedSubjectId ? (
            <LessonList
              subjectId={selectedSubjectId}
              onBack={handleBackToGrid}
              onSelectLesson={(lessonId) => {
                setSelectedLessonId(lessonId);
                setIsExamMode(false);
              }}
              onStartExam={(lessonId) => {
                setSelectedLessonId(lessonId);
                setIsExamMode(true);
              }}
            />
          ) : (
            // Tabs views
            <>
              {activeTab === "subjects" && (
                mode === "school" ? (
                  <SubjectGrid
                    onSelectSubject={(id) => setSelectedSubjectId(id)}
                    mode={mode}
                    setMode={setMode}
                  />
                ) : (
                  <UniversityBook
                    onSelectLesson={(subjectId, lessonId) => {
                      setSelectedSubjectId(subjectId);
                      setSelectedLessonId(lessonId);
                      setIsExamMode(false);
                    }}
                    onStartExam={(subjectId, lessonId) => {
                      setSelectedSubjectId(subjectId);
                      setSelectedLessonId(lessonId);
                      setIsExamMode(true);
                    }}
                  />
                )
              )}

              {activeTab === "settings" && <SettingsPanel />}

              {activeTab === "guides" && <GuidesPage />}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
