"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function InstallPWAButton() {
  const { t } = useLanguage()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to notify the user they can install the PWA
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)

    // Hide the install button
    setIsInstallable(false)
  }

  if (!isInstallable) return null

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleInstallClick}
      className="flex items-center gap-1 uppercase text-xs tracking-wider"
    >
      <Download className="h-4 w-4" />
      <span>{t("installApp")}</span>
    </Button>
  )
}
