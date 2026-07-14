"use client";

import { useState } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { FileExportImport } from "./file-export-import";
import { User, Award, Zap, Clock, BookOpen, RotateCcw, AlertTriangle, Check, ShieldAlert } from "lucide-react";

export function SettingsPanel() {
  const { t } = useTranslation();
  const {
    userName,
    userAvatar,
    setNameAndAvatar,
    points,
    level,
    completedCount,
    studySeconds,
    streak,
    resetProgress,
  } = useProgressStore();

  const [tempName, setTempName] = useState(userName);
  const [tempAvatar, setTempAvatar] = useState(userAvatar);
  const [savedMessage, setSavedMessage] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const avatars = ["👨‍🎓", "👩‍🎓", "🧑‍💻", "🚀", "🔬", "🎨", "🦁", "🐼", "🦊", "🧙‍♂️", "🦉", "🧠"];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setNameAndAvatar(tempName.trim(), tempAvatar);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const formatStudyTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const hours = Math.floor(mins / 60);
    
    if (hours > 0) {
      return `${hours} ${t("h")} ${mins % 60} ${t("m")}`;
    }
    return `${mins} ${t("m")} ${sec % 60} ${t("s")}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Profile Form Card */}
      <div id="profile-card" className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 text-base md:text-lg mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-violet-600" />
          <Translate text="Անձնական Տվյալներ" />
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">
                <Translate text="Մուտքագրեք ձեր անունը" />
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Ձեր անունը..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-violet-400 bg-gray-50/30 text-gray-700 text-sm md:text-base font-medium transition-all"
                maxLength={30}
              />
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase block">
                <Translate text="Ընտրեք ձեր կերպարը" />
              </label>
              <div className="flex flex-wrap gap-2">
                {avatars.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setTempAvatar(av)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                      tempAvatar === av
                        ? "bg-violet-600 text-white scale-110 shadow-md shadow-violet-100"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!tempName.trim()}
              className="py-2.5 px-6 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-xs md:text-sm shadow-md shadow-violet-100/50 transition-all active:scale-[0.98] flex items-center gap-1.5"
            >
              {savedMessage ? (
                <>
                  <Check className="w-4 h-4" />
                  <Translate text="Պահպանված է" />
                </>
              ) : (
                <>
                  <Translate text="Պահպանել" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Gamification Statistics Card */}
      <div id="stats-card" className="bg-white p-5 md:p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-800 text-base md:text-lg flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-600" />
          <Translate text="Իմ վիճակագրությունը" />
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center text-lg shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">
                <Translate text="Միավորներ" />
              </span>
              <span className="font-extrabold text-gray-800 text-lg md:text-xl font-mono">{points}</span>
            </div>
          </div>

          <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg shadow-inner">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">
                <Translate text="Մակարդակ" />
              </span>
              <span className="font-extrabold text-gray-800 text-lg md:text-xl font-mono">{level}</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">
                <Translate text="դասեր" />
              </span>
              <span className="font-extrabold text-gray-800 text-lg md:text-xl font-mono">{completedCount}</span>
            </div>
          </div>

          <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg shadow-inner">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">
                <Translate text="Ուսումնական ժամանակ" />
              </span>
              <span className="font-extrabold text-gray-800 text-sm md:text-base font-mono truncate block max-w-[140px]">
                {formatStudyTime(studySeconds)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Backup and Restore File-Export-Import */}
      <div id="backup-restore-container" className="space-y-3">
        <h3 className="font-bold text-gray-800 text-base md:text-lg px-1 flex items-center gap-2">
          <Translate text="Պաշտպանված Կոդ" />
        </h3>
        <FileExportImport />
      </div>

      {/* Dangerous/Safety Controls (Reset) */}
      <div id="danger-card" className="bg-rose-50/30 border border-rose-100 rounded-3xl p-5 md:p-6 space-y-4">
        <div>
          <h4 className="font-bold text-rose-800 text-base flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <Translate text="Զրոյացնել առաջընթացը" />
          </h4>
          <p className="text-xs text-rose-700/80 mt-1 max-w-xl leading-relaxed">
            <Translate text="Այս գործողությունը կզրոյացնի ձեր ամբողջ առաջընթացը և վիճակագրությունը:" />
          </p>
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <Translate text="Զրոյացնել" />
          </button>
        ) : (
          <div className="p-4 bg-white border border-rose-100 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-scale-up">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-gray-800 text-xs md:text-sm">
                  <Translate text="Իսկապե՞ս ցանկանում եք սկսել նորից:" />
                </h5>
                <p className="text-[10px] md:text-xs text-gray-500 leading-snug">
                  <Translate text="Այս քայլը անդառնալի է: Բոլոր միավորները և նվաճումները կորելու են:" />
                </p>
              </div>
            </div>

            <div className="flex gap-2 self-end md:self-auto shrink-0">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-1.5 px-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-lg text-xs"
              >
                <Translate text="Չեղարկել" />
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="py-1.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs"
              >
                <Translate text="Զրոյացնել" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
