"use client";
export const runtime = 'edge';
import { useState, useEffect, useMemo } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { Subject, Lesson } from "@/lib/data/subjects";
import { useI18nStore } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import { SubjectGrid } from "@/components/subject-grid";
import { LessonList } from "@/components/lesson-list";
import { LessonView } from "@/components/lesson-view";
import { ExamView } from "@/components/exam-view";
import { UniversityBook } from "@/components/university-book";
import { SettingsPanel } from "@/components/settings-panel";
import { GuidesPage } from "@/components/guides-page";
import { 
  GraduationCap, BookOpen, Flame, Award, Trophy, Settings, HelpCircle, 
  ChevronRight, Sparkles, BookMarked, User, Check, Copy, Share2
} from "lucide-react";

export default function Home() {
  const { t, language } = useTranslation();
  const {
    userName,
    userAvatar,
    points,
    level,
    completedCount,
    streak,
    dailyGoal,
    achievements,
    setNameAndAvatar,
    completedLessons,
    addStudySeconds
  } = useProgressStore();

  // Navigation and Modes
  const [activeTab, setActiveTab] = useState<"dashboard" | "guides" | "settings" | "achievements">("dashboard");
  const [mode, setMode] = useState<"school" | "university">("school");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeStep, setActiveStep] = useState<"lessons" | "study" | "exam">("lessons");

  // Onboarding
  const [onboardName, setOnboardName] = useState("");
  const [onboardAvatar, setOnboardAvatar] = useState("👨‍🎓");

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Share link feedback
  const [copiedLessonId, setCopiedLessonId] = useState<string | null>(null);

  // Background study time tracker
  useEffect(() => {
    if (!userName) return;
    const interval = setInterval(() => {
      addStudySeconds(5);
    }, 5000);
    return () => clearInterval(interval);
  }, [userName, addStudySeconds]);

  // Handle direct links sharing
  const handleCopyShareLink = (subjId: string, lesId: string) => {
    try {
      const url = `${window.location.origin}/${language}/${subjId}/${lesId}`;
      navigator.clipboard.writeText(url);
      setCopiedLessonId(lesId);
      setTimeout(() => setCopiedLessonId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardName.trim()) return;
    setNameAndAvatar(onboardName.trim(), onboardAvatar);
  };

  const currentDailyGoalPercent = useMemo(() => {
    return Math.min(100, Math.round((completedCount / dailyGoal) * 100));
  }, [completedCount, dailyGoal]);

  // If user is not onboarded, show elegant full screen onboarding
  if (!userName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-150 shadow-xl p-6 md:p-8 space-y-6 text-center animate-scale-up">
          <div className="space-y-2">
            <span className="text-5xl select-none animate-bounce block">🎓</span>
            <h2 className="font-extrabold text-gray-800 text-xl md:text-2xl font-serif">
              <Translate text="Բարի գալուստ AWESchool" />
            </h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
              <Translate text="Բացահայտեք դպրոցական և համալսարանական ծրագրերը աշխարհի բոլոր լեզուներով: Կառավարեք ձեր առաջընթացը և ստացեք նվաճումներ:" />
            </p>
          </div>

          <form onSubmit={handleOnboardSubmit} className="space-y-4">
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                <Translate text="Ընտրեք ձեր կերպարը" />
              </label>
              <div className="grid grid-cols-6 gap-2 max-w-[280px] mx-auto bg-gray-50 p-2 rounded-2xl border border-gray-150/60">
                {["👨‍🎓", "👩‍🎓", "🧑‍🔬", "👩‍💻", "👨‍🚀", "🧙‍♂️"].map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setOnboardAvatar(av)}
                    className={`text-2xl p-1.5 rounded-lg transition-all ${
                      onboardAvatar === av ? "bg-white shadow-md ring-2 ring-violet-500 scale-110" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                <Translate text="Մուտքագրեք ձեր անունը" />
              </label>
              <input
                type="text"
                value={onboardName}
                onChange={(e) => setOnboardName(e.target.value)}
                placeholder={t("enter_name")}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-50 outline-none rounded-xl text-gray-700 text-sm font-medium transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!onboardName.trim()}
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-150 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-xs md:text-sm shadow-md shadow-violet-100 transition-all active:scale-[0.98]"
            >
              <Translate text="Մուտք Գործել և Սկսել" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/40 pb-16">
      {/* Dynamic Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-150/70 z-30 px-4 py-3 md:py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl text-white shadow-md shadow-violet-100">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-gray-800 text-sm md:text-lg tracking-tight font-serif leading-none">
                AWESchool
              </h1>
              <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 block">
                <Translate text={t("motto")} />
              </span>
            </div>
          </div>

          {/* Quick Menu Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-150/70">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setSelectedSubject(null);
                setSelectedLesson(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "dashboard" && !selectedSubject
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Translate text="Գլխավոր" />
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "achievements"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Translate text="Նվաճումներ" />
            </button>
            <button
              onClick={() => setActiveTab("guides")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "guides"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Translate text="Ուղեցույց" />
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Translate text="Կարգավորումներ" />
            </button>
          </div>

          {/* User profile & Language selector */}
          <div className="flex items-center gap-2.5 shrink-0">
            <LanguageSelector />
            
            <button
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-1.5 p-1 px-2.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200 transition-all text-xs font-bold"
            >
              <span className="text-lg select-none">{userAvatar}</span>
              <span className="text-gray-700 hidden sm:inline max-w-[80px] truncate">{userName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {activeTab === "dashboard" && !selectedSubject && (
          <div className="space-y-6">
            {/* Onboarding welcome info and daily goal progress */}
            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8 bg-white p-6 rounded-3xl border border-gray-150/70 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl select-none bg-violet-50 p-3 rounded-2xl border border-violet-100/50">
                    {userAvatar}
                  </span>
                  <div className="space-y-1">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-gray-800">
                      <Translate text="Ողջույն," /> {userName}!
                    </h2>
                    <p className="text-xs text-gray-400">
                      <Translate text="Շարունակեք ձեր ուսումնական ճանապարհը: Անցեք քննություններ և կառուցեք ձեր ապագան:" />
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center shrink-0 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                  <div className="bg-amber-50 text-amber-700 p-2.5 px-4 rounded-2xl flex items-center gap-1.5 border border-amber-100/50">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
                    <div>
                      <span className="text-[10px] text-amber-600 block font-semibold uppercase leading-none"><Translate text="Շարք" /></span>
                      <span className="text-sm font-extrabold leading-none">{streak} <Translate text="Օր" /></span>
                    </div>
                  </div>

                  <div className="bg-violet-50 text-violet-700 p-2.5 px-4 rounded-2xl flex items-center gap-1.5 border border-violet-100/50">
                    <Trophy className="w-5 h-5 text-violet-500 fill-violet-50 animate-bounce" />
                    <div>
                      <span className="text-[10px] text-violet-600 block font-semibold uppercase leading-none"><Translate text="Փորձ" /></span>
                      <span className="text-sm font-extrabold leading-none">{points} XP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily goal progress tracker */}
              <div className="md:col-span-4 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-3xl text-white shadow-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                    <Translate text="Օրվա նպատակ" />
                  </span>
                  <span className="text-[11px] bg-white/20 p-1 px-2.5 rounded-lg border border-white/10 font-bold">
                    {completedCount} / {dailyGoal} <Translate text="դաս" />
                  </span>
                </div>

                <div className="space-y-1.5 mt-4">
                  <div className="flex items-center justify-between text-[11px] opacity-90 font-medium">
                    <span>
                      {completedCount >= dailyGoal ? (
                        <Translate text="Նպատակը կատարված է:" />
                      ) : (
                        <span>
                          {dailyGoal - completedCount} <Translate text="դաս մնաց այսօրվա նպատակին հասնելու համար" />
                        </span>
                      )}
                    </span>
                    <span className="font-bold">{currentDailyGoalPercent}%</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${currentDailyGoalPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="bg-white p-3 rounded-2xl border border-gray-150/70 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-extrabold text-gray-800 text-xs sm:text-sm">
                    <Translate text="Ընտրեք Ուսուցման Ձևաչափը" />
                  </h4>
                  <p className="text-[10px] text-gray-400">
                    <Translate text="Փոխարկեք դպրոցական ճկուն ռեժիմի կամ համալսարանական հաջորդական ծրագրերի միջև:" />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setMode("school")}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                    mode === "school"
                      ? "bg-white text-violet-700 shadow-sm font-extrabold"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  🏫 <Translate text="Դպրոց" />
                </button>
                <button
                  onClick={() => setMode("university")}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                    mode === "university"
                      ? "bg-white text-violet-700 shadow-sm font-extrabold"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  🎓 <Translate text="Համալսարան" />
                </button>
              </div>
            </div>

            {/* Subject Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-gray-800 text-sm md:text-base uppercase tracking-wider">
                  <Translate text="Ուսումնական Առարկաներ" />
                </h3>
              </div>
              <SubjectGrid
                onSelectSubject={(subj) => {
                  setSelectedSubject(subj);
                  setSelectedLesson(null);
                  setActiveStep("lessons");
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
        )}

        {/* Selected Subject Curriculums */}
        {activeTab === "dashboard" && selectedSubject && activeStep === "lessons" && (
          <div>
            {mode === "university" ? (
              <UniversityBook
                subject={selectedSubject}
                onSelectLesson={(lesson) => {
                  setSelectedLesson(lesson);
                  setActiveStep("study");
                }}
                onBack={() => setSelectedSubject(null)}
              />
            ) : (
              <LessonList
                subject={selectedSubject}
                mode={mode}
                onSelectLesson={(lesson) => {
                  setSelectedLesson(lesson);
                  setActiveStep("study");
                }}
                onBack={() => setSelectedSubject(null)}
              />
            )}

            {/* Direct shareable routing URLs generator */}
            <div className="bg-white p-5 rounded-3xl border border-gray-150/70 shadow-sm mt-8 max-w-4xl mx-auto space-y-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-violet-500" />
                <h4 className="font-bold text-gray-800 text-sm md:text-base">
                  <Translate text="Կիսվել Դասերի Ուղիղ Հղումներով" />
                </h4>
              </div>
              <p className="text-xs text-gray-400">
                <Translate text="Պատճենեք ցանկացած դասի համար նախատեսված առանձին ուղիղ հղումը՝ այլ սարքից կամ ընկերների հետ նույնությամբ կիսվելու համար:" />
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {selectedSubject.lessons.map((les) => (
                  <div
                    key={les.id}
                    className="flex items-center justify-between p-3 bg-gray-50 border border-gray-150/50 rounded-xl"
                  >
                    <span className="text-xs font-semibold text-gray-700 truncate pr-2">
                      <Translate text={les.title} />
                    </span>
                    <button
                      onClick={() => handleCopyShareLink(selectedSubject.id, les.id)}
                      className="px-3 py-1.5 bg-white hover:bg-violet-50 text-violet-600 rounded-lg border border-gray-200 text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
                    >
                      {copiedLessonId === les.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <Translate text="Պատճենված" />
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <Translate text="Պատճենել" />
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Lesson view / slideshow */}
        {activeTab === "dashboard" && selectedSubject && selectedLesson && activeStep === "study" && (
          <LessonView
            lesson={selectedLesson}
            onBack={() => setActiveStep("lessons")}
            onStartExam={() => setActiveStep("exam")}
          />
        )}

        {/* Interactive exam view */}
        {activeTab === "dashboard" && selectedSubject && selectedLesson && activeStep === "exam" && (
          <ExamView
            lesson={selectedLesson}
            onBack={() => setActiveStep("study")}
            onComplete={(score) => {
              // Completion saved, going back handled
            }}
          />
        )}

        {/* Achievements Page */}
        {activeTab === "achievements" && (
          <div className="space-y-6 max-w-4xl mx-auto py-2">
            <div className="bg-white p-6 rounded-3xl border border-gray-150/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-gray-800 text-lg md:text-xl">
                  <Translate text="Իմ Նվաճումները" />
                </h3>
                <p className="text-xs text-gray-400">
                  <Translate text="Անցեք քննություններ, կուտակեք XP և բացեք հատուկ կոչումներ ու մեդալներ:" />
                </p>
              </div>

              <div className="text-xs bg-yellow-50 text-yellow-800 font-bold px-4 py-2 rounded-xl border border-yellow-100 flex items-center gap-1.5">
                🌟 {achievements.filter((a) => a.unlocked).length} / {achievements.length} <Translate text="Բացված" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-5 rounded-2xl border flex items-start gap-4 transition-all duration-300 ${
                    ach.unlocked
                      ? "bg-white border-yellow-200 shadow-md shadow-yellow-50/20"
                      : "bg-gray-50/50 border-gray-100 opacity-60"
                  }`}
                >
                  <span className={`text-4xl p-3 rounded-xl select-none ${
                    ach.unlocked ? "bg-yellow-50" : "bg-gray-150"
                  }`}>
                    {ach.unlocked ? ach.icon : "🔒"}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">
                      <Translate text={ach.title} />
                    </h4>
                    <p className="text-xs text-gray-400 font-sans leading-normal">
                      <Translate text={ach.desc} />
                    </p>
                    {ach.unlocked && (
                      <span className="inline-block text-[9px] font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full uppercase mt-1">
                        Unlocked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guides Page */}
        {activeTab === "guides" && <GuidesPage />}

        {/* Settings Tab */}
        {activeTab === "settings" && <SettingsPanel />}
      </div>

      {/* Bottom Navigation for Mobile devices */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-150 py-2.5 px-4 z-40 shadow-xl flex items-center justify-around gap-2">
        <button
          onClick={() => {
            setActiveTab("dashboard");
            setSelectedSubject(null);
            setSelectedLesson(null);
          }}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "dashboard" ? "text-violet-600" : "text-gray-400"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <Translate text="Գլխավոր" />
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "achievements" ? "text-violet-600" : "text-gray-400"
          }`}
        >
          <Trophy className="w-5 h-5" />
          <Translate text="Նվաճումներ" />
        </button>
        <button
          onClick={() => setActiveTab("guides")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "guides" ? "text-violet-600" : "text-gray-400"
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <Translate text="Ուղեցույց" />
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === "settings" ? "text-violet-600" : "text-gray-400"
          }`}
        >
          <Settings className="w-5 h-5" />
          <Translate text="Կարգավորումներ" />
        </button>
      </footer>
    </main>
  );
}
