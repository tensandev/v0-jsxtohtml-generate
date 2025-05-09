import { DocsContent } from "@/components/docs-content"
import { LanguageProvider } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LanguageAwareText } from "@/components/language-aware-text"
import { GradientBlob } from "@/components/ui/gradient-blob"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DocsPage() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#f8f8f8] overflow-hidden">
        <GradientBlob position="top-left" color1="#f0f0f0" color2="#e0e0e0" />
        <GradientBlob position="bottom-right" color1="#e8e8e8" color2="#d8d8d8" />

        <header className="container mx-auto py-4 md:py-8 px-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs uppercase tracking-wider hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">
                <LanguageAwareText textKey="backToConverter" fallback="Back to Converter" />
              </span>
            </Link>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="container mx-auto px-4 pb-16 md:pb-20 pt-4 md:pt-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-3 md:mb-4 text-center">
              <LanguageAwareText textKey="docsTitle" fallback="Documentation" />
            </h1>
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto mb-8 md:mb-16 text-center leading-relaxed">
              <LanguageAwareText
                textKey="docsDescription"
                fallback="Learn how to use the JSX to HTML Converter effectively"
              />
            </p>
            <DocsContent />
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
