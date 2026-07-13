import { create } from "zustand";

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export interface ProgressState {
  userName: string;
  userAvatar: string;
  points: number;
  level: number;
  completedCount: number;
  completedLessons: string[]; // lessonIds
  lessonScores: Record<string, number>; // lessonId -> score
  studySeconds: number;
  dailyGoal: number; // number of lessons to complete per day
  streak: number;
  lastStudyDate: string | null; // YYYY-MM-DD
  favorites: string[]; // subjectIds
  bookmarks: string[]; // lessonIds
  achievements: Achievement[];
  
  // Actions
  setNameAndAvatar: (name: string, avatar: string) => void;
  completeLesson: (lessonId: string, score: number) => void;
  toggleFavorite: (subjectId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  addStudySeconds: (seconds: number) => void;
  resetProgress: () => void;
  importProgress: (jsonData: string) => { success: boolean; error?: string };
  exportProgress: () => string;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "first", title: "Առաջին Քայլ", desc: "Ավարտիր քո առաջին դասը", icon: "🚀", unlocked: false },
  { id: "perfect", title: "Կատարյալ Գնահատական", desc: "Հանձնիր քննությունը 100% ճիշտ պատասխաններով", icon: "💯", unlocked: false },
  { id: "seeker", title: "Գիտելիքի Որոնող", desc: "Ավարտիր 5 դաս", icon: "📚", unlocked: false },
  { id: "expert", title: "Փորձագետ", desc: "Հասիր 1000 միավորի", icon: "🧠", unlocked: false },
  { id: "streak3", title: "Անկոտրում Կամք", desc: "Պահպանիր 3 օրվա ուսումնական շարք", icon: "🔥", unlocked: false }
];

const SECURITY_SALT = "AWESchool_Secure_Integrity_Salt_2026_Key#99";

/**
 * Simple hash function to generate a secure integrity signature for exported data.
 */
function calculateSignature(data: any): string {
  const content = JSON.stringify({
    userName: data.userName,
    points: data.points,
    level: data.level,
    completedLessons: data.completedLessons,
    lessonScores: data.lessonScores,
    studySeconds: data.studySeconds,
    streak: data.streak
  });
  
  let hash = 0;
  const saltedContent = content + SECURITY_SALT;
  for (let i = 0; i < saltedContent.length; i++) {
    const char = saltedContent.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return btoa(hash.toString());
}

export const useProgressStore = create<ProgressState>((set, get) => {
  // Load initial state safely on client side
  const loadInitial = () => {
    if (typeof window === "undefined") return null;
    try {
      const data = localStorage.getItem("aweschool_progress_v2");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  };

  const initial = loadInitial();

  return {
    userName: initial?.userName || "",
    userAvatar: initial?.userAvatar || "👨‍🎓",
    points: initial?.points || 0,
    level: initial?.level || 1,
    completedCount: initial?.completedCount || 0,
    completedLessons: initial?.completedLessons || [],
    lessonScores: initial?.lessonScores || {},
    studySeconds: initial?.studySeconds || 0,
    dailyGoal: initial?.dailyGoal || 3,
    streak: initial?.streak || 0,
    lastStudyDate: initial?.lastStudyDate || null,
    favorites: initial?.favorites || [],
    bookmarks: initial?.bookmarks || [],
    achievements: initial?.achievements || DEFAULT_ACHIEVEMENTS,

    setNameAndAvatar: (name, avatar) => {
      set({ userName: name, userAvatar: avatar });
      get().addStudySeconds(0); // trigger save
    },

    completeLesson: (lessonId, score) => {
      set((state) => {
        const alreadyCompleted = state.completedLessons.includes(lessonId);
        const newCompleted = alreadyCompleted
          ? state.completedLessons
          : [...state.completedLessons, lessonId];

        // Calculate points
        const previousScore = state.lessonScores[lessonId] || 0;
        const scoreDifference = Math.max(0, score - previousScore);
        const addedPoints = scoreDifference * 5 + (alreadyCompleted ? 0 : 50); // 50 pts for first complete, plus score bonus
        const newPoints = state.points + addedPoints;

        // Calculate level
        const newLevel = Math.max(1, Math.floor(newPoints / 250) + 1);

        // Update lesson scores
        const newScores = {
          ...state.lessonScores,
          [lessonId]: Math.max(state.lessonScores[lessonId] || 0, score)
        };

        // Check and unlock Achievements
        const newAchievements = state.achievements.map((ach) => {
          if (ach.id === "first" && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          if (ach.id === "perfect" && score === 100 && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          if (ach.id === "seeker" && newCompleted.length >= 5 && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          if (ach.id === "expert" && newPoints >= 1000 && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          return ach;
        });

        // Track streaks
        const today = new Date().toISOString().split("T")[0];
        let newStreak = state.streak;
        if (state.lastStudyDate !== today) {
          if (state.lastStudyDate) {
            const lastDate = new Date(state.lastStudyDate);
            const diffDays = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            if (diffDays === 1) {
              newStreak += 1;
            } else if (diffDays > 1) {
              newStreak = 1; // reset streak if a day is missed
            }
          } else {
            newStreak = 1;
          }
        }

        const updatedStreakAchievements = newAchievements.map((ach) => {
          if (ach.id === "streak3" && newStreak >= 3 && !ach.unlocked) {
            return { ...ach, unlocked: true };
          }
          return ach;
        });

        const nextState = {
          completedLessons: newCompleted,
          completedCount: newCompleted.length,
          points: newPoints,
          level: newLevel,
          lessonScores: newScores,
          achievements: updatedStreakAchievements,
          streak: newStreak,
          lastStudyDate: today
        };

        // Save progress safely
        if (typeof window !== "undefined") {
          localStorage.setItem("aweschool_progress_v2", JSON.stringify({ ...state, ...nextState }));
        }

        return nextState;
      });
    },

    toggleFavorite: (subjectId) => {
      set((state) => {
        const isFav = state.favorites.includes(subjectId);
        const nextFavs = isFav
          ? state.favorites.filter((id) => id !== subjectId)
          : [...state.favorites, subjectId];

        const nextState = { favorites: nextFavs };
        if (typeof window !== "undefined") {
          localStorage.setItem("aweschool_progress_v2", JSON.stringify({ ...state, ...nextState }));
        }
        return nextState;
      });
    },

    toggleBookmark: (lessonId) => {
      set((state) => {
        const isBookmarked = state.bookmarks.includes(lessonId);
        const nextBookmarks = isBookmarked
          ? state.bookmarks.filter((id) => id !== lessonId)
          : [...state.bookmarks, lessonId];

        const nextState = { bookmarks: nextBookmarks };
        if (typeof window !== "undefined") {
          localStorage.setItem("aweschool_progress_v2", JSON.stringify({ ...state, ...nextState }));
        }
        return nextState;
      });
    },

    addStudySeconds: (seconds) => {
      set((state) => {
        const nextSeconds = state.studySeconds + seconds;
        const nextState = { studySeconds: nextSeconds };
        if (typeof window !== "undefined") {
          localStorage.setItem("aweschool_progress_v2", JSON.stringify({ ...state, ...nextState }));
        }
        return nextState;
      });
    },

    resetProgress: () => {
      const empty = {
        userName: "",
        userAvatar: "👨‍🎓",
        points: 0,
        level: 1,
        completedCount: 0,
        completedLessons: [],
        lessonScores: {},
        studySeconds: 0,
        dailyGoal: 3,
        streak: 0,
        lastStudyDate: null,
        favorites: [],
        bookmarks: [],
        achievements: DEFAULT_ACHIEVEMENTS
      };
      if (typeof window !== "undefined") {
        localStorage.removeItem("aweschool_progress_v2");
      }
      set(empty);
    },

    exportProgress: () => {
      const state = get();
      const exportData = {
        userName: state.userName,
        userAvatar: state.userAvatar,
        points: state.points,
        level: state.level,
        completedLessons: state.completedLessons,
        lessonScores: state.lessonScores,
        studySeconds: state.studySeconds,
        dailyGoal: state.dailyGoal,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        favorites: state.favorites,
        bookmarks: state.bookmarks,
        achievements: state.achievements,
        signature: ""
      };
      
      exportData.signature = calculateSignature(exportData);
      return btoa(unescape(encodeURIComponent(JSON.stringify(exportData))));
    },

    importProgress: (b64Data) => {
      try {
        const decoded = decodeURIComponent(escape(atob(b64Data)));
        const parsed = JSON.parse(decoded);
        
        if (!parsed.signature) {
          return { success: false, error: "Missing integrity signature" };
        }
        
        const originalSignature = parsed.signature;
        const checkData = { ...parsed, signature: "" };
        const computed = calculateSignature(checkData);
        
        if (computed !== originalSignature) {
          return { success: false, error: "Signature verification failed! Data has been tampered with or is corrupted." };
        }
        
        // Save imported state
        if (typeof window !== "undefined") {
          localStorage.setItem("aweschool_progress_v2", JSON.stringify(parsed));
        }
        
        set(parsed);
        return { success: true };
      } catch (e) {
        return { success: false, error: "Could not parse or decode backup string." };
      }
    }
  };
});
