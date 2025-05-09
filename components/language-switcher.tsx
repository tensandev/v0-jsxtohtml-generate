"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 uppercase text-xs tracking-wider">
          <Globe className="h-4 w-4" />
          <span>{t("languageSelector")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem onClick={() => setLanguage("en")} className="uppercase text-xs tracking-wider">
          <span className={language === "en" ? "font-medium" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("ja")} className="uppercase text-xs tracking-wider">
          <span className={language === "ja" ? "font-medium" : ""}>日本語</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
