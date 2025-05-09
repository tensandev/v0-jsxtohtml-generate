"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

interface LanguageAwareTextProps {
  textKey: string
  fallback: string
}

export function LanguageAwareText({ textKey, fallback }: LanguageAwareTextProps) {
  const { t } = useLanguage()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // On the server or during initial hydration, use the fallback
  // After hydration, use the translated text
  return <>{isClient ? t(textKey) : fallback}</>
}
