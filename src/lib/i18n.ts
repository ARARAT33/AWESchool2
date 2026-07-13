import { create } from "zustand";

// Core static UI translations for key languages to provide instant responsiveness
export const UI_DICTIONARY: Record<string, Record<string, string>> = {
  hy: {
    "welcome": "Բարի գալուստ",
    "choose_action": "Ընտրեք առարկան, սովորեք դասերը և հանձնեք քննություններ",
    "completed": "ավարտված",
    "lessons": "դասեր",
    "achievements": "Նվաճումներ",
    "daily_goal": "Օրվա նպատակ",
    "goal_left": "դաս մնաց այսօրվա նպատակին հասնելու համար",
    "search_lessons": "Որոնել դասեր...",
    "school_mode": "Դպրոցական ռեժիմ",
    "university_mode": "Համալսարանական ռեժիմ",
    "all_lessons": "Բոլոր դասերը",
    "pass_threshold": "Անցողիկ շեմ",
    "congrats": "Շնորհավորում ենք:",
    "correct": "Ճիշտ է:",
    "wrong": "Սխալ պատասխան, նորից փորձիր:",
    "show_hint": "Ցույց տալ հուշումը",
    "hint": "Հուշում",
    "next_lesson": "Հաջորդ դասը",
    "back": "Հետ",
    "points": "Միավորներ",
    "streak": "Շարք",
    "start_over": "Սկսել նորից",
    "all_rights": "Բոլոր իրավունքները պաշտպանված են",
    "motto": "Սովորիր, խաղա, զարգացիր",
    "export": "Արտահանել",
    "import": "Ներմուծել",
    "stats": "Իմ վիճակագրությունը",
    "study_time": "Ուսումնական ժամանակ",
    "favorites": "Նախընտրելիներ",
    "bookmarks": "Էջանշաններ",
    "level": "Մակարդակ",
    "code": "Կոդ",
    "copy_link": "Պատճենել հղումը",
    "reset_progress": "Զրոյացնել առաջընթացը",
    "reset_confirm": "Իսկապե՞ս ցանկանում եք սկսել նորից:",
    "reset_desc": "Այս գործողությունը կզրոյացնի ձեր ամբողջ առաջընթացը և վիճակագրությունը:",
    "cancel": "Չեղարկել",
    "reset": "Զրոյացնել",
    "start": "Սկսել",
    "exam": "Քննություն",
    "pass": "Անցել է",
    "fail": "Չի անցել",
    "explanation": "Բացատրություն",
    "submit": "Ուղարկել",
    "enter_name": "Մուտքագրեք ձեր անունը",
    "choose_avatar": "Ընտրեք ձեր կերպարը",
    "chapters": "Գլուխներ",
    "pages": "Էջեր",
    "book": "Գիրք",
    "test_ready": "Պատրա՞ստ եք քննությանը",
    "start_test": "Սկսել քննությունը",
    "exam_not_unlocked": "Այս քննությունը դեռ բացված չէ: Ավարտեք դասը նախ:",
    "import_success": "Տվյալները հաջողությամբ ներմուծվեցին:",
    "import_error": "Տվյալները կեղծված են կամ սխալ:",
    "secured": "Պաշտպանված տվյալներ",
    "guides": "Ուղեցույց",
  },
  en: {
    "welcome": "Welcome",
    "choose_action": "Choose a subject, learn lessons, and pass exams",
    "completed": "completed",
    "lessons": "lessons",
    "achievements": "Achievements",
    "daily_goal": "Daily Goal",
    "goal_left": "lessons left to reach today's goal",
    "search_lessons": "Search lessons...",
    "school_mode": "School Mode",
    "university_mode": "University Mode",
    "all_lessons": "All Lessons",
    "pass_threshold": "Pass Threshold",
    "congrats": "Congratulations!",
    "correct": "Correct!",
    "wrong": "Wrong answer, try again!",
    "show_hint": "Show Hint",
    "hint": "Hint",
    "next_lesson": "Next Lesson",
    "back": "Back",
    "points": "Points",
    "streak": "Streak",
    "start_over": "Start Over",
    "all_rights": "All rights reserved",
    "motto": "Learn, play, grow",
    "export": "Export",
    "import": "Import",
    "stats": "My Statistics",
    "study_time": "Study Time",
    "favorites": "Favorites",
    "bookmarks": "Bookmarks",
    "level": "Level",
    "code": "Code",
    "copy_link": "Copy Link",
    "reset_progress": "Reset Progress",
    "reset_confirm": "Are you sure you want to start over?",
    "reset_desc": "This will reset all your progress and statistics!",
    "cancel": "Cancel",
    "reset": "Reset",
    "start": "Start",
    "exam": "Exam",
    "pass": "Passed",
    "fail": "Failed",
    "explanation": "Explanation",
    "submit": "Submit",
    "enter_name": "Enter your name",
    "choose_avatar": "Choose your avatar",
    "chapters": "Chapters",
    "pages": "Pages",
    "book": "Book",
    "test_ready": "Are you ready for the exam?",
    "start_test": "Start Exam",
    "exam_not_unlocked": "This exam is locked! Please study the lesson first.",
    "import_success": "Data imported successfully!",
    "import_error": "Invalid or tampered data signature!",
    "secured": "Secured Data",
    "guides": "Guides",
  },
  ru: {
    "welcome": "Добро пожаловать",
    "choose_action": "Выберите предмет, изучайте уроки и сдавайте экзамены",
    "completed": "завершено",
    "lessons": "уроков",
    "achievements": "Достижения",
    "daily_goal": "Дневная цель",
    "goal_left": "урока осталось до цели",
    "search_lessons": "Поиск уроков...",
    "school_mode": "Школьный режим",
    "university_mode": "Университетский режим",
    "all_lessons": "Все уроки",
    "pass_threshold": "Проходной балл",
    "congrats": "Поздравляем!",
    "correct": "Правильно!",
    "wrong": "Неверно, попробуйте еще раз!",
    "show_hint": "Показать подсказку",
    "hint": "Подсказка",
    "next_lesson": "Следующий урок",
    "back": "Назад",
    "points": "Баллы",
    "streak": "Серия",
    "start_over": "Начать заново",
    "all_rights": "Все права защищены",
    "motto": "Учись, играй, расти",
    "export": "Экспорт",
    "import": "Импорт",
    "stats": "Моя статистика",
    "study_time": "Время обучения",
    "favorites": "Избранное",
    "bookmarks": "Закладки",
    "level": "Уровень",
    "code": "Код",
    "copy_link": "Копировать ссылку",
    "reset_progress": "Сбросить прогресс",
    "reset_confirm": "Вы уверены, что хотите начать сначала?",
    "reset_desc": "Это сбросит весь ваш прогресс и статистику!",
    "cancel": "Отмена",
    "reset": "Сброс",
    "start": "Начать",
    "exam": "Экзамен",
    "pass": "Сдано",
    "fail": "Не сдано",
    "explanation": "Объяснение",
    "submit": "Отправить",
    "enter_name": "Введите ваше имя",
    "choose_avatar": "Выберите персонажа",
    "chapters": "Главы",
    "pages": "Страницы",
    "book": "Книга",
    "test_ready": "Вы готовы к экзамену?",
    "start_test": "Начать экзамен",
    "exam_not_unlocked": "Этот экзамен заблокирован. Сначала изучите урок.",
    "import_success": "Данные успешно импортированы!",
    "import_error": "Недействительная цифровая подпись!",
    "secured": "Защищенные данные",
    "guides": "Руководство",
  }
};

// Global Translation Memory Cache
let translationCache: Record<string, string> = {};

// Load cache on initial render safely
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("aweschool_translations_v2");
    if (saved) {
      translationCache = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load translation cache", e);
  }
}

// Function to save cache to localStorage
function saveCache() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("aweschool_translations_v2", JSON.stringify(translationCache));
    } catch (e) {
      // Handle quota exceeded gracefully
    }
  }
}

/**
 * Dynamic translator calling the Google Translate API.
 * Uses localStorage to save and load previous translation results instantly.
 */
export async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text || !targetLang || targetLang === "hy") {
    return text;
  }

  const cacheKey = `${targetLang}:${text}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Translation request failed");
    }
    const data = await response.json();
    if (data && data[0]) {
      const translated = data[0].map((x: any) => x[0]).join("");
      if (translated) {
        translationCache[cacheKey] = translated;
        saveCache();
        return translated;
      }
    }
  } catch (error) {
    console.error("Translation API error:", error);
  }

  return text; // fallback to original text if offline/error
}

interface I18nState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  language: typeof window !== "undefined" ? localStorage.getItem("aweschool_lang") || "hy" : "hy",
  setLanguage: (lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aweschool_lang", lang);
    }
    set({ language: lang });
  },
}));
