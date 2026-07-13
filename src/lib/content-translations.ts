// Առարկաների և դասերի թարգմանություններ
// Երբ լեզուն փոխվում է, ամբողջ բովանդակությունը թարգմանվում է

import { Lesson, Subject } from './types'

// Հիմնական առարկաների անունների թարգմանություն
const SUBJECT_NAMES: Record<string, Record<string, string>> = {
  math: {
    hy: 'Մաթեմատիկա', en: 'Mathematics', ru: 'Математика', es: 'Matemáticas',
    fr: 'Mathématiques', de: 'Mathematik', it: 'Matematica', pt: 'Matemática',
    zh: '数学', ja: '数学', ko: '수학', ar: 'الرياضيات', tr: 'Matematik',
    fa: 'ریاضی', hi: 'गणित', uk: 'Математика', pl: 'Matematyka', nl: 'Wiskunde',
  },
  geography: {
    hy: 'Աշխարհագրություն', en: 'Geography', ru: 'География', es: 'Geografía',
    fr: 'Géographie', de: 'Geografie', it: 'Geografia', pt: 'Geografia',
    zh: '地理', ja: '地理', ko: '지리', ar: 'جغرافيا', tr: 'Coğrafya',
    fa: 'جغرافیا', hi: 'भूगोल', uk: 'Географія', pl: 'Geografia', nl: 'Geografie',
  },
  physics: {
    hy: 'Ֆիզիկա', en: 'Physics', ru: 'Физика', es: 'Física',
    fr: 'Physique', de: 'Physik', it: 'Fisica', pt: 'Física',
    zh: '物理', ja: '物理', ko: '물리학', ar: 'الفيزياء', tr: 'Fizik',
    fa: 'فیزیک', hi: 'भौतिकी', uk: 'Фізика', pl: 'Fizyka', nl: 'Natuurkunde',
  },
  chemistry: {
    hy: 'Քիմիա', en: 'Chemistry', ru: 'Химия', es: 'Química',
    fr: 'Chimie', de: 'Chemie', it: 'Chimica', pt: 'Química',
    zh: '化学', ja: '化学', ko: '화학', ar: 'الكيمياء', tr: 'Kimya',
    fa: 'شیمی', hi: 'रसायन', uk: 'Хімія', pl: 'Chemia', nl: 'Scheikunde',
  },
  biology: {
    hy: 'Կենսաբանություն', en: 'Biology', ru: 'Биология', es: 'Biología',
    fr: 'Biologie', de: 'Biologie', it: 'Biologia', pt: 'Biologia',
    zh: '生物', ja: '生物', ko: '생물학', ar: 'الأحياء', tr: 'Biyoloji',
    fa: 'زیست‌شناسی', hi: 'जीवविज्ञान', uk: 'Біологія', pl: 'Biologia', nl: 'Biologie',
  },
  programming: {
    hy: 'Ծրագրավորում', en: 'Programming', ru: 'Программирование', es: 'Programación',
    fr: 'Programmation', de: 'Programmierung', it: 'Programmazione', pt: 'Programação',
    zh: '编程', ja: 'プログラミング', ko: '프로그래밍', ar: 'البرمجة', tr: 'Programlama',
    fa: 'برنامه‌نویسی', hi: 'प्रोग्रामिंग', uk: 'Програмування', pl: 'Programowanie', nl: 'Programmeren',
  },
  'web-design': {
    hy: 'Վեբ Դիզայն', en: 'Web Design', ru: 'Веб-дизайн', es: 'Diseño Web',
    fr: 'Design Web', de: 'Webdesign', it: 'Web Design', pt: 'Web Design',
    zh: '网页设计', ja: 'ウェブデザイン', ko: '웹 디자인', ar: 'تصميم الويب', tr: 'Web Tasarım',
    fa: 'طراحی وب', hi: 'वेब डिज़ाइन', uk: 'Веб-дизайн', pl: 'Projektowanie stron', nl: 'Webdesign',
  },
  'graphic-design': {
    hy: 'Գրաֆիկական Դիզայն', en: 'Graphic Design', ru: 'Графический дизайн', es: 'Diseño Gráfico',
    fr: 'Design Graphique', de: 'Grafikdesign', it: 'Graphic Design', pt: 'Design Gráfico',
    zh: '平面设计', ja: 'グラフィックデザイン', ko: '그래픽 디자인', ar: 'التصميم الجرافيكي', tr: 'Grafik Tasarım',
    fa: 'طراحی گرافیک', hi: 'ग्राफ़िक डिज़ाइन', uk: 'Графічний дизайн', pl: 'Projektowanie graficzne', nl: 'Grafisch ontwerp',
  },
  database: {
    hy: 'Տվյալների Բազա', en: 'Database', ru: 'База данных', es: 'Base de Datos',
    fr: 'Base de données', de: 'Datenbank', it: 'Database', pt: 'Banco de Dados',
    zh: '数据库', ja: 'データベース', ko: '데이터베이스', ar: 'قاعدة البيانات', tr: 'Veritabanı',
    fa: 'پایگاه داده', hi: 'डेटाबेस', uk: 'База даних', pl: 'Baza danych', nl: 'Database',
  },
  networks: {
    hy: 'Ցանցեր և Անվտանգություն', en: 'Networks & Security', ru: 'Сети и безопасность', es: 'Redes y Seguridad',
    fr: 'Réseaux et Sécurité', de: 'Netzwerke und Sicherheit', it: 'Reti e Sicurezza', pt: 'Redes e Segurança',
    zh: '网络与安全', ja: 'ネットワークとセキュリティ', ko: '네트워크 및 보안', ar: 'الشبكات والأمن', tr: 'Ağlar ve Güvenlik',
    fa: 'شبکه‌ها و امنیت', hi: 'नेटवर्क और सुरक्षा', uk: 'Мережі та безпека', pl: 'Sieci i bezpieczeństwo', nl: 'Netwerken en beveiliging',
  },
  ai: {
    hy: 'Արհեստական Բանականություն', en: 'Artificial Intelligence', ru: 'Искусственный интеллект', es: 'Inteligencia Artificial',
    fr: 'Intelligence Artificielle', de: 'Künstliche Intelligenz', it: 'Intelligenza Artificiale', pt: 'Inteligência Artificial',
    zh: '人工智能', ja: '人工知能', ko: '인공지능', ar: 'الذكاء الاصطناعي', tr: 'Yapay Zeka',
    fa: 'هوش مصنوعی', hi: 'कृत्रिम बुद्धिमत्ता', uk: 'Штучний інтелект', pl: 'Sztuczna inteligencja', nl: 'Kunstmatige intelligentie',
  },
  robotics: {
    hy: 'Ռոբոտատեխնիկա', en: 'Robotics', ru: 'Робототехника', es: 'Robótica',
    fr: 'Robotique', de: 'Robotik', it: 'Robotica', pt: 'Robótica',
    zh: '机器人技术', ja: 'ロボット工学', ko: '로봇 공학', ar: 'الروبوتات', tr: 'Robotik',
    fa: 'رباتیک', hi: 'रोबोटिक्स', uk: 'Робототехніка', pl: 'Robotyka', nl: 'Robotica',
  },
  astronomy: {
    hy: 'Աստղագիտություն', en: 'Astronomy', ru: 'Астрономия', es: 'Astronomía',
    fr: 'Astronomie', de: 'Astronomie', it: 'Astronomia', pt: 'Astronomia',
    zh: '天文学', ja: '天文学', ko: '천문학', ar: 'علم الفلك', tr: 'Astronomi',
    fa: 'نجوم', hi: 'खगोल विज्ञान', uk: 'Астрономія', pl: 'Astronomia', nl: 'Astronomie',
  },
  logic: {
    hy: 'Տրամաբանություն', en: 'Logic', ru: 'Логика', es: 'Lógica',
    fr: 'Logique', de: 'Logik', it: 'Logica', pt: 'Lógica',
    zh: '逻辑', ja: '論理', ko: '논리학', ar: 'المنطق', tr: 'Mantık',
    fa: 'منطق', hi: 'तर्क', uk: 'Логіка', pl: 'Logika', nl: 'Logica',
  },
  history: {
    hy: 'Պատմություն', en: 'History', ru: 'История', es: 'Historia',
    fr: 'Histoire', de: 'Geschichte', it: 'Storia', pt: 'História',
    zh: '历史', ja: '歴史', ko: '역사', ar: 'التاريخ', tr: 'Tarih',
    fa: 'تاریخ', hi: 'इतिहास', uk: 'Історія', pl: 'Historia', nl: 'Geschiedenis',
  },
  english: {
    hy: 'Անգլերեն', en: 'English', ru: 'Английский', es: 'Inglés',
    fr: 'Anglais', de: 'Englisch', it: 'Inglese', pt: 'Inglês',
    zh: '英语', ja: '英語', ko: '영어', ar: 'الإنجليزية', tr: 'İngilizce',
    fa: 'انگلیسی', hi: 'अंग्रेज़ी', uk: 'Англійська', pl: 'Angielski', nl: 'Engels',
  },
  economics: {
    hy: 'Էկոնոմիկա', en: 'Economics', ru: 'Экономика', es: 'Economía',
    fr: 'Économie', de: 'Wirtschaft', it: 'Economia', pt: 'Economia',
    zh: '经济学', ja: '経済学', ko: '경제학', ar: 'الاقتصاد', tr: 'Ekonomi',
    fa: 'اقتصاد', hi: 'अर्थशास्त्र', uk: 'Економіка', pl: 'Ekonomia', nl: 'Economie',
  },
  medicine: {
    hy: 'Բժշկություն', en: 'Medicine', ru: 'Медицина', es: 'Medicina',
    fr: 'Médecine', de: 'Medizin', it: 'Medicina', pt: 'Medicina',
    zh: '医学', ja: '医学', ko: '의학', ar: 'الطب', tr: 'Tıp',
    fa: 'پزشکی', hi: 'चिकित्सा', uk: 'Медицина', pl: 'Medycyna', nl: 'Geneeskunde',
  },
  psychology: {
    hy: 'Հոգեբանություն', en: 'Psychology', ru: 'Психология', es: 'Psicología',
    fr: 'Psychologie', de: 'Psychologie', it: 'Psicologia', pt: 'Psicologia',
    zh: '心理学', ja: '心理学', ko: '심리학', ar: 'علم النفس', tr: 'Psikoloji',
    fa: 'روان‌شناسی', hi: 'मनोविज्ञान', uk: 'Психологія', pl: 'Psychologia', nl: 'Psychologie',
  },
  philosophy: {
    hy: 'Փիլիսոփայություն', en: 'Philosophy', ru: 'Философия', es: 'Filosofía',
    fr: 'Philosophie', de: 'Philosophie', it: 'Filosofia', pt: 'Filosofia',
    zh: '哲学', ja: '哲学', ko: '철학', ar: 'الفلسفة', tr: 'Felsefe',
    fa: 'فلسفه', hi: 'दर्शन', uk: 'Філософія', pl: 'Filozofia', nl: 'Filosofie',
  },
}

// Առարկայի նկարագրությունների թարգմանություն
const SUBJECT_DESCRIPTIONS: Record<string, Record<string, string>> = {
  math: {
    hy: 'Թվեր, գործողություններ, երկրաչափություն և ավելին',
    en: 'Numbers, operations, geometry and more',
    ru: 'Числа, операции, геометрия и многое другое',
    es: 'Números, operaciones, geometría y más',
    fr: 'Nombres, opérations, géométrie et plus',
    de: 'Zahlen, Operationen, Geometrie und mehr',
  },
  geography: {
    hy: 'Մոլորակ, մայրցամաքներ, երկրներ, բնություն',
    en: 'Planet, continents, countries, nature',
    ru: 'Планета, материки, страны, природа',
    es: 'Planeta, continentes, países, naturaleza',
    fr: 'Planète, continents, pays, nature',
    de: 'Planet, Kontinente, Länder, Natur',
  },
  physics: {
    hy: 'Շարժում, ուժ, էներգիա, լույս և ձայն',
    en: 'Motion, force, energy, light and sound',
    ru: 'Движение, сила, энергия, свет и звук',
    es: 'Movimiento, fuerza, energía, luz y sonido',
    fr: 'Mouvement, force, énergie, lumière et son',
    de: 'Bewegung, Kraft, Energie, Licht und Schall',
  },
  programming: {
    hy: 'Կոդի աշխարհ՝ Python, JavaScript, ալգորիթմներ',
    en: 'World of code: Python, JavaScript, algorithms',
    ru: 'Мир кода: Python, JavaScript, алгоритмы',
    es: 'Mundo del código: Python, JavaScript, algoritmos',
    fr: 'Monde du code: Python, JavaScript, algorithmes',
    de: 'Welt des Codes: Python, JavaScript, Algorithmen',
  },
}

// Դասերի ընդհանուր բառերի թարգմանություն
const LESSON_TERMS: Record<string, Record<string, string>> = {
  'lesson': {
    hy: 'Դաս', en: 'Lesson', ru: 'Урок', es: 'Lección', fr: 'Leçon', de: 'Lektion',
    it: 'Lezione', pt: 'Lição', zh: '课程', ja: 'レッスン', ko: '수업', ar: 'درس',
    tr: 'Ders', fa: 'درس', hi: 'पाठ', uk: 'Урок', pl: 'Lekcja', nl: 'Les',
  },
  'exam': {
    hy: 'Քննություն', en: 'Exam', ru: 'Экзамен', es: 'Examen', fr: 'Examen', de: 'Prüfung',
    it: 'Esame', pt: 'Exame', zh: '考试', ja: '試験', ko: '시험', ar: 'امتحان',
    tr: 'Sınav', fa: 'امتحان', hi: 'परीक्षा', uk: 'Іспит', pl: 'Egzamin', nl: 'Examen',
  },
  'question': {
    hy: 'Հարց', en: 'Question', ru: 'Вопрос', es: 'Pregunta', fr: 'Question', de: 'Frage',
    it: 'Domanda', pt: 'Pergunta', zh: '问题', ja: '質問', ko: '질문', ar: 'سؤال',
    tr: 'Soru', fa: 'سؤال', hi: 'प्रश्न', uk: 'Питання', pl: 'Pytanie', nl: 'Vraag',
  },
  'completed': {
    hy: 'Ավարտված', en: 'Completed', ru: 'Завершено', es: 'Completado', fr: 'Terminé', de: 'Abgeschlossen',
    it: 'Completato', pt: 'Concluído', zh: '已完成', ja: '完了', ko: '완료', ar: 'مكتمل',
    tr: 'Tamamlandı', fa: 'تکمیل شده', hi: 'पूर्ण', uk: 'Завершено', pl: 'Ukończone', nl: 'Voltooid',
  },
  'hint': {
    hy: 'Հուշում', en: 'Hint', ru: 'Подсказка', es: 'Pista', fr: 'Indice', de: 'Hinweis',
    it: 'Suggerimento', pt: 'Dica', zh: '提示', ja: 'ヒント', ko: '힌트', ar: 'تلميح',
    tr: 'İpucu', fa: 'راهنمایی', hi: 'संकेत', uk: 'Підказка', pl: 'Wskazówka', nl: 'Hint',
  },
  'explanation': {
    hy: 'Բացատրություն', en: 'Explanation', ru: 'Объяснение', es: 'Explicación', fr: 'Explication', de: 'Erklärung',
    it: 'Spiegazione', pt: 'Explicação', zh: '解释', ja: '説明', ko: '설명', ar: 'شرح',
    tr: 'Açıklama', fa: 'توضیح', hi: 'व्याख्या', uk: 'Пояснення', pl: 'Wyjaśnienie', nl: 'Uitleg',
  },
  'next': {
    hy: 'Հաջորդ', en: 'Next', ru: 'Далее', es: 'Siguiente', fr: 'Suivant', de: 'Weiter',
    it: 'Avanti', pt: 'Próximo', zh: '下一个', ja: '次へ', ko: '다음', ar: 'التالي',
    tr: 'İleri', fa: 'بعدی', hi: 'अगला', uk: 'Далі', pl: 'Dalej', nl: 'Volgende',
  },
  'previous': {
    hy: 'Նախորդ', en: 'Previous', ru: 'Назад', es: 'Anterior', fr: 'Précédent', de: 'Zurück',
    it: 'Precedente', pt: 'Anterior', zh: '上一个', ja: '前へ', ko: '이전', ar: 'السابق',
    tr: 'Geri', fa: 'قبلی', hi: 'पिछला', uk: 'Назад', pl: 'Wstecz', nl: 'Vorige',
  },
  'check': {
    hy: 'Ստուգել', en: 'Check', ru: 'Проверить', es: 'Comprobar', fr: 'Vérifier', de: 'Prüfen',
    it: 'Controlla', pt: 'Verificar', zh: '检查', ja: '確認', ko: '확인', ar: 'تحقق',
    tr: 'Kontrol et', fa: 'بررسی', hi: 'जांचें', uk: 'Перевірити', pl: 'Sprawdź', nl: 'Controleren',
  },
  'exit': {
    hy: 'Ելք', en: 'Exit', ru: 'Выход', es: 'Salir', fr: 'Sortir', de: 'Beenden',
    it: 'Esci', pt: 'Sair', zh: '退出', ja: '終了', ko: '나가기', ar: 'خروج',
    tr: 'Çıkış', fa: 'خروج', hi: 'बाहर', uk: 'Вихід', pl: 'Wyjście', nl: 'Afsluiten',
  },
  'listen': {
    hy: 'Լսել', en: 'Listen', ru: 'Слушать', es: 'Escuchar', fr: 'Écouter', de: 'Hören',
    it: 'Ascolta', pt: 'Ouvir', zh: '听', ja: '聞く', ko: '듣기', ar: 'استمع',
    tr: 'Dinle', fa: 'گوش دادن', hi: 'सुनें', uk: 'Слухати', pl: 'Słuchaj', nl: 'Luister',
  },
  'stop': {
    hy: 'Դադար', en: 'Stop', ru: 'Стоп', es: 'Detener', fr: 'Arrêter', de: 'Stopp',
    it: 'Ferma', pt: 'Parar', zh: '停止', ja: '停止', ko: '정지', ar: 'إيقاف',
    tr: 'Durdur', fa: 'توقف', hi: 'रुकें', uk: 'Стоп', pl: 'Zatrzymaj', nl: 'Stop',
  },
  'start_exam': {
    hy: 'Սկսել քննությունը', en: 'Start Exam', ru: 'Начать экзамен', es: 'Comenzar Examen', fr: 'Commencer l\'Examen', de: 'Prüfung starten',
    it: 'Inizia Esame', pt: 'Iniciar Exame', zh: '开始考试', ja: '試験開始', ko: '시험 시작', ar: 'ابدأ الامتحان',
    tr: 'Sınavı Başlat', fa: 'شروع امتحان', hi: 'परीक्षा शुरू करें', uk: 'Почати іспит', pl: 'Rozpocznij egzamin', nl: 'Examen starten',
  },
  'congrats': {
    hy: 'Շնորհավոր', en: 'Congratulations', ru: 'Поздравляем', es: '¡Felicidades!', fr: 'Félicitations', de: 'Glückwunsch',
    it: 'Congratulazioni', pt: 'Parabéns', zh: '恭喜', ja: 'おめでとう', ko: '축하합니다', ar: 'تهانينا',
    tr: 'Tebrikler', fa: 'تبریک', hi: 'बधाई', uk: 'Вітаємо', pl: 'Gratulacje', nl: 'Gefeliciteerd',
  },
  'retry': {
    hy: 'Կրկին փորձիր', en: 'Try again', ru: 'Попробуйте снова', es: 'Intenta de nuevo', fr: 'Réessayer', de: 'Erneut versuchen',
    it: 'Riprova', pt: 'Tente novamente', zh: '再试一次', ja: 'もう一度', ko: '다시 시도', ar: 'حاول مرة أخرى',
    tr: 'Tekrar dene', fa: 'دوباره امتحان کنید', hi: 'पुनः प्रयास करें', uk: 'Спробуйте знову', pl: 'Spróbuj ponownie', nl: 'Opnieuw proberen',
  },
  'intro': {
    hy: 'Ներածություն', en: 'Introduction', ru: 'Введение', es: 'Introducción', fr: 'Introduction', de: 'Einführung',
    it: 'Introduzione', pt: 'Introdução', zh: '介绍', ja: 'はじめに', ko: '소개', ar: 'مقدمة',
    tr: 'Giriş', fa: 'مقدمه', hi: 'परिचय', uk: 'Вступ', pl: 'Wstęp', nl: 'Inleiding',
  },
  'summary': {
    hy: 'Ամփոփում', en: 'Summary', ru: 'Резюме', es: 'Resumen', fr: 'Résumé', de: 'Zusammenfassung',
    it: 'Riepilogo', pt: 'Resumo', zh: '总结', ja: 'まとめ', ko: '요약', ar: 'ملخص',
    tr: 'Özet', fa: 'خلاصه', hi: 'सारांश', uk: 'Підсумок', pl: 'Podsumowanie', nl: 'Samenvatting',
  },
  'fun_fact': {
    hy: 'Հետաքրքիր փաստ', en: 'Fun Fact', ru: 'Интересный факт', es: 'Dato Curioso', fr: 'Fait Amusant', de: 'Interessanter Fakt',
    it: 'Fatto Curioso', pt: 'Fato Curioso', zh: '趣味事实', ja: '面白い事実', ko: '재미있는 사실', ar: 'حقيقة ممتعة',
    tr: 'İlginç Bilgi', fa: 'حقیقت جالب', hi: 'रोचक तथ्य', uk: 'Цікавий факт', pl: 'Ciekawostka', nl: 'Leuk feit',
  },
  'key_points': {
    hy: 'Հիմնական կետեր', en: 'Key Points', ru: 'Ключевые моменты', es: 'Puntos Clave', fr: 'Points Clés', de: 'Hauptpunkte',
    it: 'Punti Chiave', pt: 'Pontos-Chave', zh: '要点', ja: '要点', ko: '핵심 포인트', ar: 'النقاط الرئيسية',
    tr: 'Ana Noktalar', fa: 'نکات کلیدی', hi: 'मुख्य बिंदु', uk: 'Ключові моменти', pl: 'Kluczowe punkty', nl: 'Kernpunten',
  },
}

// Թարգմանել առարկայի անունը
export function translateSubjectName(subjectId: string, lang: string): string {
  const translations = SUBJECT_NAMES[subjectId]
  if (translations && translations[lang]) {
    return translations[lang]
  }
  // Ֆոլբեք - վերադարձնել առարկայի ID-ն
  return subjectId
}

// Թարգմանել առարկայի նկարագրությունը
export function translateSubjectDescription(subjectId: string, lang: string): string {
  const translations = SUBJECT_DESCRIPTIONS[subjectId]
  if (translations && translations[lang]) {
    return translations[lang]
  }
  return ''
}

// Թարգմանել դասի տերմինը
export function translateLessonTerm(term: string, lang: string): string {
  const translations = LESSON_TERMS[term]
  if (translations && translations[lang]) {
    return translations[lang]
  }
  return term
}

// Թարգմանել ամբողջ առարկան
export function translateSubject(subject: Subject, lang: string): Subject {
  return {
    ...subject,
    name: translateSubjectName(subject.id, lang) || subject.name,
    description: translateSubjectDescription(subject.id, lang) || subject.description,
  }
}

// Թարգմանել դասի վերնագիրը (հիմնականում առարկայի ID + դասի համար)
export function translateLessonTitle(lesson: Lesson, lang: string): string {
  // Դասերի վերնագրերը հիմնականում հայերեն են, բայց կարող ենք ավելացնել թարգմանություններ
  // Առայժմ վերադարձնում ենք բնօրինակը
  return lesson.title
}
