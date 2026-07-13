import { Subject } from '../types'
import { mathLessons } from './math-lessons'
import { geographyLessons } from './geography-lessons'
import { physicsLessons } from './physics-lessons'
import { programmingLessons } from './programming-lessons'
import { webDesignLessons, graphicDesignLessons, databaseLessons, networkLessons, aiLessons } from './computer-lessons'
import { chemistryLessons, biologyLessons, historyLessons, englishLessons, roboticsLessons, astronomyLessons, logicLessons } from './new-subjects-lessons'
import { generateAdditionalLessons } from './lesson-generator'
import { enhanceLesson } from './lesson-enhancer'

// Օգնող ֆունկցիա՝ ավտոմատ բարելավելու բոլոր դասերը
function enhanceLessons(lessons: Lesson[], subjectCategory: string) {
  return lessons.map(lesson => enhanceLesson(lesson, subjectCategory))
}

import { Lesson } from '../types'

// Օգնող ֆունկցիա՝ զանգվածով առարկաներ ստեղծելու համար
interface SubjectDef {
  id: string
  name: string
  icon: string
  desc: string
  color: string
  tags: string[]
}

function generateSubjectBatch(category: Subject['category'], defs: SubjectDef[]): Subject[] {
  return defs.map(def => {
    // Օգտագործել 'math' որպես ֆոլբեք թեմաներ (քանի որ նոր առարկաները չունեն հատուկ թեմաներ)
    const fallbackKey = category === 'computer' ? 'programming' : category === 'art' ? 'graphic-design' : 'math'
    return {
      id: def.id,
      name: def.name,
      description: def.desc,
      icon: def.icon,
      color: def.color,
      category,
      tags: def.tags,
      difficulty: 'mixed' as const,
      lessons: enhanceLessons(
        generateAdditionalLessons(fallbackKey, def.name, 0, 75),
        category === 'computer' ? 'computer' : category === 'art' ? 'computer' : 'core'
      ),
    }
  })
}

// Հիմնական առարկաներ + գեներացված հավելյալ դասեր
export const subjects: Subject[] = [
  // === Հիմնական առարկաներ ===
  {
    id: 'math',
    name: 'Մաթեմատիկա',
    description: 'Թվեր, գործողություններ, երկրաչափություն և ավելին',
    icon: '🔢',
    color: 'from-orange-400 to-pink-500',
    category: 'core',
    tags: ['թվեր', 'երկրաչափություն', 'ալգեբրա'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...mathLessons, ...generateAdditionalLessons('math', 'Մաթեմատիկա', mathLessons.length, 75)], 'core')
  },
  {
    id: 'geography',
    name: 'Աշխարհագրություն',
    description: 'Մոլորակ, մայրցամաքներ, երկրներ, բնություն',
    icon: '🌍',
    color: 'from-emerald-400 to-teal-600',
    category: 'core',
    tags: ['երկրներ', 'մայրցամախներ', 'կլիմա'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...geographyLessons, ...generateAdditionalLessons('geography', 'Աշխարհագրություն', geographyLessons.length, 75)], 'core')
  },
  {
    id: 'physics',
    name: 'Ֆիզիկա',
    description: 'Շարժում, ուժ, էներգիա, լույս և ձայն',
    icon: '⚛️',
    color: 'from-violet-400 to-purple-600',
    category: 'core',
    tags: ['շարժում', 'էներգիա', 'լույս'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...physicsLessons, ...generateAdditionalLessons('physics', 'Ֆիզիկա', physicsLessons.length, 75)], 'core')
  },

  // === Գիտություններ ===
  {
    id: 'chemistry',
    name: 'Քիմիա',
    description: 'Նյութեր, ռեակցիաներ, պարբերական աղյուսակ',
    icon: '🧪',
    color: 'from-lime-400 to-green-600',
    category: 'science',
    tags: ['նյութեր', 'ռեակցիաներ', 'ատոմներ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...chemistryLessons, ...generateAdditionalLessons('chemistry', 'Քիմիա', chemistryLessons.length, 75)], 'science')
  },
  {
    id: 'biology',
    name: 'Կենսաբանություն',
    description: 'Բջիջ, օրգանիզմ, բնություն, ԴՆԹ',
    icon: '🔬',
    color: 'from-green-400 to-emerald-600',
    category: 'science',
    tags: ['բջիջ', 'էվոլյուցիա', 'էկոհամակարգ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...biologyLessons, ...generateAdditionalLessons('biology', 'Կենսաբանություն', biologyLessons.length, 75)], 'science')
  },
  {
    id: 'astronomy',
    name: 'Աստղագիտություն',
    description: 'Տիեզերք, աստղեր, մոլորակներ, գալակտիկաներ',
    icon: '🌌',
    color: 'from-indigo-500 to-purple-700',
    category: 'science',
    tags: ['տիեզերք', 'աստղեր', 'մոլորակներ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...astronomyLessons, ...generateAdditionalLessons('astronomy', 'Աստղագիտություն', astronomyLessons.length, 75)], 'science')
  },

  // === Հումանիտար առարկաներ ===
  {
    id: 'history',
    name: 'Պատմություն',
    description: 'Հայոց պատմություն, համաշխարհային պատմություն',
    icon: '🏛️',
    color: 'from-amber-500 to-orange-700',
    category: 'language',
    tags: ['Հայաստան', 'հին աշխարհ', 'միջին դարեր'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...historyLessons, ...generateAdditionalLessons('history', 'Պատմություն', historyLessons.length, 75)], 'language')
  },
  {
    id: 'english',
    name: 'Անգլերեն',
    description: 'Այբուբեն, գրամատիկա, բառապաշար, խոսակցություն',
    icon: '🔤',
    color: 'from-blue-500 to-cyan-600',
    category: 'language',
    tags: ['այբուբեն', 'գրամատիկա', 'բառապաշար'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...englishLessons, ...generateAdditionalLessons('english', 'Անգլերեն', englishLessons.length, 75)], 'language')
  },

  // === Համակարգչային մասնագիտություններ ===
  {
    id: 'programming',
    name: 'Ծրագրավորում',
    description: 'Կոդի աշխարհ՝ Python, JavaScript, ալգորիթմներ',
    icon: '💻',
    color: 'from-blue-400 to-cyan-600',
    category: 'computer',
    tags: ['Python', 'JavaScript', 'ալգորիթմներ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...programmingLessons, ...generateAdditionalLessons('programming', 'Ծրագրավորում', programmingLessons.length, 75)], 'computer')
  },
  {
    id: 'web-design',
    name: 'Վեբ Դիզայն',
    description: 'Վեբ կայքերի ստեղծում՝ HTML, CSS, JavaScript',
    icon: '🌐',
    color: 'from-rose-400 to-red-600',
    category: 'computer',
    tags: ['HTML', 'CSS', 'JavaScript'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...webDesignLessons, ...generateAdditionalLessons('web-design', 'Վեբ Դիզայն', webDesignLessons.length, 75)], 'computer')
  },
  {
    id: 'graphic-design',
    name: 'Գրաֆիկական Դիզայն',
    description: 'Գույներ, տառատեսակներ, նկարներ, լոգոներ',
    icon: '🎨',
    color: 'from-amber-400 to-orange-600',
    category: 'computer',
    tags: ['գույներ', 'տիպոգրաֆիկա', 'լոգո'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...graphicDesignLessons, ...generateAdditionalLessons('graphic-design', 'Գրաֆիկական Դիզայն', graphicDesignLessons.length, 75)], 'computer')
  },
  {
    id: 'database',
    name: 'Տվյալների Բազա',
    description: 'Տվյալների կազմակերպում, SQL, աղյուսակներ',
    icon: '🗄️',
    color: 'from-lime-400 to-green-600',
    category: 'computer',
    tags: ['SQL', 'աղյուսակներ', 'տվյալներ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...databaseLessons, ...generateAdditionalLessons('database', 'Տվյալների Բազա', databaseLessons.length, 75)], 'computer')
  },
  {
    id: 'networks',
    name: 'Ցանցեր և Անվտանգություն',
    description: 'Ինտերնետ, կիբերանվտանգություն, պաշտպանություն',
    icon: '🛡️',
    color: 'from-sky-400 to-indigo-600',
    category: 'computer',
    tags: ['ինտերնետ', 'անվտանգություն', 'ցանցեր'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...networkLessons, ...generateAdditionalLessons('networks', 'Ցանցեր և Անվտանգություն', networkLessons.length, 75)], 'computer')
  },
  {
    id: 'ai',
    name: 'Արհեստական Բանականություն',
    description: 'AI, մեքենայական ուսուցում, նեյրոնային ցանցեր',
    icon: '🤖',
    color: 'from-fuchsia-400 to-pink-600',
    category: 'computer',
    tags: ['AI', 'ML', 'նեյրոնային ցանցեր'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...aiLessons, ...generateAdditionalLessons('ai', 'Արհեստական Բանականություն', aiLessons.length, 75)], 'computer')
  },

  // === Առաջադեմ տեխնոլոգիաներ ===
  {
    id: 'robotics',
    name: 'Ռոբոտատեխնիկա',
    description: 'Ռոբոտներ, Arduino, LEGO, ավտոմատացում',
    icon: '🤖',
    color: 'from-slate-500 to-gray-700',
    category: 'advanced',
    tags: ['Arduino', 'LEGO', 'սենսորներ'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...roboticsLessons, ...generateAdditionalLessons('robotics', 'Ռոբոտատեխնիկա', roboticsLessons.length, 75)], 'computer')
  },
  {
    id: 'logic',
    name: 'Տրամաբանություն',
    description: 'Մտածողություն, ալգորիթմներ, խնդիրների լուծում',
    icon: '🧠',
    color: 'from-purple-500 to-violet-700',
    category: 'advanced',
    tags: ['տրամաբանություն', 'ալգորիթմներ', 'մտածողություն'],
    difficulty: 'mixed',
    lessons: enhanceLessons([...logicLessons, ...generateAdditionalLessons('logic', 'Տրամաբանություն', logicLessons.length, 75)], 'computer')
  },

  // === ԲԻԶՆԵՍ ԵՎ ԷԿՈՆՈՄԻԿԱ ===
  ...generateSubjectBatch('business', [
    { id: 'economics', name: 'Էկոնոմիկա', icon: '💰', desc: 'Միկրո և մակրոէկոնոմիկա, շուկա', color: 'from-green-400 to-emerald-600', tags: ['շուկա', 'առևտուր', 'ֆինանսներ'] },
    { id: 'accounting', name: 'Հաշվապահություն', icon: '📊', desc: 'Ֆինանսական հաշվետվություններ', color: 'from-teal-400 to-cyan-600', tags: ['հաշվապահություն', 'բալանս'] },
    { id: 'marketing', name: 'Մարքեթինգ', icon: '📢', desc: 'Գովազդ, բրենդինգ, սոցմեդիա', color: 'from-pink-400 to-rose-600', tags: ['գովազդ', 'բրենդ'] },
    { id: 'management', name: 'Մենեջմենթ', icon: '👔', desc: 'Կազմակերպման և կառավարման արվեստ', color: 'from-slate-500 to-gray-700', tags: ['ղեկավարում', 'թիմ'] },
    { id: 'entrepreneurship', name: 'Ձեռնարկատիրություն', icon: '🚀', desc: 'Ստարտապներ, բիզնես մոդելներ', color: 'from-orange-400 to-red-600', tags: ['ստարտապ', 'բիզնես'] },
    { id: 'finance', name: 'Ֆինանսներ', icon: '🏦', desc: 'Ներդրումներ, բանկային գործ', color: 'from-emerald-400 to-green-600', tags: ['ներդրումներ', 'բանկ'] },
    { id: 'business-law', name: 'Բիզնես Իրավունք', icon: '⚖️', desc: 'Առևտրային իրավունք, պայմանագրեր', color: 'from-amber-500 to-yellow-700', tags: ['իրավունք', 'պայմանագիր'] },
    { id: 'project-mgmt', name: 'Պրոյեկտների Կառավարում', icon: '📋', desc: 'Agile, Scrum, Kanban', color: 'from-blue-400 to-indigo-600', tags: ['agile', 'scrum'] },
  ]),

  // === ԲՆԱԿԱՆ ԳԻՏՈՒԹՅՈՒՆՆԵՐ ===
  ...generateSubjectBatch('science', [
    { id: 'geology', name: 'Երկրաբանություն', icon: '🪨', desc: 'Ապարներ, միներալներ, երկրի կառուցվածք', color: 'from-stone-400 to-amber-700', tags: ['ապարներ', 'միներալներ'] },
    { id: 'meteorology', name: 'Մետեորոլոգիա', icon: '🌤️', desc: 'Եղանակ, կլիմա, մթնոլորտ', color: 'from-sky-400 to-blue-600', tags: ['եղանակ', 'կլիմա'] },
    { id: 'oceanography', name: 'Օվկիանոսագիտություն', icon: '🌊', desc: 'Ծովեր, օվկիանոսներ, ծովային կյանք', color: 'from-cyan-400 to-blue-700', tags: ['ծով', 'օվկիանոս'] },
    { id: 'ecology', name: 'Էկոլոգիա', icon: '🌱', desc: 'Բնապահպանություն, էկոհամակարգեր', color: 'from-green-400 to-teal-600', tags: ['բնապահպանություն', 'էկո'] },
    { id: 'zoology', name: 'Կենդանաբանություն', icon: '🦁', desc: 'Կենդանիների աշխարհ', color: 'from-amber-400 to-orange-600', tags: ['կենդանիներ', 'դասակարգում'] },
    { id: 'botany', name: 'Բուսաբանություն', icon: '🌿', desc: 'Բույսերի աշխարհ', color: 'from-lime-400 to-green-600', tags: ['բույսեր', 'ծաղիկներ'] },
    { id: 'genetics', name: 'Գենետիկա', icon: '🧬', desc: 'ԴՆԹ, գեներ, ժառանգականություն', color: 'from-purple-400 to-violet-600', tags: ['ԴՆԹ', 'գեներ'] },
    { id: 'microbiology', name: 'Մանրէաբանություն', icon: '🦠', desc: 'Բակտերիաներ, վիրուսներ, մանրէներ', color: 'from-rose-400 to-pink-600', tags: ['բակտերիա', 'վիրուս'] },
    { id: 'neuroscience', name: 'Նյարդաբանություն', icon: '🧠', desc: 'Ուղեղ, նյարդային համակարգ', color: 'from-indigo-400 to-purple-600', tags: ['ուղեղ', 'նյարդ'] },
    { id: 'anatomy', name: 'Անատոմիա', icon: '🫀', desc: 'Մարդու մարմնի կառուցվածք', color: 'from-red-400 to-rose-600', tags: ['մարմին', 'օրգաններ'] },
  ]),

  // === ՄԱԹԵՄԱՏԻԿԱԿԱՆ ԳԻՏՈՒԹՅՈՒՆՆԵՐ ===
  ...generateSubjectBatch('science', [
    { id: 'statistics', name: 'Վիճակագրություն', icon: '📈', desc: 'Տվյալների վերլուծություն, հավանականություն', color: 'from-blue-400 to-cyan-600', tags: ['տվյալներ', 'վերլուծություն'] },
    { id: 'algebra', name: 'Հանրահաշիվ', icon: '🔢', desc: 'Հավասարումներ, ֆունկցիաներ', color: 'from-violet-400 to-purple-600', tags: ['հավասարումներ', 'ֆունկցիաներ'] },
    { id: 'geometry', name: 'Երկրաչափություն', icon: '📐', desc: 'Կերպարանքներ, մակերեսներ, ծավալներ', color: 'from-amber-400 to-orange-600', tags: ['կերպարանք', 'մակերես'] },
    { id: 'trigonometry', name: 'Եռանկյունաչափություն', icon: '📏', desc: 'Անկյուններ, սինուս, կոսինուս', color: 'from-teal-400 to-emerald-600', tags: ['անկյուն', 'սինուս'] },
    { id: 'calculus', name: 'Մաթեմատիկական Անալիզ', icon: '∫', desc: 'Ածանցյալ, ինտեգրալ, սահմաններ', color: 'from-slate-500 to-gray-700', tags: ['ածանցյալ', 'ինտեգրալ'] },
    { id: 'discrete-math', name: 'Դիսկրետ Մաթեմատիկա', icon: '🔷', desc: 'Կոմբինատորիկա, գրաֆներ', color: 'from-indigo-400 to-blue-600', tags: ['կոմբինատորիկա', 'գրաֆ'] },
  ]),

  // === ՏԵԽՆՈԼՈԳԻԱ ԵՎ ԾՐԱԳՐԱՎՈՐՈՒՄ ===
  ...generateSubjectBatch('computer', [
    { id: 'python', name: 'Python', icon: '🐍', desc: 'Ամենատարածված ծրագրավորման լեզուն', color: 'from-yellow-400 to-amber-600', tags: ['Python', 'դասեր'] },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', desc: 'Վեբ ծրագրավորման լեզու', color: 'from-yellow-300 to-yellow-500', tags: ['JS', 'վեբ'] },
    { id: 'java', name: 'Java', icon: '☕', desc: 'Օբյեկտ-կողմնորոշված լեզու', color: 'from-orange-400 to-red-600', tags: ['Java', 'OOP'] },
    { id: 'cpp', name: 'C++', icon: '⚙️', desc: 'Համակարգային ծրագրավորում', color: 'from-blue-500 to-indigo-700', tags: ['C++', 'համակարգ'] },
    { id: 'react', name: 'React', icon: '⚛️', desc: 'UI գրադարան', color: 'from-cyan-400 to-blue-600', tags: ['React', 'UI'] },
    { id: 'nodejs', name: 'Node.js', icon: '🟢', desc: 'Սերվերային JavaScript', color: 'from-green-400 to-emerald-600', tags: ['Node', 'սերվեր'] },
    { id: 'mobile-dev', name: 'Բջջային Ծրագրավորում', icon: '📱', desc: 'iOS, Android, React Native', color: 'from-purple-400 to-violet-600', tags: ['iOS', 'Android'] },
    { id: 'game-dev', name: 'Խաղերի Մշակում', icon: '🎮', desc: 'Unity, Unreal, խաղերի դիզայն', color: 'from-pink-400 to-rose-600', tags: ['Unity', 'խաղ'] },
    { id: 'devops', name: 'DevOps', icon: '🔄', desc: 'CI/CD, Docker, Kubernetes', color: 'from-slate-400 to-gray-600', tags: ['Docker', 'CI/CD'] },
    { id: 'cybersecurity', name: 'Ինֆորմացիոն Անվտանգություն', icon: '🔐', desc: 'Էթիկական հաքինգ, պենթեստինգ', color: 'from-red-500 to-rose-700', tags: ['հաքինգ', 'անվտանգություն'] },
    { id: 'blockchain', name: 'Բլոկչեյն', icon: '⛓️', desc: 'Կրիպտոարժույթներ, սմարթ պայմանագրեր', color: 'from-amber-400 to-yellow-600', tags: ['crypto', 'blockchain'] },
    { id: 'cloud', name: 'Ամպային Տեխնոլոգիաներ', icon: '☁️', desc: 'AWS, Azure, GCP', color: 'from-sky-400 to-blue-600', tags: ['AWS', 'cloud'] },
  ]),

  // === ԱՐՎԵՍՏ ԵՎ ԴԻԶԱՅՆ ===
  ...generateSubjectBatch('art', [
    { id: 'music-theory', name: 'Երաժշտության Տեսություն', icon: '🎵', desc: 'Նոտաներ, ռիթմ, հարմոնիա', color: 'from-purple-400 to-pink-600', tags: ['նոտա', 'ռիթմ'] },
    { id: 'photography', name: 'Լուսանկարչություն', icon: '📷', desc: 'Կոմպոզիցիա, լույս, խմբագրում', color: 'from-slate-400 to-gray-600', tags: ['ֆոտո', 'կոմպոզիցիա'] },
    { id: 'video-editing', name: 'Վիդեո Մոնտաժ', icon: '🎬', desc: 'Premiere, DaVinci, էֆեկտներ', color: 'from-red-400 to-rose-600', tags: ['վիդեո', 'մոնտաժ'] },
    { id: '3d-modeling', name: '3D Մոդելավորում', icon: '🎭', desc: 'Blender, Maya, 3D անիմացիա', color: 'from-indigo-400 to-purple-600', tags: ['3D', 'Blender'] },
    { id: 'animation', name: 'Անիմացիա', icon: '🎞️', desc: '2D/3D անիմացիայի արվեստ', color: 'from-orange-400 to-amber-600', tags: ['անիմացիա', '2D'] },
    { id: 'ux-design', name: 'UX/UI Դիզայն', icon: '🖌️', desc: 'Օգտատիրական փորձի դիզայն', color: 'from-violet-400 to-fuchsia-600', tags: ['UX', 'UI'] },
    { id: 'interior-design', name: 'Ինտերիերի Դիզայն', icon: '🛋️', desc: 'Տարածքի դիզայնի արվեստ', color: 'from-amber-400 to-orange-600', tags: ['ինտերիեր', 'դիզայն'] },
    { id: 'fashion-design', name: 'Նորաձևության Դիզայն', icon: '👗', desc: 'Հագուստի դիզայնի արվեստ', color: 'from-pink-400 to-rose-600', tags: ['մոդա', 'հագուստ'] },
  ]),

  // === ՀՈՒՄԱՆԻՏԱՐ ԳԻՏՈՒԹՅՈՒՆՆԵՐ ===
  ...generateSubjectBatch('language', [
    { id: 'philosophy', name: 'Փիլիսոփայություն', icon: '🤔', desc: 'Մտածողության արվեստ', color: 'from-stone-500 to-gray-700', tags: ['փիլիսոփայություն', 'միտք'] },
    { id: 'psychology', name: 'Հոգեբանություն', icon: '🧠', desc: 'Մարդու հոգեկան աշխարհ', color: 'from-teal-400 to-cyan-600', tags: ['հոգեբանություն', 'միտք'] },
    { id: 'sociology', name: 'Սոցիոլոգիա', icon: '👥', desc: 'Հասարակության ուսումնասիրություն', color: 'from-blue-400 to-indigo-600', tags: ['հասարակություն', 'սոցիում'] },
    { id: 'literature', name: 'Գրականություն', icon: '📚', desc: 'Համաշխարհային և հայ գրականություն', color: 'from-amber-500 to-orange-700', tags: ['գիրք', 'գրականություն'] },
    { id: 'linguistics', name: 'Լեզվաբանություն', icon: '🗣️', desc: 'Լեզուների կառուցվածք', color: 'from-violet-400 to-purple-600', tags: ['լեզու', 'քերականություն'] },
    { id: 'art-history', name: 'Արվեստի Պատմություն', icon: '🎨', desc: 'Համաշխարհային արվեստ', color: 'from-rose-400 to-pink-600', tags: ['արվեստ', 'պատմություն'] },
    { id: 'religion', name: 'Կրոնագիտություն', icon: '🕊️', desc: 'Համաշխարհային կրոններ', color: 'from-amber-400 to-yellow-600', tags: ['կրոն', 'հոգևոր'] },
    { id: 'cultural-studies', name: 'Մշակութաբանություն', icon: '🌍', desc: 'Մշակույթների ուսումնասիրություն', color: 'from-emerald-400 to-teal-600', tags: ['մշակույթ'] },
  ]),

  // === ԲՈՒԺԱԿԱՆ ԳԻՏՈՒԹՅՈՒՆՆԵՐ ===
  ...generateSubjectBatch('science', [
    { id: 'medicine', name: 'Բժշկություն', icon: '⚕️', desc: 'Առողջություն, ախտորոշում', color: 'from-red-400 to-rose-600', tags: ['բժիշկ', 'առողջություն'] },
    { id: 'pharmacology', name: 'Դեղագիտություն', icon: '💊', desc: 'Դեղեր, դեղամիջոցներ', color: 'from-green-400 to-emerald-600', tags: ['դեղ', 'բուժում'] },
    { id: 'nursing', name: 'Բուժքույրական Գործ', icon: '🩺', desc: 'Խնամք, առողջապահություն', color: 'from-teal-400 to-cyan-600', tags: ['խնամք', 'առողջապահություն'] },
    { id: 'dentistry', name: 'Ստոմատոլոգիա', icon: '🦷', desc: 'Ատամների առողջություն', color: 'from-sky-400 to-blue-600', tags: ['ատամ', 'ստոմատոլոգ'] },
    { id: 'veterinary', name: 'Անասնաբուժություն', icon: '🐕', desc: 'Կենդանիների բժշկություն', color: 'from-amber-400 to-orange-600', tags: ['անասուն', 'կենդանի'] },
    { id: 'public-health', name: 'Հանրային Առողջապահություն', icon: '🏥', desc: 'Համաճարակաբանություն', color: 'from-blue-400 to-indigo-600', tags: ['համաճարակ', 'առողջապահություն'] },
  ]),

  // === ԻՐԱՎԱԳԻՏՈՒԹՅՈՒՆ ===
  ...generateSubjectBatch('language', [
    { id: 'law', name: 'Իրավունք', icon: '⚖️', desc: 'Պետություն և իրավունք', color: 'from-amber-500 to-yellow-700', tags: ['իրավունք', 'օրենք'] },
    { id: 'international-law', name: 'Միջազգային Իրավունք', icon: '🌍', desc: 'Միջազգային հարաբերություններ', color: 'from-blue-500 to-cyan-700', tags: ['միջազգային', 'դիվանագիտություն'] },
    { id: 'human-rights', name: 'Մարդու Իրավունքներ', icon: '🕊️', desc: 'Մարդու իրավունքների պաշտպանություն', color: 'from-violet-400 to-purple-600', tags: ['իրավունքներ', 'ազատություն'] },
  ]),

  // === ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ ԵՎ ԻՆԺԵՆԵՐԻԱ ===
  ...generateSubjectBatch('advanced', [
    { id: 'architecture', name: 'Ճարտարապետություն', icon: '🏛️', desc: 'Շենքերի դիզայն և կառուցում', color: 'from-stone-500 to-amber-700', tags: ['շենք', 'դիզայն'] },
    { id: 'civil-engineering', name: 'Քաղաքացիական Շինարարություն', icon: '🏗️', desc: 'Կամուրջներ, ճանապարհներ', color: 'from-amber-500 to-orange-700', tags: ['շինարարություն', 'կամուրջ'] },
    { id: 'mechanical-eng', name: 'Մեխանիկական Ինժեներիա', icon: '⚙️', desc: 'Մեքենաներ, մեխանիզմներ', color: 'from-slate-500 to-gray-700', tags: ['մեխանիկա', 'մեքենա'] },
    { id: 'electrical-eng', name: 'Էլեկտրական Ինժեներիա', icon: '⚡', desc: 'Էլեկտրականություն, սխեմաներ', color: 'from-yellow-400 to-amber-600', tags: ['էլեկտրական', 'սխեմա'] },
    { id: 'aerospace', name: 'Ավիացիոն Ինժեներիա', icon: '✈️', desc: 'Ինքնաթիռներ, հրթիռներ', color: 'from-sky-400 to-blue-600', tags: ['ավիացիա', 'տիեզերք'] },
    { id: 'biomedical-eng', name: 'Կենսաբժշկական Ինժեներիա', icon: '🦾', desc: 'Պրոթեզներ, բժշկական սարքեր', color: 'from-teal-400 to-emerald-600', tags: ['պրոթեզ', 'բժշկական'] },
  ]),

  // === ԱՅԼ ՄԱՍՆԱԳԻՏՈՒԹՅՈՒՆՆԵՐ ===
  ...generateSubjectBatch('advanced', [
    { id: 'agriculture', name: 'Ագրոնոմիա', icon: '🌾', desc: 'Երկրագործություն, բույսեր', color: 'from-green-400 to-lime-600', tags: ['գյուղտնտեսություն', 'բույս'] },
    { id: 'cooking', name: 'Խոհարարություն', icon: '👨‍🍳', desc: 'Կերակրի պատրաստման արվեստ', color: 'from-orange-400 to-red-600', tags: ['կերակուր', 'խոհանոց'] },
    { id: 'sports-science', name: 'Սպորտային Գիտություն', icon: '⚽', desc: 'Մարմնամարզություն, ֆիզիկական պատրաստություն', color: 'from-blue-400 to-cyan-600', tags: ['սպորտ', 'ֆիզկուլտուրա'] },
    { id: 'tourism', name: 'Տուրիզմ', icon: '✈️', desc: 'Ճանապարհորդություն և հյուրընկալություն', color: 'from-cyan-400 to-teal-600', tags: ['տուրիզմ', 'ճանապարհորդություն'] },
    { id: 'journalism', name: 'Լրագրություն', icon: '📰', desc: 'Մեդիա, լուրեր, հաղորդակցություն', color: 'from-slate-400 to-gray-600', tags: ['լուր', 'մեդիա'] },
    { id: 'education', name: 'Մանկավարժություն', icon: '👩‍🏫', desc: 'Ուսուցման արվեստ', color: 'from-violet-400 to-purple-600', tags: ['ուսուցում', 'կրթություն'] },
    { id: 'social-work', name: 'Սոցիալական Աշխատանք', icon: '🤝', desc: 'Հասարակական օգնություն', color: 'from-emerald-400 to-green-600', tags: ['սոցիալական', 'օգնություն'] },
    { id: 'logistics', name: 'Լոգիստիկա', icon: '🚚', desc: 'Մատակարարման շղթա', color: 'from-amber-400 to-yellow-600', tags: ['մատակարարում', 'տրանսպորտ'] },
    { id: 'aviation', name: 'Ավիացիա', icon: '🛩️', desc: 'Թռիչքի արվեստ', color: 'from-sky-400 to-indigo-600', tags: ['թռիչք', 'ինքնաթիռ'] },
    { id: 'maritime', name: 'Ծովագնացություն', icon: '🚢', desc: 'Նավագնացության արվեստ', color: 'from-blue-500 to-cyan-700', tags: ['նավ', 'ծով'] },
    { id: 'military-science', name: 'Ռազմական Գիտություն', icon: '🪖', desc: 'Պաշտպանություն և ռազմավարություն', color: 'from-stone-600 to-gray-800', tags: ['բանակ', 'պաշտպանություն'] },
    { id: 'forensic', name: 'Դատական Բժշկություն', icon: '🔬', desc: 'Քրեագիտություն, ապացույցներ', color: 'from-red-500 to-rose-700', tags: ['քրեագիտություն', 'ապացույց'] },
    { id: 'energy', name: 'Էներգետիկա', icon: '🔋', desc: 'Էներգիայի աղբյուրներ', color: 'from-yellow-400 to-amber-600', tags: ['էներգիա', 'էլեկտրական'] },
    { id: 'mining', name: 'Հանքարդյունաբերություն', icon: '⛏️', desc: 'Հանքանյութերի արդյունահանում', color: 'from-stone-500 to-gray-700', tags: ['հանք', 'արդյունահանում'] },
    { id: 'textile', name: 'Տեքստիլ Արտադրություն', icon: '🧵', desc: 'Գործվածքներ, արտադրություն', color: 'from-pink-400 to-rose-600', tags: ['գործվածք', 'տեքստիլ'] },
    { id: 'automotive', name: 'Ավտոմոբիլաշինություն', icon: '🚗', desc: 'Մեքենաների կառուցվածք', color: 'from-red-400 to-rose-600', tags: ['մեքենա', 'ավտո'] },
    { id: 'railway', name: 'Երկաթուղային Տրանսպորտ', icon: '🚂', desc: 'Գնացքներ, երկաթուղի', color: 'from-slate-500 to-gray-700', tags: ['գնացք', 'երկաթուղի'] },
    { id: 'food-science', name: 'Սննդագիտություն', icon: '🥗', desc: 'Սննդի քիմիա և անվտանգություն', color: 'from-green-400 to-emerald-600', tags: ['սնունդ', 'քիմիա'] },
    { id: 'cosmetology', name: 'Կոսմետոլոգիա', icon: '💄', desc: 'Գեղեցկության արվեստ', color: 'from-pink-400 to-fuchsia-600', tags: ['գեղեցկություն', 'խնամք'] },
    { id: 'music-production', name: 'Երաժշտական Պրոդյուսինգ', icon: '🎚️', desc: 'Ձայնագրություն, միքսինգ', color: 'from-purple-400 to-violet-600', tags: ['երաժշտություն', 'ձայնագրություն'] },
    { id: 'writing', name: 'Ստեղծագործական Գրություն', icon: '✍️', desc: 'Գրելու արվեստ', color: 'from-amber-400 to-orange-600', tags: ['գրել', 'ստեղծագործություն'] },
    { id: 'translation', name: 'Թարգմանչություն', icon: '🌐', desc: 'Թարգմանության արվեստ', color: 'from-blue-400 to-cyan-600', tags: ['թարգմանություն', 'լեզու'] },
    { id: 'library-science', name: 'Գրադարանագիտություն', icon: '📚', desc: 'Գրքերի կազմակերպում', color: 'from-stone-400 to-amber-600', tags: ['գրադարան', 'գիրք'] },
    { id: 'archaeology', name: 'Հնագիտություն', icon: '🏺', desc: 'Հնագույն մշակույթներ', color: 'from-amber-500 to-yellow-700', tags: ['հնագիտություն', 'պատմություն'] },
    { id: 'anthropology', name: 'Մարդաբանություն', icon: '🦴', desc: 'Մարդու ծագում և զարգացում', color: 'from-stone-500 to-gray-700', tags: ['մարդ', 'էվոլյուցիա'] },
    { id: 'political-science', name: 'Քաղաքագիտություն', icon: '🏛️', desc: 'Պետություն և քաղաքականություն', color: 'from-indigo-400 to-blue-600', tags: ['քաղաքականություն', 'պետություն'] },
    { id: 'geography-gis', name: 'Աշխարհագրական Ինֆորմացիոն Համակարգեր', icon: '🗺️', desc: 'GIS, քարտեզագրություն', color: 'from-green-400 to-teal-600', tags: ['GIS', 'քարտեզ'] },
    { id: 'environmental-eng', name: 'Էկոլոգիական Ինժեներիա', icon: '🌍', desc: 'Շրջակա միջավայրի պաշտպանություն', color: 'from-emerald-400 to-green-600', tags: ['էկոլոգիա', 'ինժեներիա'] },
    { id: 'nanotechnology', name: 'Նանոտեխնոլոգիա', icon: '🔬', desc: 'Նանոմակարդակի տեխնոլոգիաներ', color: 'from-violet-400 to-purple-600', tags: ['նանո', 'տեխնոլոգիա'] },
    { id: 'biotechnology', name: 'Կենսատեխնոլոգիա', icon: '🧫', desc: 'Կենսաբանական տեխնոլոգիաներ', color: 'from-green-400 to-emerald-600', tags: ['կենսատեխ', 'գենետիկա'] },
    { id: 'quantum-physics', name: 'Քվանտային Ֆիզիկա', icon: '⚛️', desc: 'Քվանտային մեխանիկա', color: 'from-indigo-500 to-purple-700', tags: ['քվանտ', 'ֆիզիկա'] },
    { id: 'nuclear-physics', name: 'Միջուկային Ֆիզիկա', icon: '☢️', desc: 'Միջուկային ռեակցիաներ', color: 'from-yellow-400 to-amber-600', tags: ['միջուկ', 'ատոմ'] },
    { id: 'thermodynamics', name: 'Թերմոդինամիկա', icon: '🌡️', desc: 'Ջերմություն և էներգիա', color: 'from-red-400 to-orange-600', tags: ['ջերմություն', 'էներգիա'] },
    { id: 'optics', name: 'Օպտիկա', icon: '🔍', desc: 'Լույս և տեսողություն', color: 'from-sky-400 to-blue-600', tags: ['լույս', 'ոպտիկա'] },
    { id: 'acoustics', name: 'Ակուստիկա', icon: '🔊', desc: 'Ձայն և ալիքներ', color: 'from-purple-400 to-violet-600', tags: ['ձայն', 'ալիք'] },
    { id: 'materials-science', name: 'Նյութագիտություն', icon: '🧱', desc: 'Նյութերի հատկություններ', color: 'from-slate-400 to-gray-600', tags: ['նյութ', 'հատկություն'] },
    { id: 'cartography', name: 'Քարտեզագրություն', icon: '🗺️', desc: 'Քարտեզների ստեղծում', color: 'from-amber-400 to-orange-600', tags: ['քարտեզ', 'աշխարհագրություն'] },
    { id: 'demography', name: 'Դեմոգրաֆիա', icon: '👥', desc: 'Բնակչության ուսումնասիրություն', color: 'from-blue-400 to-cyan-600', tags: ['բնակչություն', 'վիճակագրություն'] },
    { id: 'criminology', name: 'Քրեաբանություն', icon: '🕵️', desc: 'Հանցագործության ուսումնասիրություն', color: 'from-stone-500 to-gray-700', tags: ['հանցագործություն', 'քրեաբանություն'] },
    { id: 'ethics', name: 'Էթիկա', icon: '🤝', desc: 'Բարոյական փիլիսոփայություն', color: 'from-emerald-400 to-teal-600', tags: ['էթիկա', 'բարոյականություն'] },
    { id: 'logic-phil', name: 'Տրամաբանություն (Փիլիսոփայական)', icon: '🧩', desc: 'Տրամաբանական մտածողություն', color: 'from-violet-400 to-purple-600', tags: ['տրամաբանություն', 'միտք'] },
    { id: 'history-art', name: 'Արվեստի Պատմություն', icon: '🖼️', desc: 'Կերպարվեստի պատմություն', color: 'from-rose-400 to-pink-600', tags: ['արվեստ', 'պատմություն'] },
    { id: 'theater', name: 'Թատերական Արվեստ', icon: '🎭', desc: 'Դերասանական վարպետություն', color: 'from-purple-400 to-fuchsia-600', tags: ['թատրոն', 'դերասան'] },
    { id: 'cinema', name: 'Կինոարվեստ', icon: '🎥', desc: 'Ֆիլմերի ստեղծում', color: 'from-slate-500 to-gray-700', tags: ['կինո', 'ֆիլմ'] },
    { id: 'dance', name: 'Պարարվեստ', icon: '💃', desc: 'Պարի արվեստ', color: 'from-pink-400 to-rose-600', tags: ['պար', 'շարժում'] },
    { id: 'sculpture', name: 'Քանդակագործություն', icon: '🗿', desc: 'Քանդակի արվեստ', color: 'from-stone-400 to-amber-600', tags: ['քանդակ', 'արվեստ'] },
    { id: 'painting', name: 'Գեղանկարչություն', icon: '🎨', desc: 'Նկարչության արվեստ', color: 'from-amber-400 to-orange-600', tags: ['նկար', 'գեղանկար'] },
    { id: 'poetry', name: 'Պոեզիա', icon: '📜', desc: 'Բանաստեղծության արվեստ', color: 'from-violet-400 to-purple-600', tags: ['պոեզիա', 'բանաստեղծություն'] },
    { id: 'screenwriting', name: 'Սցենարի Գրություն', icon: '🎬', desc: 'Ֆիլմի սցենարի արվեստ', color: 'from-indigo-400 to-blue-600', tags: ['սցենար', 'կինո'] },
    { id: 'podcasting', name: 'Պոդկաստինգ', icon: '🎙️', desc: 'Աուդիո բովանդակության ստեղծում', color: 'from-red-400 to-rose-600', tags: ['պոդկաստ', 'աուդիո'] },
    { id: 'streaming', name: 'Սթրիմինգ', icon: '📹', desc: 'Ուղիղ հեռարձակման արվեստ', color: 'from-purple-400 to-violet-600', tags: ['սթրիմ', 'հեռարձակում'] },
    { id: 'e-sports', name: 'Կիբերսպորտ', icon: '🎮', desc: 'Պրոֆեսիոնալ խաղեր', color: 'from-fuchsia-400 to-pink-600', tags: ['խաղ', 'կիբերսպորտ'] },
    { id: 'fitness', name: 'Ֆիթնես', icon: '💪', desc: 'Ֆիզիկական պատրաստվածություն', color: 'from-orange-400 to-red-600', tags: ['ֆիթնես', 'առողջություն'] },
    { id: 'nutrition', name: 'Սննդաբանություն', icon: '🥗', desc: 'Սննդի և առողջության կապը', color: 'from-green-400 to-emerald-600', tags: ['սնունդ', 'առողջություն'] },
    { id: 'yoga', name: 'Յոգա', icon: '🧘', desc: 'Մարմնի և մտքի ներդաշնակություն', color: 'from-teal-400 to-cyan-600', tags: ['յոգա', 'մեդիտացիա'] },
    { id: 'first-aid', name: 'Առաջին Բուժօգնություն', icon: '🚑', desc: 'Արտակարգ իրավիճակների օգնություն', color: 'from-red-500 to-rose-700', tags: ['առաջին օգնություն', 'շտապ'] },
    { id: 'driving', name: 'Վարման Արվեստ', icon: '🚗', desc: 'Անվտանգ վարման կանոններ', color: 'from-blue-400 to-indigo-600', tags: ['վարում', 'անվտանգություն'] },
    { id: 'survival', name: 'Գոյատևման Արվեստ', icon: '🏕️', desc: 'Բնության մեջ գոյատևում', color: 'from-green-500 to-emerald-700', tags: ['գոյատևում', 'բնություն'] },
    { id: 'languages-fr', name: 'Ֆրանսերեն', icon: '🇫🇷', desc: 'Ֆրանսերենի դասեր', color: 'from-blue-400 to-cyan-600', tags: ['ֆրանսերեն', 'լեզու'] },
    { id: 'languages-de', name: 'Գերմաներեն', icon: '🇩🇪', desc: 'Գերմաներենի դասեր', color: 'from-amber-400 to-yellow-600', tags: ['գերմաներեն', 'լեզու'] },
    { id: 'languages-es', name: 'Իսպաներեն', icon: '🇪🇸', desc: 'Իսպաներենի դասեր', color: 'from-red-400 to-yellow-500', tags: ['իսպաներեն', 'լեզու'] },
    { id: 'languages-it', name: 'Իտալերեն', icon: '🇮🇹', desc: 'Իտալերենի դասեր', color: 'from-green-400 to-red-500', tags: ['իտալերեն', 'լեզու'] },
    { id: 'languages-zh', name: 'Չինարեն', icon: '🇨🇳', desc: 'Չինարենի դասեր', color: 'from-red-500 to-rose-700', tags: ['չինարեն', 'լեզու'] },
    { id: 'languages-ja', name: 'Ճապոներեն', icon: '🇯🇵', desc: 'Ճապոներենի դասեր', color: 'from-pink-400 to-rose-600', tags: ['ճապոներեն', 'լեզու'] },
    { id: 'languages-ko', name: 'Կորեերեն', icon: '🇰🇷', desc: 'Կորեերենի դասեր', color: 'from-blue-500 to-indigo-700', tags: ['կորեերեն', 'լեզու'] },
    { id: 'languages-ar', name: 'Արաբերեն', icon: '🇸🇦', desc: 'Արաբերենի դասեր', color: 'from-green-500 to-emerald-700', tags: ['արաբերեն', 'լեզու'] },
    { id: 'languages-ru', name: 'Ռուսերեն', icon: '🇷🇺', desc: 'Ռուսերենի դասեր', color: 'from-red-500 to-rose-700', tags: ['ռուսերեն', 'լեզու'] },
    { id: 'languages-pt', name: 'Պորտուգալերեն', icon: '🇵🇹', desc: 'Պորտուգալերենի դասեր', color: 'from-green-500 to-red-600', tags: ['պորտուգալերեն', 'լեզու'] },
    { id: 'languages-tr', name: 'Թուրքերեն', icon: '🇹🇷', desc: 'Թուրքերենի դասեր', color: 'from-red-400 to-rose-600', tags: ['թուրքերեն', 'լեզու'] },
    { id: 'languages-hi', name: 'Հինդի', icon: '🇮🇳', desc: 'Հինդիի դասեր', color: 'from-orange-400 to-amber-600', tags: ['հինդի', 'լեզու'] },
    { id: 'sign-language', name: 'Ժեստերի Լեզու', icon: '🤟', desc: 'Խուլերի լեզու', color: 'from-violet-400 to-purple-600', tags: ['ժեստ', 'խուլ'] },
    { id: 'esperanto', name: 'Էսպերանտո', icon: '🌐', desc: 'Միջազգային լեզու', color: 'from-green-400 to-teal-600', tags: ['էսպերանտո', 'միջազգային'] },
    { id: 'data-science', name: 'Տվյալների Գիտություն', icon: '📊', desc: 'Big Data, ML, AI', color: 'from-indigo-400 to-purple-600', tags: ['data', 'ML'] },
    { id: 'big-data', name: 'Մեծ Տվյալներ', icon: '💾', desc: 'Hadoop, Spark, բիգ դատա', color: 'from-amber-400 to-orange-600', tags: ['big data', 'Hadoop'] },
    { id: 'iot', name: 'IoT - Ինտերնետ իրերի համար', icon: '📡', desc: 'Սմարթ սարքեր, կապակցվածություն', color: 'from-cyan-400 to-blue-600', tags: ['IoT', 'սմարթ'] },
    { id: 'ar-vr', name: 'AR/VR - Ընդլայնված իրականություն', icon: '🥽', desc: 'Virtual և Augmented Reality', color: 'from-violet-400 to-fuchsia-600', tags: ['VR', 'AR'] },
    { id: 'quantum-computing', name: 'Քվանտային Հաշվարկներ', icon: '⚛️', desc: 'Քվանտային համակարգիչներ', color: 'from-indigo-500 to-purple-700', tags: ['քվանտ', 'հաշվարկ'] },
    { id: 'ethical-hacking', name: 'Էթիկական Հաքինգ', icon: '🛡️', desc: 'Թափանցելիության թեստավորում', color: 'from-red-500 to-rose-700', tags: ['հաքինգ', 'pentest'] },
    { id: 'malware-analysis', name: 'Վնասակար Ծրագրերի Վերլուծություն', icon: '🦠', desc: 'Վիրուսների ուսումնասիրություն', color: 'from-green-500 to-emerald-700', tags: ['վիրուս', 'մալվեր'] },
    { id: 'digital-forensics', name: 'Թվային Դատական Փորձաքննություն', icon: '🔍', desc: 'Թվային ապացույցներ', color: 'from-slate-500 to-gray-700', tags: ['forensics', 'ապացույց'] },
    { id: 'smart-contracts', name: 'Սմարթ Պայմանագրեր', icon: '📜', desc: 'Ethereum, Solidity', color: 'from-amber-400 to-yellow-600', tags: ['Ethereum', 'Solidity'] },
    { id: 'nft', name: 'NFT և Թվային Արվեստ', icon: '🎨', desc: 'Չհատուցվող նշաններ', color: 'from-fuchsia-400 to-pink-600', tags: ['NFT', 'crypto'] },
    { id: 'agile-scrum', name: 'Agile և Scrum', icon: '🔄', desc: 'Ճարտարապետական մեթոդաբանություն', color: 'from-blue-400 to-indigo-600', tags: ['Agile', 'Scrum'] },
    { id: 'ux-research', name: 'UX Հետազոտություն', icon: '🔬', desc: 'Օգտատիրական հետազոտություն', color: 'from-violet-400 to-purple-600', tags: ['UX', 'հետազոտություն'] },
    { id: 'seo', name: 'SEO և Որոնման Օպտիմիզացիա', icon: '🔎', desc: 'Որոնման համակարգերի օպտիմիզացիա', color: 'from-green-400 to-emerald-600', tags: ['SEO', 'որոնում'] },
    { id: 'content-mktg', name: 'Բովանդակության Մարքեթինգ', icon: '📝', desc: 'Բովանդակության ստեղծում', color: 'from-pink-400 to-rose-600', tags: ['բովանդակություն', 'մարքեթինգ'] },
    { id: 'email-mktg', name: 'Էլ. փոստի Մարքեթինգ', icon: '📧', desc: 'Էլ. փոստով մարքեթինգ', color: 'from-amber-400 to-orange-600', tags: ['email', 'մարքեթինգ'] },
    { id: 'social-media', name: 'Սոցիալական Մեդիա', icon: '📱', desc: 'Սոցցանցերի մարքեթինգ', color: 'from-blue-400 to-cyan-600', tags: ['սոցմեդիա', 'մարքեթինգ'] },
    { id: 'influencer-mktg', name: 'Ինֆլյուենսեր Մարքեթինգ', icon: '⭐', desc: 'Ազդեցիկ անձանց մարքեթինգ', color: 'from-purple-400 to-violet-600', tags: ['ինֆլյուենսեր', 'մարքեթինգ'] },
    { id: 'e-commerce', name: 'Էլեկտրոնային Առևտուր', icon: '🛒', desc: 'Օնլայն խանութներ', color: 'from-emerald-400 to-green-600', tags: ['էլ. առևտուր', 'օնլայն'] },
    { id: 'dropshipping', name: 'Դրոփշիփինգ', icon: '📦', desc: 'Առանց պահեստի առևտուր', color: 'from-orange-400 to-red-600', tags: ['dropship', 'առևտուր'] },
    { id: 'freelancing', name: 'Ֆրիլանսինգ', icon: '💻', desc: 'Ազատ աշխատանք', color: 'from-teal-400 to-cyan-600', tags: ['ֆրիլանս', 'աշխատանք'] },
    { id: 'remote-work', name: 'Հեռավար Աշխատանք', icon: '🏠', desc: 'Տնից աշխատանք', color: 'from-indigo-400 to-blue-600', tags: ['հեռավար', 'աշխատանք'] },
    { id: 'time-mgmt', name: 'Ժամանակի Կառավարում', icon: '⏰', desc: 'Արդյունավետության արվեստ', color: 'from-amber-400 to-yellow-600', tags: ['ժամանակ', 'արդյունավետություն'] },
    { id: 'public-speaking', name: 'Հանրային Ելույթ', icon: '🎤', desc: 'Խոսքի արվեստ', color: 'from-rose-400 to-pink-600', tags: ['ելույթ', 'խոսք'] },
    { id: 'negotiation', name: 'Բանակցությունների Արվեստ', icon: '🤝', desc: 'Բանակցելու հմտություններ', color: 'from-slate-500 to-gray-700', tags: ['բանակցություն', 'հմտություն'] },
    { id: 'leadership', name: 'Առաջնորդություն', icon: '👑', desc: 'Ղեկավարման արվեստ', color: 'from-amber-500 to-yellow-700', tags: ['առաջնորդ', 'ղեկավարում'] },
    { id: 'teamwork', name: 'Թիմային Աշխատանք', icon: '👥', desc: 'Թիմում աշխատելու արվեստ', color: 'from-blue-400 to-cyan-600', tags: ['թիմ', 'համագործակցություն'] },
    { id: 'critical-thinking', name: 'Քննական Մտածողություն', icon: '🧠', desc: 'Քննադատաբար մտածելու արվեստ', color: 'from-violet-400 to-purple-600', tags: ['քննադատական', 'միտք'] },
    { id: 'problem-solving', name: 'Խնդիրների Լուծում', icon: '🧩', desc: 'Խնդիրներ լուծելու արվեստ', color: 'from-green-400 to-emerald-600', tags: ['խնդիր', 'լուծում'] },
    { id: 'creativity', name: 'Ստեղծագործականություն', icon: '💡', desc: 'Ստեղծարար մտածողություն', color: 'from-yellow-400 to-amber-600', tags: ['ստեղծագործություն', 'ինովացիա'] },
    { id: 'mindfulness', name: 'Մինդֆուլնես', icon: '🧘', desc: 'Գիտակցված ներկայություն', color: 'from-teal-400 to-emerald-600', tags: ['մինդֆուլնես', 'մեդիտացիա'] },
    { id: 'stress-mgmt', name: 'Սթրեսի Կառավարում', icon: '😌', desc: 'Սթրեսի հաղթահարում', color: 'from-green-400 to-teal-600', tags: ['սթրես', 'առողջություն'] },
    { id: 'sleep-science', name: 'Քնի Գիտություն', icon: '😴', desc: 'Առողջ քնի արվեստ', color: 'from-indigo-400 to-purple-600', tags: ['քուն', 'առողջություն'] },
    { id: 'habits', name: 'Սովորույթների Գիտություն', icon: '🔄', desc: 'Լավ սովորույթների ձևավորում', color: 'from-blue-400 to-indigo-600', tags: ['սովորույթ', 'զարգացում'] },
    { id: 'goal-setting', name: 'Նպատակադրման Արվեստ', icon: '🎯', desc: 'Նպատակների սահմանում և հասնել', color: 'from-red-400 to-rose-600', tags: ['նպատակ', 'հաջողություն'] },
    { id: 'productivity', name: 'Արդյունավետություն', icon: '⚡', desc: 'Ավելին անել քիչ ժամանակում', color: 'from-amber-400 to-orange-600', tags: ['արդյունավետություն', 'ժամանակ'] },
    { id: 'memory-training', name: 'Հիշողության Մարզում', icon: '🧠', desc: 'Հիշողության բարելավում', color: 'from-purple-400 to-violet-600', tags: ['հիշողություն', 'մարզում'] },
    { id: 'speed-reading', name: 'Արագ Կարդալու Արվեստ', icon: '📖', desc: 'Արագ ընթերցման տեխնիկա', color: 'from-cyan-400 to-blue-600', tags: ['կարդալ', 'արագ'] },
    { id: 'mental-math', name: 'Մտավոր Հաշվարկ', icon: '🔢', desc: 'Արագ մաթեմատիկայի արվեստ', color: 'from-violet-400 to-purple-600', tags: ['հաշվարկ', 'արագ'] },
    { id: 'chess', name: 'Շախմատ', icon: '♟️', desc: 'Շախմատի արվեստ', color: 'from-stone-500 to-gray-700', tags: ['շախմատ', 'տրամաբանություն'] },
    { id: 'puzzles', name: 'Տրամաբանական Խնդիրներ', icon: '🧩', desc: 'Տրամաբանության խնդիրներ', color: 'from-pink-400 to-rose-600', tags: ['տրամաբանություն', 'խնդիր'] },
    { id: 'riddles', name: 'Հանելուկներ', icon: '❓', desc: 'Հանելուկների աշխարհ', color: 'from-amber-400 to-yellow-600', tags: ['հանելուկ', 'միտք'] },
    { id: 'brain-teasers', name: 'Ուղեղի մարզում', icon: '🧠', desc: 'Ուղեղի զարգացման խաղեր', color: 'from-indigo-400 to-purple-600', tags: ['ուղեղ', 'մարզում'] },
  ]),
]

export function getSubject(id: string): Subject | undefined {
  return subjects.find(s => s.id === id)
}

export function getLesson(subjectId: string, lessonId: string) {
  const subject = getSubject(subjectId)
  return subject?.lessons.find(l => l.id === lessonId)
}

export function getAllLessons() {
  return subjects.flatMap(s => s.lessons)
}

export function searchLessons(query: string) {
  const lowerQuery = query.toLowerCase()
  return subjects.flatMap(s =>
    s.lessons
      .filter(l =>
        l.title.toLowerCase().includes(lowerQuery) ||
        l.subtitle?.toLowerCase().includes(lowerQuery) ||
        l.tags?.some(t => t.toLowerCase().includes(lowerQuery))
      )
      .map(l => ({ ...l, subject: s }))
  )
}
