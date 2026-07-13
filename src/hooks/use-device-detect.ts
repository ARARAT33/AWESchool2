'use client'

import { useState, useEffect } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
  isPortrait: boolean
  isLandscape: boolean
  width: number
  height: number
  os: 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'other'
  browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'other'
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    isPortrait: false,
    isLandscape: true,
    width: 1200,
    height: 800,
    os: 'other',
    browser: 'other',
  })

  useEffect(() => {
    const detect = () => {
      if (typeof window === 'undefined') return

      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = navigator.userAgent.toLowerCase()

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isPortrait = height > width
      const isLandscape = width > height

      // OS հայտնաբերում
      let os: DeviceInfo['os'] = 'other'
      if (/iphone|ipad|ipod/.test(userAgent)) os = 'ios'
      else if (/android/.test(userAgent)) os = 'android'
      else if (/windows/.test(userAgent)) os = 'windows'
      else if (/mac/.test(userAgent)) os = 'mac'
      else if (/linux/.test(userAgent)) os = 'linux'

      // Browser հայտնաբերում
      let browser: DeviceInfo['browser'] = 'other'
      if (/edg/.test(userAgent)) browser = 'edge'
      else if (/chrome/.test(userAgent)) browser = 'chrome'
      else if (/firefox/.test(userAgent)) browser = 'firefox'
      else if (/safari/.test(userAgent)) browser = 'safari'
      else if (/opera/.test(userAgent)) browser = 'opera'

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouch,
        isPortrait,
        isLandscape,
        width,
        height,
        os,
        browser,
      })
    }

    detect()
    window.addEventListener('resize', detect)
    window.addEventListener('orientationchange', detect)

    return () => {
      window.removeEventListener('resize', detect)
      window.removeEventListener('orientationchange', detect)
    }
  }, [])

  return deviceInfo
}

// Սարքի տեսակի համար դասակարգիչ
export function getDeviceType(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Ստուգիր՝ արդյոք սարքը շարժական է
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768 ||
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent)
}
