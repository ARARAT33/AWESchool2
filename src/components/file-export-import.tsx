'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import {
  Download, Upload, FileJson, Check, AlertCircle, FileDown, FileUp, Shield
} from 'lucide-react'
import { useProgressStore } from '@/lib/store/progress'
import { useTranslation } from '@/hooks/use-translation'
import { createSignedExportData, importSignedData } from '@/lib/data-migration'
import { toast } from 'sonner'

interface FileExportImportProps {
  variant?: 'buttons' | 'dropdown'
}

export function FileExportImport({ variant = 'buttons' }: FileExportImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const { userName, shareCode } = useProgressStore()
  const { t } = useTranslation()

  const handleExport = () => {
    const data = createSignedExportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const date = new Date().toISOString().split('T')[0]
    link.download = `AWESchool-${userName || 'user'}-${shareCode || 'data'}-${date}.json`
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
    toast.success(t('file.exported'))
    setOpen(false)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const result = importSignedData(content)

        if (result.success) {
          toast.success(t('file.imported'))
          setOpen(false)
          setTimeout(() => window.location.reload(), 1000)
        } else {
          toast.error(result.error || t('file.invalid'))
        }
      } catch {
        toast.error(t('file.read_error'))
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  if (variant === 'buttons') {
    return (
      <>
        <div className="flex gap-1 md:gap-2">
          <Button
            onClick={handleExport}
            size="sm"
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold"
          >
            <FileDown className="w-3 h-3 md:w-4 md:h-4" />
            <span className="ml-1 text-xs md:text-sm">EXPORT</span>
          </Button>
          <Button
            onClick={handleImportClick}
            size="sm"
            variant="outline"
            className="border-violet-300 hover:bg-violet-50 font-bold"
          >
            <FileUp className="w-3 h-3 md:w-4 md:h-4" />
            <span className="ml-1 text-xs md:text-sm">IMPORT</span>
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
        />
      </>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FileJson className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            {t('file.export_title')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Button onClick={handleExport} className="w-full" size="lg">
              <Download className="w-5 h-5 mr-2" />
              {t('export')} — JSON
            </Button>
            <p className="text-xs text-gray-500 text-center">
              {t('file.export_desc')}
            </p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <Button onClick={handleImportClick} variant="outline" className="w-full" size="lg">
              <Upload className="w-5 h-5 mr-2" />
              {t('import')} — JSON
            </Button>
            <p className="text-xs text-gray-500 text-center">
              {t('file.import_desc')}
            </p>
          </div>

          <div className="p-3 bg-violet-50 border border-violet-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-violet-800">
                {t('file.protected')}
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                {t('file.warning')}
              </div>
            </div>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  )
}
