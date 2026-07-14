"use client";

import { useTranslation, Translate } from "@/hooks/use-translation";
import { BookOpen, ShieldCheck, Globe, GraduationCap, School, Heart, Sparkles } from "lucide-react";

export function GuidesPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      icon: <School className="w-5 h-5 text-violet-600" />,
      title: "Ինչպե՞ս է աշխատում Դպրոցական ռեժիմը:",
      desc: "Դպրոցական ռեժիմը տրամադրում է դասերի գծային, հստակ և հերթական կառուցվածք: Յուրաքանչյուր առարկա ունի իր գլուխներն ու թեմաները: Քննությունն անցնելուց հետո ձեզ համար բացվում է հաջորդ դասը:"
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-violet-600" />,
      title: "Ինչպե՞ս է աշխատում Համալսարանական ռեժիմը:",
      desc: "Համալսարանական ռեժիմը թույլ է տալիս ուսումնասիրել առարկաները ինտերակտիվ գրքի միջոցով: Դուք կարող եք թերթել գրքի էջերը, տեսնել գլուխները և անցնել թեստերը անմիջապես գրքից:"
    },
    {
      icon: <Globe className="w-5 h-5 text-violet-600" />,
      title: "Ինչպե՞ս է աշխատում ակնթարթային թարգմանությունը:",
      desc: "Լեզուների ընտրացանկից ցանկացած լեզու ընտրելիս հարթակի ամբողջ բովանդակությունը (վերնագրեր, դասեր, քննական հարցեր, տարբերակներ, հուշումներ և բացատրություններ) ավտոմատ կերպով թարգմանվում է այդ լեզվով՝ օգտագործելով ամպային թարգմանության տեխնոլոգիաները:"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-violet-600" />,
      title: "Ի՞նչ է պաշտպանված կոդը:",
      desc: "Պաշտպանված կոդը ձեր առաջընթացի թվային արտահանումն է: Այն պարունակում է թվային ստորագրություն, որը կանխում է տվյալների կեղծումը: Դուք կարող եք պատճենել այն և տեղադրել ցանկացած այլ սարքի վրա՝ ձեր առաջընթացը շարունակելու համար:"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-42 h-42 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-white/15 px-3 py-1 rounded-full inline-block">
            <Translate text="Օգնություն և Ուղեցույց" />
          </span>
          <h2 className="font-extrabold text-xl md:text-3xl tracking-tight">
            <Translate text="Բարի գալուստ AWESchool Գիտելիքների Կենտրոն" />
          </h2>
          <p className="text-xs md:text-sm text-violet-100/90 leading-relaxed max-w-2xl">
            <Translate text="Այստեղ դուք կգտնեք բոլոր անհրաժեշտ պատասխանները մեր հարթակի հնարավորությունների, թարգմանական համակարգի, ռեժիմների և առաջընթացի անվտանգ պահպանման վերաբերյալ:" />
          </p>
        </div>
      </div>

      {/* FAQs List */}
      <div className="grid gap-6 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            id={`faq-card-${index}`}
            className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
          >
            <div className="p-3 bg-violet-50 rounded-xl shrink-0">
              {faq.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-gray-800 text-sm md:text-base leading-snug">
                <Translate text={faq.title} />
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                <Translate text={faq.desc} />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Crafted Credit */}
      <div className="text-center py-6 text-xs text-gray-400 space-y-1">
        <p className="flex items-center justify-center gap-1.5">
          <span>AWESchool - <Translate text="Սովորիր, խաղա, զարգացիր" /></span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
        </p>
        <p>© 2026 AWESchool. <Translate text="Բոլոր իրավունքները պաշտպանված են" />.</p>
      </div>
    </div>
  );
}
