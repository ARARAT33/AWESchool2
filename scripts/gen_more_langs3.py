#!/usr/bin/env python3
"""Generate remaining hand-curated translation files for languages imported in index.ts."""
from pathlib import Path

OUT_DIR = Path("/home/z/my-project/src/lib/i18n/translations")

KEYS = [
    "app.title","app.subtitle","welcome.title","welcome.name_placeholder","welcome.start",
    "welcome.new_user","welcome.restore","welcome.desc","welcome.restore_file","welcome.choose_avatar",
    "home.greeting","home.subtitle","subjects.core","subjects.science","subjects.language",
    "subjects.computer","subjects.advanced","lesson.listen","lesson.stop","lesson.next",
    "lesson.prev","lesson.start_exam","lesson.lessons","lesson.completed","lesson.hint",
    "lesson.explanation","exam.question","exam.check","exam.exit","exam.congrats",
    "exam.retry","exam.passed","exam.need_60","stats.lessons","stats.streak",
    "stats.points","stats.title","stats.achievements","stats.study_time","stats.favorites",
    "stats.bookmarks","settings.title","settings.theme","settings.theme_light","settings.theme_dark",
    "settings.theme_auto","settings.font_size","settings.font_small","settings.font_medium","settings.font_large",
    "settings.daily_goal","settings.language","settings.learning_mode","settings.tip","mode.school",
    "mode.university","mode.school_desc","mode.university_desc","guides.title","guides.how_to_use",
    "guides.start","guides.start_desc","guides.modes","guides.modes_desc","guides.listen",
    "guides.listen_desc","guides.share","guides.share_desc","guides.export","guides.export_desc",
    "guides.languages","guides.languages_desc","guides.achievements","guides.achievements_desc","guides.all_guides",
    "guides.main","guides.live_demo","guides.step","export","import",
    "profile.title","profile.share","search.placeholder","filter.all","filter.completed",
    "filter.available","filter.locked","filter.favorites","daily_goal","recently_viewed",
    "continue_learning","reset","share_data","back_to_subjects","my_achievements",
    "confirm_reset","daily_goal_done","daily_goal_remaining","university.book_title","university.chapter",
    "university.page","university.test","university.pass_threshold","university.next_chapter","footer.copyright",
    "footer.tagline","share.summary","share.completed_lessons","share.streak","share.points",
    "share.achievements","share.total_lessons","share.study_time","share.creating","share.copied",
    "share.button","tts.working","tts.engine","tts.test_voice","tts.select_voice",
    "tts.speed","tts.pitch","tts.volume","tts.info","file.export_title",
    "file.export_desc","file.import_desc","file.protected","file.warning","file.exported",
    "file.imported","file.invalid","file.read_error","lang.changed","lang.select",
    "lang.search","lang.no_results",
]
assert len(KEYS) == 137

TRANSLATIONS = {}

# Urdu
TRANSLATIONS["ur"] = [
    "علم کی دنیا","AWESchool - تعلیمی کھیل","خوش آمدید","اپنا نام درج کریں","سیکیھنا شروع کریں",
    "نیا رجسٹریشن","میرے پاس پہلے سے اکاؤنٹ ہے — بحال کریں","انٹرایکٹو تعلیمی پلیٹ فارم: 200+ مضامین، 10,000+ اسباق، آواز سے پڑھنا، امتحانات۔","JSON فائل سے بحال کریں","اپنا کردار منتخب کریں",
    "خوش آمدید","ایک موضوع منتخب کریں، اسباق سیکھیں، امتحانات پاس کریں","بنیادی مضامین","سائنسز","انسانیت",
    "کمپیوٹر پیشے","جدید ٹیکنالوجی","سنیں","روکیں","اگلا",
    "پچھلا","امتحان شروع کریں","اسباق","مکمل","اشارہ حاصل کریں",
    "وضاحت","سوال","چیک کریں","باہر","مبارک ہو",
    "دوبارہ کوشش کریں","آپ امتحان میں کامیاب ہو گئے","اگلے سبق کے لیے 60%+ درکار","مکمل اسباق","مسلسل دن",
    "پوائنٹس","میری شماریات","کامیابیاں","سیکھا","پسندیدہ",
    "بک مارکس","ترتیبات","تھیم","روشن","تاریک",
    "آٹو","فونٹ سائز","چھوٹا","درمیانہ","بڑا",
    "روزانہ کا ہدف","زبان","ڈیفالٹ سیکھنے کا موڈ","تاریک تھیم رات کے مطالعے کے لیے بہتر ہے۔ بصارت کے لیے بڑا فونٹ۔","اسکول",
    "یونیورسٹی","آسان اسباق، رنگین اور انٹرایکٹو","تفصیلی کتاب، 100+ صفحات، ٹیسٹوں کے ساتھ","گائیڈز","سائٹ کا استعمال کیسے کریں",
    "کیسے شروع کریں","سائٹ پر پہلے قدم","اسکول اور یونیورسٹی","دو سیکھنے کے موڈ","اسباق سنیں",
    "آواز سے پڑھنا","شماریات شیئر کریں","اپنی پیش رفت دوستوں کو بھیجیں","برآمد / درآمد","فائل پر مبنی ڈیٹا بیک اپ",
    "200+ زبانیں","سائٹ کی زبان تبدیل کریں","کامیابیاں","دوسرے شرکاء کے ساتھ مقابلہ کریں","تمام گائیڈز",
    "ہوم","لائیو ڈیمو","قدم","برآمد","درآمد",
    "میری پروفائل","پروفائل شیئر کریں","اسباق تلاش کریں...","تمام","مکمل",
    "دستیاب","بند","پسندیدہ","روزانہ کا ہدف","حالیہ دیکھا گیا",
    "سیکھنا جاری رکھیں","دوبارہ شروع کریں","ڈیٹا شیئر کریں","مضامین","میری کامیابیاں",
    "کیا آپ یقین رکھتے ہیں کہ تمام پیش رفت حذف کرنا چاہتے ہیں؟","🎉 مبارک ہو! آج کا ہدف مکمل ہوا!","آج کے ہدف تک {n} اسباق باقی ہیں","کتاب","باب",
    "صفحہ","ٹیسٹ","کامیابی کی حد: 51%","اگلا باب","© AWESchool جملہ حقوق محفوظ ہیں",
    "سیکھیں، کھیلیں، بڑھیں","شماریات","مکمل اسباق","مسلسل دن","پوائنٹس",
    "کامیابیاں","کل اسباق","مطالعہ کا وقت","اسکرین شاٹ بن رہی ہے...","شماریات کاپی ہوگئی!",
    "شماریات شیئر کریں","آواز Google TTS کے ذریعے کام کرتی ہے","موجودہ انجن","آواز ٹیسٹ کریں","آواز منتخب کریں",
    "رفتار","پچ","والیم","متن Google TTS کے ذریعے پڑھا جاتا ہے (مفت)","ڈیٹا برآمد / درآمد",
    "اپنا تمام ڈیٹا دستخط شدہ JSON فائل کے طور پر ڈاؤن لوڈ کریں","اپنا ڈیٹا پہلے برآمد شدہ فائل سے بحال کریں","فائلیں AWESchool کے ذریعے دستخط شدہ ہیں۔ جعلی فائلیں مسترد کر دی جائیں گی۔","درآمد موجودہ ڈیٹا کو تبدیل کر دے گا۔","ڈیٹا برآمد ہوا (دستخط شدہ فائل)",
    "ڈیٹا فائل سے کامیابی سے درآمد ہوا!","غیر قانونی فائل فارمیٹ","فائل پڑھنے میں ناکام","زبان تبدیل ہوگئی","زبان منتخب کریں",
    "زبان تلاش کریں...","کوئی نتائج نہیں ملے",
]

# Bengali
TRANSLATIONS["bn"] = [
    "জ্ঞানের বিশ্ব","AWESchool - শিক্ষামূলক খেলা","স্বাগতম","আপনার নাম লিখুন","শেখা শুরু করুন",
    "নতুন নিবন্ধন","আমার ইতিমধ্যে অ্যাকাউন্ট আছে — পুনরুদ্ধার করুন","ইন্টারেক্টিভ শিক্ষামূলক প্ল্যাটফর্ম: 200+ বিষয়, 10,000+ পাঠ, কণ্ঠে পড়া, পরীক্ষা।","JSON ফাইল থেকে পুনরুদ্ধার করুন","আপনার চরিত্র বেছে নিন",
    "স্বাগতম","একটি বিষয় বেছে নিন, পাঠ শিখুন, পরীক্ষায় পাস করুন","প্রধান বিষয়","বিজ্ঞান","মানবিক",
    "কম্পিউটার পেশা","উন্নত প্রযুক্তি","শুনুন","থামুন","পরবর্তী",
    "পূর্ববর্তী","পরীক্ষা শুরু করুন","পাঠ","সম্পন্ন","ইঙ্গিত পান",
    "ব্যাখ্যা","প্রশ্ন","যাচাই করুন","প্রস্থান","অভিনন্দন",
    "আবার চেষ্টা করুন","আপনি সফলভাবে পরীক্ষায় পাস করেছেন","পরবর্তী পাঠের জন্য 60%+ প্রয়োজন","সম্পন্ন পাঠ","টানা দিন",
    "পয়েন্ট","আমার পরিসংখ্যান","অর্জন","অধ্যয়ন করা","প্রিয়",
    "বুকমার্ক","সেটিংস","থিম","হালকা","গাঢ়",
    "অটো","ফন্ট সাইজ","ছোট","মাঝারি","বড়",
    "দৈনিক লক্ষ্য","ভাষা","ডিফল্ট শেখার মোড","গাঢ় থিম সন্ধ্যায় অধ্যয়নের জন্য ভাল। দৃষ্টির জন্য বড় ফন্ট।","স্কুল",
    "বিশ্ববিদ্যালয়","সহজ পাঠ, রঙিন এবং ইন্টারেক্টিভ","বিস্তারিত বই, 100+ পৃষ্ঠা, পরীক্ষা সহ","গাইড","সাইট ব্যবহার করার উপায়",
    "কীভাবে শুরু করবেন","সাইটে প্রথম পদক্ষেপ","স্কুল এবং বিশ্ববিদ্যালয়","দুটি শেখার মোড","পাঠ শুনুন",
    "কণ্ঠে পড়া","পরিসংখ্যান শেয়ার করুন","আপনার অগ্রগতি বন্ধুদের পাঠান","রপ্তানি / আমদানি","ফাইল-ভিত্তিক ডেটা ব্যাকআপ",
    "200+ ভাষা","সাইটের ভাষা পরিবর্তন করুন","অর্জন","অন্যান্য অংশগ্রহণকারীদের সাথে প্রতিযোগিতা করুন","সমস্ত গাইড",
    "হোম","লাইভ ডেমো","ধাপ","রপ্তানি","আমদানি",
    "আমার প্রোফাইল","প্রোফাইল শেয়ার করুন","পাঠ অনুসন্ধান করুন...","সব","সম্পন্ন",
    "উপলব্ধ","লক করা","প্রিয়","দৈনিক লক্ষ্য","সম্প্রতি দেখা",
    "শেখা চালিয়ে যান","আবার শুরু করুন","ডেটা শেয়ার করুন","বিষয়","আমার অর্জন",
    "আপনি কি নিশ্চিত যে সমস্ত অগ্রগতি মুছতে চান?","🎉 অভিনন্দন! আজকের লক্ষ্য অর্জিত হয়েছে!","আজকের লক্ষ্যে পৌঁছাতে {n} পাঠ বাকি","বই","অধ্যায়",
    "পৃষ্ঠা","পরীক্ষা","পাশের থ্রেশহোল্ড: 51%","পরবর্তী অধ্যায়","© AWESchool সর্বস্বত্ব সংরক্ষিত",
    "শিখুন, খেলুন, বড় হোন","পরিসংখ্যান","সম্পন্ন পাঠ","টানা দিন","পয়েন্ট",
    "অর্জন","মোট পাঠ","অধ্যয়নের সময়","স্ক্রিনশট তৈরি হচ্ছে...","পরিসংখ্যান কপি হয়েছে!",
    "পরিসংখ্যান শেয়ার করুন","Google TTS এর মাধ্যমে কণ্ঠ কাজ করে","বর্তমান ইঞ্জিন","কণ্ঠ পরীক্ষা","কণ্ঠ নির্বাচন করুন",
    "গতি","পিচ","ভলিউম","টেক্সট Google TTS দ্বারা পড়া হয় (বিনামূল্যে","ডেটা রপ্তানি / আমদানি",
    "আপনার সমস্ত ডেটা স্বাক্ষরিত JSON ফাইল হিসাবে ডাউনলোড করুন","আগে রপ্তানি করা ফাইল থেকে আপনার ডেটা পুনরুদ্ধার করুন","ফাইলগুলি AWESchool দ্বারা স্বাক্ষরিত। জাল ফাইল প্রত্যাখ্যাত হবে।","আমদানি বর্তমান ডেটা প্রতিস্থাপন করবে।","ডেটা রপ্তানি হয়েছে (স্বাক্ষরিত ফাইল)",
    "ফাইল থেকে ডেটা সফলভাবে আমদানি হয়েছে!","অবৈধ ফাইল ফরম্যাট","ফাইল পড়তে ব্যর্থ","ভাষা পরিবর্তন হয়েছে","ভাষা নির্বাচন করুন",
    "ভাষা অনুসন্ধান করুন...","কোন ফলাফল পাওয়া যায়নি",
]

# Malay
TRANSLATIONS["ms"] = [
    "Dunia Pengetahuan","AWESchool - Permainan Pendidikan","Selamat datang","Masukkan nama anda","Mula belajar",
    "Pendaftaran baru","Saya sudah ada akaun — Pulihkan","Platform pendidikan interaktif: 200+ subjek, 10,000+ pelajaran, bacaan suara, peperiksaan.","Pulihkan dari fail JSON","Pilih watak anda",
    "Selamat datang","Pilih subjek, pelajari pelajaran, lulus peperiksaan","Subjek teras","Sains","Kemanusiaan",
    "Profesion komputer","Teknologi lanjutan","Dengar","Berhenti","Seterusnya",
    "Sebelumnya","Mula peperiksaan","pelajaran","selesai","Dapatkan petunjuk",
    "Penjelasan","Soalan","Semak","Keluar","Tahniah",
    "Cuba lagi","Anda berjaya lulus peperiksaan","Memerlukan 60%+ untuk pelajaran seterusnya","Pelajaran selesai","Hari berturut-turut",
    "Mata","Statistik saya","Pencapaian","Dipelajari","Kegemaran",
    "Tanda buku","Tetapan","Tema","Cerah","Gelap",
    "Auto","Saiz font","Kecil","Sederhana","Besar",
    "Matlamat harian","Bahasa","Mod pembelajaran lalai","Tema gelap lebih baik untuk belajar pada waktu malam. Font besar untuk penglihatan.","Sekolah",
    "Universiti","Pelajaran mudah, berwarna dan interaktif","Buku terperinci, 100+ muka surat, dengan ujian","Panduan","Cara menggunakan laman web",
    "Cara bermula","Langkah pertama di laman web","Sekolah dan Universiti","Dua mod pembelajaran","Dengar pelajaran",
    "Bacaan suara","Kongsi statistik","Hantar kemajuan anda kepada rakan","Eksport / Import","Sandaran data berasaskan fail",
    "200+ bahasa","Tukar bahasa laman web","Pencapaian","Bersaing dengan peserta lain","Semua panduan",
    "Laman utama","Demo langsung","Langkah","EKSPORT","IMPORT",
    "Profil saya","Kongsi profil","Cari pelajaran...","Semua","Selesai",
    "Tersedia","Terkunci","Kegemaran","Matlamat harian","Dilihat baru-baru ini",
    "Teruskan belajar","Mula semula","Kongsi data","Subjek","Pencapaian saya",
    "Adakah anda pasti mahu memadam semua kemajuan?","🎉 Tahniah! Matlamat hari ini tercapai!","Baki {n} pelajaran untuk matlamat hari ini","Buku","Bab",
    "Halaman","Ujian","Ambang lulus: 51%","Bab seterusnya","© AWESchool Hak cipta terpelihara",
    "Belajar, bermain, berkembang","Statistik","Pelajaran selesai","Hari berturut-turut","Mata",
    "Pencapaian","Jumlah pelajaran","Masa belajar","Membuat tangkapan skrin...","Statistik disalin!",
    "Kongsi statistik","Suara berfungsi melalui Google TTS","Enjin semasa","Uji suara","Pilih suara",
    "Kelajuan","Pic","Kelantangan","Teks dibaca oleh Google TTS (percuma","Eksport / import data",
    "Muat turun semua data anda sebagai fail JSON yang ditandatangani","Pulihkan data anda dari fail yang dieksport sebelum ini","Fail ditandatangani oleh AWESchool. Fail palsu akan ditolak.","Import akan menggantikan data semasa.","Data dieksport (fail ditandatangani)",
    "Data berjaya diimport dari fail!","Format fail tidak sah","Gagal membaca fail","Bahasa ditukar","Pilih bahasa",
    "Cari bahasa...","Tiada hasil dijumpai",
]

# Slovak
TRANSLATIONS["sk"] = [
    "Svet Vedomostí","AWESchool - Vzdelávacia Hra","Vitajte","Zadajte svoje meno","Začať učiť",
    "Nová registrácia","Už mám účet — Obnoviť","Interaktívna vzdelávacia platforma: 200+ predmetov, 10 000+ lekcií, čítanie hlasom, skúšky.","Obnoviť z JSON súboru","Vyberte si postavu",
    "Vitajte","Vyberte predmet, učte sa lekcie, absolvujte skúšky","Hlavné predmety","Vedy","Humanitné predmety",
    "Počítačové profesie","Pokročilé technológie","Počúvať","Stop","Ďalšie",
    "Predchádzajúce","Začať skúšku","lekcií","dokončené","Získať tip",
    "Vysvetlenie","Otázka","Skontrolovať","Výstup","Gratulujeme",
    "Skúste znova","Úspešne ste zložili skúšku","Potrebujete 60%+ pre ďalšiu lekciu","Dokončené lekcie","Po sebe idúce dni",
    "Body","Moja štatistika","Úspechy","Naučilo sa","Obľúbené",
    "Záložky","Nastavenia","Téma","Svetlá","Tmavá",
    "Auto","Veľkosť písma","Malá","Stredná","Veľká",
    "Denný cieľ","Jazyk","Predvolený režim učenia","Tmavá téma je lepšia na večerné štúdium. Veľké písmo pre zrak.","Škola",
    "Univerzita","Ľahké lekcie, farebné a interaktívne","Podrobná kniha, 100+ strán, s testami","Sprievodcovia","Ako používať web",
    "Ako začať","Prvé kroky na webe","Škola a Univerzita","Dva režimy učenia","Počúvať lekcie",
    "Čítanie hlasom","Zdieľať štatistiky","Pošlite svoj pokrok priateľom","Export / Import","Zálohovanie dát založené na súboroch",
    "200+ jazykov","Zmeniť jazyk webu","Úspechy","Súťažte s inými účastníkmi","Všetci sprievodcovia",
    "Domov","Živé demo","Krok","EXPORT","IMPORT",
    "Môj profil","Zdieľať profil","Hľadať lekcie...","Všetky","Dokončené",
    "Dostupné","Uzamknuté","Obľúbené","Denný cieľ","Nedávno zobrazené",
    "Pokračovať v učení","Začať znova","Zdieľať dáta","Predmety","Moje úspechy",
    "Ste si istý, že chcete vymazať všetok pokrok?","🎉 Gratulujeme! Denný cieľ dosiahnutý!","Zostáva {n} lekcií do dnešného cieľa","Kniha","Kapitola",
    "Strana","Test","Hranica pre absolvovanie: 51%","Ďalšia kapitola","© AWESchool Všetky práva vyhradené",
    "Učte sa, hrajte, rastite","Štatistiky","Dokončené lekcie","Po sebe idúce dni","Body",
    "Úspechy","Celkom lekcií","Čas štúdia","Vytvára sa snímka obrazovky...","Štatistiky skopírované!",
    "Zdieľať štatistiky","Hlas funguje cez Google TTS","Aktuálny engine","Otestovať hlas","Vybrať hlas",
    "Rýchlosť","Výška","Hlasitosť","Text číta Google TTS ( zadarmo","Export / import dát",
    "Stiahnite si všetky svoje dáta ako podpísaný JSON súbor","Obnovte svoje dáta z predtým exportovaného súboru","Súbory podpisuje AWESchool. Falošné súbory budú odmietnuté.","Import nahradí aktuálne dáta.","Dáta exportované (podpísaný súbor)",
    "Dáta úspešne importované zo súboru!","Neplatný formát súboru","Čítanie súboru zlyhalo","Jazyk zmenený","Vybrať jazyk",
    "Hľadať jazyk...","Nenašli sa žiadne výsledky",
]

# Georgian
TRANSLATIONS["ka"] = [
    "ცოდნის სამყარო","AWESchool - საგანმანათლებლო თამაში","კეთილი ინახვის მოწვევა","შეიყვანეთ თქვენი სახელი","სწავლის დაწყება",
    "ახალი რეგისტრაცია","უკვე მაქვს ანგარიში — აღდგენა","ინტერაქტიული საგანმანათლებლო პლატფორმა: 200+ საგანი, 10,000+ გაკვეთილი, ხმით კითხვა, გამოცდები.","JSON ფაილიდან აღდგენა","აირჩიეთ თქვენი პერსონაჟი",
    "კეთილი ინახვის მოწვევა","აირჩიეთ საგანი, ისწავლეთ გაკვეთილები, გაიარეთ გამოცდები","მთავარი საგნები","მეცნიერებები","ჰუმანიტარული მეცნიერებები",
    "კომპიუტერული პროფესიები","მოწინავე ტექნოლოგიები","მოსმენა","შეჩერება","შემდეგი",
    "წინა","გამოცდის დაწყება","გაკვეთილი","დასრულებული","მინიშნების მიღება",
    "ახსნა","კითხვა","შემოწმება","გასვლა","გილოცავთ",
    "კიდევ სცადეთ","თქვენ წარმატებით გაიარეთ გამოცდა","შემდეგი გაკვეთილისთვის საჭიროა 60%+","დასრულებული გაკვეთილები","თანმიმდევრული დღეები",
    "ქულები","ჩემი სტატისტიკა","მიღწევები","შესწავლილი","ფავორიტები",
    "სანიშნეები","პარამეტრები","თემა","ღია","მუქი",
    "ავტო","ფონტის ზომა","პატარა","საშუალო","დიდი",
    "ყოველდღიური მიზანი","ენა","ნაგულისხმევი სწავლის რეჟიმი","მუქი თემა საღამოს სწავლისთვის უკეთესია. დიდი ფონტი ხედვისთვის.","სკოლა",
    "უნივერსიტეტი","მარტივი გაკვეთილები, ფერადი და ინტერაქტიული","დეტალური წიგნი, 100+ გვერდი, ტესტებით","გზამკვლევები","როგორ გამოვიყენოთ საიტი",
    "როგორ დავიწყოთ","პირველი ნაბიჯები საიტზე","სკოლა და უნივერსიტეტი","ორი სწავლის რეჟიმი","მოვუსმინოთ გაკვეთილებს",
    "ხმით კითხვა","სტატისტიკის გაზიარება","გააზიარეთ თქვენი პროგრესი მეგობრებთან","ექსპორტი / იმპორტი","ფაილზე დაფუძნებული მონაცემთა სარეზერვო",
    "200+ ენა","საიტის ენის შეცვლა","მიღწევები","შეეჯიბრეთ სხვა მონაწილეებს","ყველა გზამკვლევი",
    "მთავარი","ცოცხალი დემო","ნაბიჯი","ექსპორტი","იმპორტი",
    "ჩემი პროფილი","პროფილის გაზიარება","გაკვეთილების ძიება...","ყველა","დასრულებული",
    "ხელმისაწვდომი","დაბლოკილი","ფავორიტები","ყოველდღიური მიზანი","ახლახან ნანახი",
    "სწავლის გაგრძელება","თავიდან დაწყება","მონაცემების გაზიარება","საგნები","ჩემი მიღწევები",
    "დარწმუნებული ხართ, რომ გსურთ მთელი პროგრესის წაშლა?","🎉 გილოცავთ! დღის მიზანი მიღწეულია!","დარჩა {n} გაკვეთილი დღის მიზნამდე","წიგნი","თავი",
    "გვერდი","ტესტი","გავლის ზღვარი: 51%","შემდეგი თავი","© AWESchool ყველა უფლება დაცულია",
    "ისწავლე, ითამაშე, გაიზარდე","სტატისტიკა","დასრულებული გაკვეთილები","თანმიმდევრული დღეები","ქულები",
    "მიღწევები","ჯამური გაკვეთილები","სწავლის დრო","იქმნება ეკრანის ანაბეჭდი...","სტატისტიკა დაკოპირდა!",
    "სტატისტიკის გაზიარება","ხმა მუშაობს Google TTS-ით","მიმდინარე ძრავა","ხმის ტესტი","ხმის არჩევა",
    "სიჩქარე","ბანი","მოცულობა","ტექსტს კითხულობს Google TTS (უფასოდ","მონაცემთა ექსპორტი / იმპორტი",
    "ჩამოტვირთეთ თქვენი ყველა მონაცემი ხელმოწერილი JSON ფაილის სახით","აღადგინეთ თქვენი მონაცემები წინასწარ ექსპორტირებული ფაილიდან","ფაილებს ხელს აწერს AWESchool. ყალბი ფაილები უარყოფილი იქნება.","იმპორტი ჩაანაცვლებს მიმდინარე მონაცემებს.","მონაცემები ექსპორტირებულია (ხელმოწერილი ფაილი)",
    "მონაცემები წარმატებით შემოტანილია ფაილიდან!","არასწორი ფაილის ფორმატი","ფაილის წაკითხვა ვერ მოხერხდა","ენა შეიცვალა","აირჩიეთ ენა",
    "ენის ძიება...","შედეგები ვერ მოიძებნა",
]

# Generate
def quote(s):
    s = s.replace("\\","\\\\").replace("'","\\'")
    return f"'{s}'"

for code, values in TRANSLATIONS.items():
    assert len(values) == len(KEYS), f"{code}: expected {len(KEYS)} values, got {len(values)}"
    lines = []
    lines.append(f"// {code} - UI translations (hand-curated)")
    lines.append("")
    lines.append(f"export const {code}: Record<string, string> = {{")
    for k, v in zip(KEYS, values):
        lines.append(f"  {quote(k)}: {quote(v)},")
    lines.append("}")
    lines.append("")
    (OUT_DIR / f"{code}.ts").write_text("\n".join(lines), encoding="utf-8")
    print(f"  ✓ {code}.ts ({len(values)} keys)")

print(f"\n✓ Generated {len(TRANSLATIONS)} more hand-curated translation files")
