"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/lib/data/subjects";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { 
  ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, Award, HelpCircle, ArrowRight 
} from "lucide-react";

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onStartExam: () => void;
}

export function LessonView({ lesson, onBack, onStartExam }: LessonViewProps) {
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNextPage = () => {
    if (currentPage < lesson.pages.length - 1) {
      setCurrentPage(currentPage + 1);
      stopReading();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      stopReading();
    }
  };

  const stopReading = () => {
    if (synth) {
      synth.cancel();
      setSpeaking(false);
    }
  };

  const startReading = async () => {
    if (!synth) return;
    
    if (speaking) {
      stopReading();
      return;
    }

    try {
      // Find the translated text currently rendered
      const textToRead = lesson.pages[currentPage];
      
      // Since it's translated, we should read either in Armenian or let speechSynthesis translate or read translated text.
      // We can fetch translated text dynamically for speech if target language is supported, otherwise fallback to text itself
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Try to match language code for voice
      const voices = synth.getVoices();
      const matchedVoice = voices.find(v => v.lang.startsWith(language));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      utterance.lang = language;

      utterance.onend = () => {
        setSpeaking(false);
      };
      utterance.onerror = () => {
        setSpeaking(false);
      };

      setSpeaking(true);
      synth.speak(utterance);
    } catch (e) {
      console.error(e);
      setSpeaking(false);
    }
  };

  const progressPercentage = Math.round(((currentPage + 1) / lesson.pages.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            stopReading();
            onBack();
          }}
          className="text-xs font-bold text-gray-500 hover:text-violet-600 flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <Translate text="Վերադառնալ" />
        </button>

        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-violet-500" />
          <span className="text-xs font-bold text-gray-400">
            {currentPage + 1} / {lesson.pages.length} <Translate text="Էջ" />
          </span>
        </div>
      </div>

      {/* Lesson Slide Content Card */}
      <div className="bg-white rounded-3xl border border-gray-150/80 shadow-md overflow-hidden min-h-[340px] flex flex-col justify-between p-6 md:p-8 relative">
        {/* Dynamic visual page indicator / background corner */}
        <div className="absolute right-0 top-0 bg-violet-50/50 text-violet-600 px-4 py-2 font-mono text-[10px] font-bold rounded-bl-2xl uppercase border-l border-b border-violet-100/30">
          PAGE {currentPage + 1}
        </div>

        {/* Content body */}
        <div className="space-y-6 flex-1 flex flex-col justify-center">
          <div className="space-y-3">
            <h3 className="font-extrabold text-gray-800 text-lg md:text-xl">
              <Translate text={lesson.title} />
            </h3>
            <div className="w-12 h-1 bg-violet-500 rounded-full" />
          </div>

          <div className="text-sm md:text-base text-gray-600 leading-relaxed font-sans max-w-2xl py-2">
            <Translate text={lesson.pages[currentPage]} />
          </div>
        </div>

        {/* Slide controls bottom */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          {/* TTS Assist Button */}
          <button
            onClick={startReading}
            className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all active:scale-[0.98] ${
              speaking 
                ? "bg-rose-50 border-rose-100 text-rose-600" 
                : "bg-violet-50 border-violet-100 text-violet-600 hover:bg-violet-100/60"
            }`}
          >
            {speaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <Translate text="Կանգնեցնել" />
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <Translate text="Կարդալ Ձայնով" />
              </>
            )}
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl border border-gray-200 text-gray-500 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === lesson.pages.length - 1}
              className="p-2.5 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl border border-gray-200 text-gray-500 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide ProgressBar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
          <span><Translate text="Դասի Առաջընթաց" /></span>
          <span className="font-bold">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-violet-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* CTA Box when slide complete */}
      {currentPage === lesson.pages.length - 1 && (
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl text-white shadow-lg space-y-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/20 rounded-xl text-yellow-300">
              <Award className="w-5 h-5 fill-yellow-300" />
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg">
                <Translate text="Պատրա՞ստ եք քննությանը:" />
              </h4>
              <p className="text-xs text-white/80 leading-relaxed">
                <Translate text="Ավարտեցիք դասը: Հանձնեք քննությունը ճիշտ պատասխանելով հարցերին՝ միավորներ և նոր նվաճումներ ստանալու համար:" />
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopReading();
              onStartExam();
            }}
            className="w-full py-3 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-xs md:text-sm rounded-2xl flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all"
          >
            <Translate text="Սկսել Քննությունը" />
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
