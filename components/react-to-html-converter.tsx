"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clipboard, Check, AlertCircle, Info, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { RotatingBorder } from "@/components/ui/rotating-border"
import { CircularAnimation } from "@/components/ui/circular-animation"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ReactToHtmlConverter() {
  const { t } = useLanguage()
  const [jsxCode, setJsxCode] = useState<string>(
    `<div className="card">\n  <h3>Hello JSX!</h3>\n  <p>This is a <strong>JSX</strong> snippet.</p>\n  <button onClick={() => alert('Clicked!')}>Click me</button>\n</div>`,
  )
  const [htmlOutput, setHtmlOutput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Check if online and update state
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const convertJsxToHtml = (jsx: string) => {
    try {
      setError(null)

      // Basic conversion of JSX to HTML
      let html = jsx
        // Replace className with class
        .replace(/className=/g, "class=")
        // Replace camelCase event handlers with lowercase
        .replace(/onClick=/g, "onclick=")
        .replace(/onChange=/g, "onchange=")
        .replace(/onSubmit=/g, "onsubmit=")
        .replace(/onBlur=/g, "onblur=")
        .replace(/onFocus=/g, "onfocus=")
        .replace(/onKeyDown=/g, "onkeydown=")
        .replace(/onKeyUp=/g, "onkeyup=")
        // Replace self-closing tags with proper HTML
        .replace(/(\s*)<([a-zA-Z0-9]+)([^>]*?)\/>/g, "$1<$2$3></$2>")
        // Replace JSX comments
        .replace(/\{\/\*(.+?)\*\/\}/g, "<!-- $1 -->")

      // Handle inline styles
      html = html.replace(/style=\{(\{[^}]+\})\}/g, (match, styleObj) => {
        try {
          // Convert the string representation of the style object to actual CSS
          const styleStr = styleObj
            .replace(/^\{|\}$/g, "") // Remove outer braces
            .split(",")
            .map((prop: string) => {
              if (!prop.includes(":")) return ""
              const [key, value] = prop.split(":").map((s) => s.trim())
              // Convert camelCase to kebab-case
              const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
              return `${cssKey}: ${value.replace(/['"]/g, "")}`
            })
            .filter(Boolean)
            .join("; ")

          return `style="${styleStr}"`
        } catch (e) {
          console.error("Error converting style object:", e)
          return match // Return the original match if conversion fails
        }
      })

      // Handle simple JSX expressions
      html = html.replace(/\{([^{}]+)\}/g, (match, expr) => {
        // If it looks like a function or complex expression, leave it as a placeholder
        if (expr.includes("=>") || expr.includes("function")) {
          return `[JavaScript Function]`
        }
        // For simple expressions, just return the content
        return expr
      })

      setHtmlOutput(html)
    } catch (error) {
      console.error("Error converting JSX to HTML:", error)
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadHtml = () => {
    if (!htmlOutput) return

    const blob = new Blob([htmlOutput], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "converted.html"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8 md:space-y-12">
      {!isOnline && (
        <Alert className="bg-yellow-50 border border-yellow-200 mb-4">
          <Info className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-sm text-yellow-700">{t("offlineMode")}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="jsx" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isMobile ? "mb-4" : "mb-8"}`}>
          <TabsTrigger value="jsx" className="uppercase text-xs tracking-wider">
            {t("jsxSnippet")}
          </TabsTrigger>
          <TabsTrigger value="output" className="uppercase text-xs tracking-wider">
            {t("htmlOutput")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jsx" className={`space-y-4 ${isMobile ? "" : "space-y-8"}`}>
          <RotatingBorder className="w-full">
            <div className={`${isMobile ? "p-4" : "p-8"}`}>
              <textarea
                className="w-full h-60 md:h-80 p-0 font-mono text-sm border-none focus:outline-none focus:ring-0 resize-none bg-transparent"
                value={jsxCode}
                onChange={(e) => setJsxCode(e.target.value)}
                placeholder={t("enterJsx")}
              />
            </div>
          </RotatingBorder>

          <div className="flex justify-between items-center">
            {!isMobile && (
              <div className="flex items-center">
                <CircularAnimation />
              </div>
            )}
            <Button
              onClick={() => convertJsxToHtml(jsxCode)}
              className={`uppercase text-xs tracking-wider transition-all hover:bg-black hover:text-white ${
                isMobile ? "w-full py-5" : "px-8 py-6"
              }`}
            >
              {t("convertButton")}
            </Button>
          </div>

          <Alert className="bg-transparent border border-gray-200">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs md:text-sm text-gray-600">{t("limitationsAlert")}</AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive" className="bg-transparent border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs md:text-sm">{error}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="output" className={`space-y-4 ${isMobile ? "" : "space-y-8"}`}>
          <RotatingBorder className="w-full">
            <div className={`${isMobile ? "p-4" : "p-8"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs md:text-sm font-normal uppercase tracking-wider text-gray-500">
                  {t("generatedHtml")}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!htmlOutput}
                    className="flex items-center gap-1 uppercase text-xs tracking-wider"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="hidden md:inline">{t("copied")}</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="h-4 w-4" />
                        <span className="hidden md:inline">{t("copyHtml")}</span>
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadHtml}
                    disabled={!htmlOutput}
                    className="flex items-center gap-1 uppercase text-xs tracking-wider"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden md:inline">{t("downloadHtml")}</span>
                  </Button>
                </div>
              </div>
              <pre className="w-full h-60 md:h-80 p-0 font-mono text-sm overflow-auto bg-transparent">
                {htmlOutput || t("outputPlaceholder")}
              </pre>
            </div>
          </RotatingBorder>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <h3 className="text-xs md:text-sm font-normal uppercase tracking-wider text-gray-500">{t("preview")}</h3>
        <Card className="border-none shadow-none bg-white">
          <div className={`${isMobile ? "p-4" : "p-8"}`}>
            <div className="min-h-[100px] border border-gray-100 rounded-md p-4 md:p-8 bg-white">
              {htmlOutput ? (
                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
              ) : (
                <div className="text-gray-400 text-center text-xs md:text-sm">{t("previewPlaceholder")}</div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
