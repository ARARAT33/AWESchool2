// Տվյալների կոդավորման և ապակոդավորման մոդուլ
// Թույլ է տալիս փոխանցել օգտատիրոջ տվյալները սարքերի միջև QR կոդով կամ կոդով

import { useProgressStore } from '@/lib/store/progress'

// Մշտական օգտատիրոջ ID ստեղծել (միայն մեկ անգամ)
export function generateUserId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let id = ''
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)]
  }
  return id
}

// Կարճ կոդ ստեղծել (6 նիշ) հեշտ կիսման համար
export function generateShareCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// Տվյալների կոդավորում base64-ով (URL-ի համար անվտանգ)
export function encodeData(data: any): string {
  try {
    const json = JSON.stringify(data)
    const encoded = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    ))
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch (e) {
    console.error('Կոդավորման սխալ:', e)
    return ''
  }
}

// Տվյալների ապակոդավորում
export function decodeData(encoded: string): any | null {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4) base64 += '='

    const decoded = decodeURIComponent(
      atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    )

    return JSON.parse(decoded)
  } catch (e) {
    console.error('Ապակոդավորման սխալ:', e)
    return null
  }
}

// Արտահանման տվյալների ստեղծում
export function createExportData(): string {
  const store = useProgressStore.getState()
  const data = {
    userId: store.userId,
    shareCode: store.shareCode,
    userName: store.userName,
    avatar: store.avatar,
    completedLessons: store.completedLessons,
    currentLesson: store.currentLesson,
    totalPoints: store.totalPoints,
    achievements: store.achievements,
    streak: store.streak,
    lastActiveDate: store.lastActiveDate,
    favoriteLessons: store.favoriteLessons,
    bookmarks: store.bookmarks,
    hintsUsed: store.hintsUsed,
    timeSpent: store.timeSpent,
    totalStudyTime: store.totalStudyTime,
    fontSize: store.fontSize,
    theme: store.theme,
    dailyGoal: store.dailyGoal,
    dailyProgress: store.dailyProgress,
    lastGoalDate: store.lastGoalDate,
    recentlyViewed: store.recentlyViewed,
    exportedAt: new Date().toISOString(),
    version: '4.0',
  }
  return encodeData(data)
}

// Ներմուծման URL ստեղծել (ամբողջական տվյալներով)
export function createImportUrl(data: string): string {
  if (typeof window === 'undefined') return ''
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?import=${data}`
}

// Հասարակական պրոֆիլի URL ստեղծել (?u=SHARECODE)
export function createProfileUrl(shareCode: string): string {
  if (typeof window === 'undefined') return ''
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?u=${shareCode}`
}

// URL-ից ներմուծման տվյալներ կարդալ
export function readImportFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('import')
}

// URL-ից հասարակական պրոֆիլի կոդը կարդալ (?u=CODE)
export function readProfileCodeFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get('u')
}

// Տվյալների ներմուծում store-ի մեջ
export function importDataToStore(encoded: string): boolean {
  const data = decodeData(encoded)
  if (!data) return false
  return useProgressStore.getState().importData(JSON.stringify(data))
}

// QR կոդի պատկերի URL ստեղծել
export function getQrCodeUrl(data: string, size = 300): string {
  const url = createImportUrl(data)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=7c3aed&qzone=2`
}

// Ստուգել՝ արդյոք տվյալները վավեր են
export function isValidExportData(encoded: string): boolean {
  const data = decodeData(encoded)
  return data !== null && typeof data === 'object' && data.version
}

// === EXPORT ՖԱՅԼԻ ԿԵՂԾՄԱՆ ՊԱՇՏՊԱՆՈՒԹՅՈՒՆ ===
// AWESchool-ի գաղտնի բանալիով ստորագրություն
const AWESCHOOL_SECRET = 'AWESchool_v4_SecretKey_2024_hy_AM_Educational_Platform'

// Պարզ hash ֆունկցիա (djb2 algorithm)
function hashString(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash = hash & hash // 32-bit integer
  }
  // Convert to hex
  return (hash >>> 0).toString(16).padStart(8, '0')
}

// Ստորագրություն ստեղծել
function createSignature(data: any): string {
  const json = JSON.stringify(data)
  const withSecret = json + AWESCHOOL_SECRET
  return hashString(withSecret) + hashString(withSecret.split('').reverse().join(''))
}

// Ստորագրված export տվյալներ ստեղծել (ֆայլի համար)
export function createSignedExportData(): string {
  const store = useProgressStore.getState()
  const data = {
    userId: store.userId,
    shareCode: store.shareCode,
    createdAt: store.createdAt,
    userName: store.userName,
    avatar: store.avatar,
    completedLessons: store.completedLessons,
    currentLesson: store.currentLesson,
    totalPoints: store.totalPoints,
    achievements: store.achievements,
    streak: store.streak,
    lastActiveDate: store.lastActiveDate,
    favoriteLessons: store.favoriteLessons,
    bookmarks: store.bookmarks,
    hintsUsed: store.hintsUsed,
    timeSpent: store.timeSpent,
    totalStudyTime: store.totalStudyTime,
    fontSize: store.fontSize,
    theme: store.theme,
    dailyGoal: store.dailyGoal,
    dailyProgress: store.dailyProgress,
    lastGoalDate: store.lastGoalDate,
    recentlyViewed: store.recentlyViewed,
    language: store.language,
    learningMode: store.learningMode,
    exportedAt: new Date().toISOString(),
    version: '4.0',
    platform: 'AWESchool',
  }

  const signature = createSignature(data)
  const signedData = { ...data, signature, _platform: 'AWESchool' }
  return JSON.stringify(signedData, null, 2)
}

// Ստուգել ստորագրությունը և ներմուծել
export function importSignedData(jsonString: string): { success: boolean; error?: string } {
  try {
    const data = JSON.parse(jsonString)

    // Ստուգել պլատֆորմը
    if (data._platform !== 'AWESchool' && data.platform !== 'AWESchool') {
      return { success: false, error: 'Ֆայլը չի պատկանում AWESchool պլատֆորմին' }
    }

    // Ստուգել ստորագրության առկայությունը
    if (!data.signature) {
      return { success: false, error: 'Ֆայլը չունի ստորագրություն - հնարավոր կեղծիք' }
    }

    // Վերցնել ստորագրությունը
    const providedSignature = data.signature

    // Ստեղծել ստորագրության ստուգման օբյեկտ (առանց signature և _platform)
    const { signature, _platform, ...dataWithoutSignature } = data

    // Ստուգել ստորագրությունը
    const expectedSignature = createSignature(dataWithoutSignature)
    if (providedSignature !== expectedSignature) {
      return { success: false, error: 'Ստորագրությունը սխալ է - ֆայլը կեղծված է' }
    }

    // Ներմուծել տվյալները
    const success = useProgressStore.getState().importData(JSON.stringify(data))
    if (success) {
      return { success: true }
    } else {
      return { success: false, error: 'Տվյալների ներմուծման սխալ' }
    }
  } catch (e) {
    return { success: false, error: 'Ֆայլի կարդալու սխալ: Հնարավոր է ֆայլը վնասված է' }
  }
}

// Մշտական կիսման կոդով URL (ավելի կարճ ու հեշտ հիշելի)
// Այս URL-ը միշտ նույնն է նույն օգտատիրոջ համար
export function createPermanentShareUrl(shareCode: string): string {
  return createProfileUrl(shareCode)
}

