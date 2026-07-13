import { useState } from "react";
import { useProgressStore } from "@/lib/store/progress";
import { useTranslation, Translate } from "@/hooks/use-translation";
import { Download, Upload, Copy, Check, ShieldAlert, ShieldCheck } from "lucide-react";

export function FileExportImport() {
  const { exportProgress, importProgress } = useProgressStore();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: ""
  });

  const handleCopy = () => {
    try {
      const code = exportProgress();
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleImport = () => {
    setImportStatus({ type: null, msg: "" });
    if (!importCode.trim()) return;

    const res = importProgress(importCode.trim());
    if (res.success) {
      setImportStatus({
        type: "success",
        msg: t("import_success")
      });
      setImportCode("");
    } else {
      setImportStatus({
        type: "error",
        msg: res.error || t("import_error")
      });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto py-4">
      {/* Export Box */}
      <div id="export-card" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg">
              <Translate text="Արտահանել Տվյալները" />
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            <Translate text="Պատճենեք այս պաշտպանված կոդը ձեր առաջընթացը այլ սարք տեղափոխելու կամ պահեստային պատճեն ստեղծելու համար: Այն պարունակում է թվային ստորագրություն և պաշտպանված է կեղծումներից:" />
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 animate-scale-up" />
                <Translate text="Պատճենված է" />
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <Translate text="Պատճենել պաշտպանված կոդը" />
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 py-1 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5" />
            <Translate text="Թվային ստորագրությունը միացված է և ապահով" />
          </div>
        </div>
      </div>

      {/* Import Box */}
      <div id="import-card" className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-800 text-base md:text-lg">
              <Translate text="Ներմուծել Տվյալները" />
            </h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            <Translate text="Տեղադրեք նախկինում արտահանված պաշտպանված կոդը ստորև՝ ձեր առաջընթացը վերականգնելու համար:" />
          </p>
        </div>

        <div className="space-y-3">
          <textarea
            value={importCode}
            onChange={(e) => setImportCode(e.target.value)}
            placeholder="Տեղադրեք կոդը այստեղ..."
            className="w-full h-20 p-2.5 text-xs border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 bg-gray-50/50 resize-none font-mono text-gray-600 leading-normal"
          />

          <button
            onClick={handleImport}
            disabled={!importCode.trim()}
            className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-medium rounded-xl flex items-center justify-center gap-2 text-xs md:text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            <Upload className="w-4 h-4" />
            <Translate text="Ներմուծել և Ստուգել" />
          </button>

          {importStatus.type && (
            <div
              className={`p-3 rounded-xl flex items-start gap-2 text-xs leading-snug animate-fade-in ${
                importStatus.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                  : "bg-rose-50 text-rose-800 border border-rose-100"
              }`}
            >
              {importStatus.type === "success" ? (
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{importStatus.msg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
