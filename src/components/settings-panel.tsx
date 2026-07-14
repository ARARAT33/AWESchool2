"use client";

import { useState, useEffect } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { FileExportImport } from "./file-export-import";
import { 
  User, Award, Flame, Clock, BookOpen, RotateCcw, Save, ShieldAlert, Check, HelpCircle
} from "lucide-react";

const AVATARS = ["👨‍🎓", "👩‍🎓", "🧑‍🔬", "👩‍💻", "👨‍🚀", "🧙‍♂️", "🦄", "🦁", "🦊", "🐼"];

export function SettingsPanel() {
  const { t } = useTranslation();
  const {
    userName,
    userAvatar,
    points,
    level,
    studySeconds,
    streak,
    completedCount,
    dailyGoal,
    setNameAndAvatar,
    resetProgress,
  } = useProgressStore();

  const [name, setName] = useState(userName);
  const [avatar, setAvatar] = useState(userAvatar);
  const [saved, setSaved] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    setName(userName);
    setAvatar(userAvatar);
  }, [userName, userAvatar]);

  const handleSaveProfile = () => {
    if (!name.trim()) return;
    setNameAndAvatar(name.trim(), avatar);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return `${hrs} ${t("hrs")} ${mins % 60} ${t("mins")}`;
    }
    return `${mins} ${t("mins")} ${seconds % 60} ${t("secs") || "վրկ"}`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* Profile & Stats Header */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <div id="profile-card" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm md:col-span-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-violet-600" />
              <Translate text="Իմ Պրոֆիլը" />
            </h3>
            
            <div className="flex flex-col items-center gap-3">
              <span className="text-6xl p-4 bg-violet-50 rounded-full select-none shadow-inner border border-violet-100/50">
                {avatar}
              </span>
              <div className="grid grid-cols-5 gap-2 w-full max-w-[240px]">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setAvatar(av)}
                    className={`text-xl p-1.5 rounded-lg hover:bg-violet-50 transition-all ${
                      avatar === av ? "bg-violet-100 ring-2 ring-violet-500 scale-110" : "scale-100"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <Translate text="Անուն" />
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("enter_name")}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none rounded-xl text-gray-700 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={!name.trim()}
            className="w-full mt-6 py-2.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 text-white font-medium rounded-xl flex items-center justify-center gap-2 text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? <Translate text="Պահպանված է" /> : <Translate text="Պահպանել" />}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="md:col-span-2 bg-gradient-to-br from-violet-600 to-indigo-700 p-6 md:p-8 rounded-3xl text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase opacity-75">
                  <Translate text="Մակարդակ" /> {level}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
                  {name || <Translate text="Ուսանող" />}
                </h2>
              </div>
              <div className="bg-white/10 px-3.5 py-1.5 rounded-2xl flex items-center gap-1.5 border border-white/10 backdrop-blur-md">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400 animate-pulse" />
                <span className="text-xs font-bold">{streak} <Translate text="Օր" /></span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-4">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <Award className="w-5 h-5 text-yellow-300 mb-1" />
                <span className="text-xs opacity-75 block"><Translate text="Միավորներ" /></span>
                <span className="text-lg md:text-xl font-bold">{points} XP</span>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <BookOpen className="w-5 h-5 text-emerald-300 mb-1" />
                <span className="text-xs opacity-75 block"><Translate text="Ավարտված" /></span>
                <span className="text-lg md:text-xl font-bold">{completedCount} <Translate text="դաս" /></span>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/5 backdrop-blur-sm col-span-2 sm:col-span-1">
                <Clock className="w-5 h-5 text-cyan-300 mb-1" />
                <span className="text-xs opacity-75 block"><Translate text="Ուսումնական ժամանակ" /></span>
                <span className="text-sm md:text-base font-bold whitespace-nowrap">{formatTime(studySeconds)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs opacity-75 block"><Translate text="Օրական նպատակ" /></span>
              <span className="text-sm font-semibold">{dailyGoal} <Translate text="դաս օրական" /></span>
            </div>
            <div className="w-1/2 bg-white/20 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-400 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (completedCount / dailyGoal) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Import / Export backup (Digital Signature Protected) */}
      <div className="border-t border-gray-100 pt-8">
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 text-lg">
            <Translate text="Պահեստային Պատճեններ և Փոխանցում" />
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            <Translate text="Արտահանեք կամ ներմուծեք ձեր առաջընթացը՝ օգտագործելով պաշտպանված կրիպտոգրաֆիկ կոդը:" />
          </p>
        </div>
        <FileExportImport />
      </div>

      {/* Dangerous Zone */}
      <div className="border-t border-rose-100 pt-8">
        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-rose-800 text-base flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <Translate text="Զրոյացնել Առաջընթացը" />
            </h4>
            <p className="text-xs text-rose-600/80 leading-relaxed max-w-xl">
              <Translate text="Այս գործողությունը ընդմիշտ կջնջի ձեր ամբողջ առաջընթացը, միավորները, մակարդակները և բացված նվաճումները: Այս գործողությունը անդառնալի է:" />
            </p>
          </div>

          <div>
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="px-5 py-2.5 bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 shadow-sm transition-colors"
              >
                <Translate text="Ջնջել ամբողջը" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    resetProgress();
                    setShowConfirmReset(false);
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  <Translate text="Այո, ջնջել" />
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs rounded-xl transition-colors"
                >
                  <Translate text="Չեղարկել" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
