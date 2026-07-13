'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  QrCode, Download, Upload, Copy, Check, Share2, Link2,
  ClipboardPaste, AlertCircle, User, Clock, Award, BookOpen, Star
} from 'lucide-react'
import QRCode from 'qrcode'
import {
  createExportData, createImportUrl, getQrCodeUrl,
  importDataToStore, isValidExportData, decodeData,
  generateUserId, generateShareCode, createPermanentShareUrl
} from '@/lib/data-migration'
import { useProgressStore } from '@/lib/store/progress'
import { toast } from 'sonner'

interface DataMigrationProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DataMigration({ trigger, open, onOpenChange }: DataMigrationProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open !== undefined ? open : internalOpen
  const setOpen = onOpenChange || setInternalOpen

  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [importCode, setImportCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('export')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {
    userName, avatar, userId, shareCode, createdAt,
    totalPoints, achievements, completedLessons, streak,
    setUserId, setShareCode,
  } = useProgressStore()

  // Ապահովել userId-ն և shareCode-ը գոյություն ունեն
  useEffect(() => {
    if (!userId) {
      setUserId(generateUserId())
    }
    if (!shareCode) {
      setShareCode(generateShareCode())
    }
  }, [userId, shareCode, setUserId, setShareCode])

  // Ստեղծել QR կոդը - մշտական պրոֆիլի հղումը
  useEffect(() => {
    if (isOpen && activeTab === 'export' && shareCode) {
      // Օգտագործել մշտական պրոֆիլի URL (?u=CODE) - միշտ նույնը
      const permanentUrl = createPermanentShareUrl(shareCode)

      // Ստեղծել QR կոդ canvas-ի վրա
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, permanentUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#7c3aed',
            light: '#ffffff',
          },
        }, (err) => {
          if (err) console.error('QR ստեղծման սխալ:', err)
        })
      }

      // Նաև պահպանել որպես data URL (ներբեռնման համար)
      QRCode.toDataURL(permanentUrl, {
        width: 500,
        margin: 2,
        color: {
          dark: '#7c3aed',
          light: '#ffffff',
        },
      }).then(url => setQrDataUrl(url))
        .catch(err => console.error('QR data URL սխալ:', err))
    }
  }, [isOpen, activeTab, shareCode])

  const handleCopyCode = async () => {
    const exportData = createExportData()
    try {
      await navigator.clipboard.writeText(exportData)
      setCopied(true)
      toast.success('Կոդը պատճենվեց!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Չհաջողվեց պատճենել')
    }
  }

  const handleDownloadQR = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.download = `qr-${userName || 'user'}-${shareCode}.png`
    link.href = qrDataUrl
    link.click()
    toast.success('QR կոդը ներբեռնվեց!')
  }

  const handleShareLink = async () => {
    const exportData = createExportData()
    const url = createImportUrl(exportData)
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Իմ ուսումնական տվյալները',
          text: `Բարի գալուստ ${userName}ի ուսումնական էջ`,
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Հղումը պատճենվեց!')
      }
    } catch (err) {
      // User cancelled
    }
  }

  const handleImport = () => {
    if (!importCode.trim()) {
      toast.error('Մուտքագրեք կոդը')
      return
    }

    const trimmed = importCode.trim()
    let success = false

    // Ստուգել՝ արդյոք URL է
    if (trimmed.includes('?import=')) {
      const url = new URL(trimmed)
      const data = url.searchParams.get('import')
      if (data) {
        success = importDataToStore(data)
      }
    } else {
      // Ուղղակի կոդ
      success = importDataToStore(trimmed)
    }

    if (success) {
      toast.success('Տվյալները հաջող ներմուծվեցի!')
      setOpen(false)
      // Էջը թարմացնել
      setTimeout(() => window.location.reload(), 1000)
    } else {
      toast.error('Սխալ կոդ: Ստուգեք և կրկին փորձեք:')
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setImportCode(text)
      toast.success('Տեքստը տեղադրվեց')
    } catch (err) {
      toast.error('Չհաջողվեց կարդալ clipboard-ից')
    }
  }

  // Վիճակագրության ամփոփում
  const completedCount = Object.keys(completedLessons).filter(
    id => completedLessons[id] >= 60
  ).length

  const exportData = createExportData()
  const importUrl = createImportUrl(exportData)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Կիսվել տվյալներով
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Տվյալների փոխանցում
          </DialogTitle>
        </DialogHeader>

        {/* Օգտատիրոջ ինֆո */}
        <Card className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{avatar || '🎓'}</div>
            <div className="flex-1">
              <div className="font-bold text-lg text-gray-800">{userName || 'Օգտատեր'}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  ID: {userId || '...'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Կոդ: {shareCode || '...'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Վիճակագրություն */}
          <div className="grid grid-cols-4 gap-2 mt-3 text-center">
            <div className="bg-white/60 rounded p-2">
              <div className="text-lg font-bold text-violet-600">{completedCount}</div>
              <div className="text-xs text-gray-600">Դասեր</div>
            </div>
            <div className="bg-white/60 rounded p-2">
              <div className="text-lg font-bold text-amber-600">{streak}</div>
              <div className="text-xs text-gray-600">Օրեր</div>
            </div>
            <div className="bg-white/60 rounded p-2">
              <div className="text-lg font-bold text-pink-600">{totalPoints}</div>
              <div className="text-xs text-gray-600">Միավոր</div>
            </div>
            <div className="bg-white/60 rounded p-2">
              <div className="text-lg font-bold text-green-600">{achievements.length}</div>
              <div className="text-xs text-gray-600">Նվաճում</div>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">
              <Upload className="w-4 h-4 mr-1" />
              Փոխանցել
            </TabsTrigger>
            <TabsTrigger value="import">
              <Download className="w-4 h-4 mr-1" />
              Ստանալ
            </TabsTrigger>
          </TabsList>

          {/* Փոխանցել */}
          <TabsContent value="export" className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Սկանավորեք QR կոդը մեկ այլ սարքով
              </p>
              <p className="text-xs text-violet-600 mb-4 font-medium">
                ✨ Այս QR-ը մշտական է — միշտ նույնը ձեր համար
              </p>

              {/* QR կոդ */}
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border-2 border-violet-200">
                  <canvas ref={canvasRef} className="max-w-full" />
                </div>
              </div>

              {/* QR ներբեռնման կոճակ */}
              <Button onClick={handleDownloadQR} variant="outline" size="sm" className="mb-4">
                <Download className="w-4 h-4 mr-1" />
                Ներբեռնել QR
              </Button>

              {/* Մշտական պրոֆիլի հղում */}
              <div className="space-y-2 mb-4">
                <Label className="text-xs text-violet-600 font-medium">
                  🔗 Մշտական պրոֆիլի հղում
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={typeof window !== 'undefined' ? createPermanentShareUrl(shareCode) : `?u=${shareCode}`}
                    readOnly
                    className="font-mono text-xs"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(createPermanentShareUrl(shareCode))
                        toast.success('Հղումը պատճենվեց!')
                      } catch {
                        toast.error('Չհաջողվեց պատճենել')
                      }
                    }}
                    size="sm"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Այս հղումով բացելիս՝ տեսնում եք ձեր պրոֆիլն ու վիճակագրությունը
                </p>
              </div>

              {/* Ամբողջական տվյալների կոդ (ներմուծման համար) */}
              <div className="space-y-2">
                <Label className="text-xs text-gray-500">
                  Ամբողջական տվյալների կոդ ({exportData.length} նիշ)
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={exportData}
                    readOnly
                    className="font-mono text-xs"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button onClick={handleCopyCode} size="sm">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Կիսման կոճակներ */}
              <div className="flex gap-2 mt-4 justify-center flex-wrap">
                <Button onClick={handleShareLink} variant="outline" size="sm">
                  <Link2 className="w-4 h-4 mr-1" />
                  Կիսվել հղմամբ
                </Button>
              </div>

              {/* Հրահանգներ */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-left">
                <div className="text-sm font-medium text-blue-800 mb-1">📋 Հրահանգներ</div>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Սկանավորեք QR կոդը մեկ այլ սարքի տեսախցիկով</li>
                  <li>Կամ պատճենեք կոդը և ուղարկեք մեկ այլ սարքի</li>
                  <li>Մյուս սարքում բացեք ստացված հղումը</li>
                  <li>Կամ տեղադրեք կոդը «Ստանալ» բաժնում</li>
                </ol>
              </div>
            </div>
          </TabsContent>

          {/* Ստանալ */}
          <TabsContent value="import" className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                Տեղադրեք ստացված կոդը կամ հղումը
              </p>
            </div>

            <div className="space-y-2">
              <Label>Կոդ կամ հղում</Label>
              <div className="flex gap-2">
                <Input
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  placeholder="Տեղադրեք կոդը այստեղ..."
                  className="font-mono text-xs"
                />
                <Button onClick={handlePaste} variant="outline" size="sm">
                  <ClipboardPaste className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleImport}
              className="w-full bg-violet-600 hover:bg-violet-700"
              disabled={!importCode.trim()}
            >
              <Download className="w-4 h-4 mr-2" />
              Ներմուծել տվյալները
            </Button>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800">
                  <strong>Ուշադրություն:</strong> Ներմուծումը կփոխարինի ընթացիկ տվյալները:
                  Եթե այս սարքում արդեն ունեք առաջընթաց, այն կկորի:
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Մշտական կոդի ինֆո */}
        <div className="p-3 bg-violet-50 border border-violet-200 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-violet-700">
            <User className="w-4 h-4" />
            <span>Ձեր մշտական կոդը: <strong>{shareCode}</strong> — այս կոդը չի փոխվում</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Բեռնման էկրան (երբ նոր սարքից են մտնում)
interface WelcomeMigrationProps {
  onNewUser: () => void
  onImport: (code: string) => void
}

export function WelcomeMigration({ onNewUser, onImport }: WelcomeMigrationProps) {
  const [showImport, setShowImport] = useState(false)
  const [importCode, setImportCode] = useState('')

  const handleImport = () => {
    if (!importCode.trim()) return
    onImport(importCode.trim())
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setImportCode(text)
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-100 via-purple-50 to-pink-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-7xl mb-4">🎓</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Գիտելիքի Աշխարհ
          </h1>
          <p className="text-gray-600 text-sm">
            Կրթական խաղ երեխաների համար
          </p>
        </div>

        {!showImport ? (
          <Card className="p-6">
            <h2 className="text-lg font-bold text-center mb-4">Բարի գալուստ!</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Ընտրեք՝ նոր գրանցում սկսել, թե վերականգնել ձեր տվյալները այլ սարքից
            </p>

            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                onClick={onNewUser}
              >
                <User className="w-5 h-5 mr-2" />
                Նոր գրանցում
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => setShowImport(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Վերականգնել տվյալները
              </Button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              💡 Եթե արդեն ունեք առաջընթաց այլ սարքում, սկանավորեք ձեր QR կոդը կամ տեղադրեք ձեր կոդը այստեղ
            </div>
          </Card>
        ) : (
          <Card className="p-6">
            <h2 className="text-lg font-bold text-center mb-4">Վերականգնել տվյալները</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              Տեղադրեք ձեր կոդը կամ հղումը
            </p>

            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={importCode}
                  onChange={(e) => setImportCode(e.target.value)}
                  placeholder="Տեղադրեք կոդը կամ հղումը..."
                  className="font-mono text-xs"
                  autoFocus
                />
                <Button onClick={handlePaste} variant="outline" size="sm">
                  <ClipboardPaste className="w-4 h-4" />
                </Button>
              </div>

              <Button
                onClick={handleImport}
                className="w-full bg-violet-600 hover:bg-violet-700"
                disabled={!importCode.trim()}
              >
                <Download className="w-4 h-4 mr-2" />
                Վերականգնել
              </Button>

              <Button
                onClick={() => setShowImport(false)}
                variant="ghost"
                className="w-full"
              >
                ← Հետ
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
