"use client";

import { useTranslation, Translate } from "@/hooks/use-translation";
import { 
  BookOpen, Compass, Key, Shield, Sparkles, Award, Flame, HelpCircle 
} from "lucide-react";

export function GuidesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-4">
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-6 md:p-8 rounded-3xl text-white shadow-md">
        <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/10">
          🎓 <Translate text="Ուղեցույց և Օգնություն" />
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3">
          <Translate text="Ինչպե՞ս օգտվել AWESchool-ից" />
        </h2>
        <p className="text-xs md:text-sm text-white/80 leading-relaxed mt-2 max-w-2xl">
          <Translate text="Բարի գալուստ հաջորդ սերնդի ինտերակտիվ կրթական հարթակ: Այստեղ դուք կարող եք սովորել տասնյակ առարկաներ ձեր նախընտրած լեզվով, հանձնել քննություններ և կուտակել գիտելիքներ:" />
        </p>
      </div>

      {/* Guide Bento Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: School vs University */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/85 shadow-sm space-y-3">
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl w-fit">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-base md:text-lg">
            <Translate text="Ռեժիմների Տարբերությունը" />
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            <Translate text="• Դպրոցական ռեժիմում բոլոր դասերը բաց են ազատ ուսումնասիրման համար: Կարող եք ընտրել ցանկացած թեմա ցանկացած պահին:" />
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            <Translate text="• Համալսարանական ռեժիմում դասերը բացվում են հաջորդաբար: Յուրաքանչյուր դասախոսություն բացելու համար անհրաժեշտ է հաջողությամբ անցնել նախորդի քննությունը:" />
          </p>
        </div>

        {/* Card 2: Translation Engine */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/85 shadow-sm space-y-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="font-bold text-gray-800 text-base md:text-lg">
            <Translate text="Գերհզոր Թարգմանության Համակարգ" />
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            <Translate text="Մեր հարթակը թույլ է տալիս ակնթարթորեն թարգմանել ուսումնական բովանդակությունը աշխարհի ավելի քան 80 լեզուներով: Թարգմանությունները պահպանվում են ձեր սարքում, ինչը թույլ է տալիս հետագայում դրանք կարդալ առանց սպասելու:" />
          </p>
        </div>

        {/* Card 3: Cryptography and Security */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/85 shadow-sm space-y-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-800 text-base md:text-lg">
            <Translate text="Անվտանգություն և Թվային Ստորագրություն" />
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            <Translate text="Ձեր առաջընթացի արտահանման կոդը պաշտպանված է կրիպտոգրաֆիկ թվային ստորագրությամբ: Այն երաշխավորում է, որ ձեր միավորները, մակարդակները և բացված նվաճումները չեն կարող կեղծվել կամ փոփոխվել այլոց կողմից: Տվյալները ներմուծելիս համակարգը ավտոմատ կերպով ստուգում է ստորագրությունը:" />
          </p>
        </div>

        {/* Card 4: Daily Goals and Streaks */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150/85 shadow-sm space-y-3">
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl w-fit">
            <Flame className="w-5 h-5 animate-bounce" />
          </div>
          <h3 className="font-bold text-gray-800 text-base md:text-lg">
            <Translate text="Օրական Նպատակներ և Շարքեր" />
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            <Translate text="Պահպանեք ձեր ամենօրյա ուսումնական շարքը (Streak) ամեն օր գոնե մեկ դաս սովորելով: Եթե բաց թողնեք գեթ մեկ օր, ձեր շարքը կզրոյանա: Կատարեք ձեր առջև դրված օրական նպատակը՝ լրացուցիչ XP միավորներ ստանալու համար:" />
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-150 space-y-4">
        <h3 className="font-extrabold text-gray-800 text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-600" />
          <Translate text="Հաճախակի Տրվող Հարցեր" />
        </h3>

        <div className="space-y-3.5 pt-2">
          <div className="bg-white p-4 rounded-xl border border-gray-150/70">
            <h4 className="font-bold text-gray-800 text-sm mb-1">
              <Translate text="Ի՞նչ է XP-ն և ինչպե՞ս այն կուտակել:" />
            </h4>
            <p className="text-xs text-gray-500 leading-normal">
              <Translate text="XP-ն փորձառության միավոր է: Այն տրվում է յուրաքանչյուր ավարտված դասի համար (50 XP), ինչպես նաև քննության ճիշտ պատասխանների համար: Կատարյալ հանձնելու դեպքում ստանում եք հավելյալ բոնուսներ:" />
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-150/70">
            <h4 className="font-bold text-gray-800 text-sm mb-1">
              <Translate text="Կարո՞ղ եմ օգտվել հարթակից առանց ինտերնետի:" />
            </h4>
            <p className="text-xs text-gray-500 leading-normal">
              <Translate text="Այո, հավելվածը լիովին աշխատում է անցանց ռեժիմում, բացառությամբ նոր լեզվով թարգմանությունների առաջին բեռնման, որը պահանջում է Google Translate API-ի հասանելիություն: Մեկ անգամ բեռնված թարգմանությունները պահպանվում են ընդմիշտ:" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
