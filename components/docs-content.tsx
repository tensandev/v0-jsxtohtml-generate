"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CircularAnimation } from "@/components/ui/circular-animation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function DocsContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t("introductionTitle")}</h2>
        <div className="text-sm text-gray-600 space-y-4">
          <p>{t("introductionP1")}</p>
          <p>{t("introductionP2")}</p>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t("howToUseTitle")}</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-normal uppercase tracking-wider text-gray-500">{t("step1Title")}</h3>
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{t("step1Description")}</p>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">
                  {`<div className="card">
  <h3>Hello JSX!</h3>
  <p>This is a <strong>JSX</strong> snippet.</p>
  <button onClick={() => alert('Clicked!')}>Click me</button>
</div>`}
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <CircularAnimation />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-normal uppercase tracking-wider text-gray-500">{t("step2Title")}</h3>
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{t("step2Description")}</p>
                <div className="flex justify-center">
                  <Button className="uppercase text-xs tracking-wider px-8 py-6 transition-all hover:bg-black hover:text-white">
                    {t("convertButton")}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <CircularAnimation />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-normal uppercase tracking-wider text-gray-500">{t("step3Title")}</h3>
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{t("step3Description")}</p>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">
                  {`<div class="card">
  <h3>Hello JSX!</h3>
  <p>This is a <strong>JSX</strong> snippet.</p>
  <button onclick="[JavaScript Function]">Click me</button>
</div>`}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t("featuresTitle")}</h2>
        <Tabs defaultValue="conversion" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="conversion" className="uppercase text-xs tracking-wider">
              {t("conversionTab")}
            </TabsTrigger>
            <TabsTrigger value="pwa" className="uppercase text-xs tracking-wider">
              {t("pwaTab")}
            </TabsTrigger>
            <TabsTrigger value="mobile" className="uppercase text-xs tracking-wider">
              {t("mobileTab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conversion" className="space-y-4">
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-normal mb-4">{t("conversionFeatureTitle")}</h3>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>{t("conversionFeatureP1")}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("conversionFeatureList1")}</li>
                    <li>{t("conversionFeatureList2")}</li>
                    <li>{t("conversionFeatureList3")}</li>
                    <li>{t("conversionFeatureList4")}</li>
                    <li>{t("conversionFeatureList5")}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pwa" className="space-y-4">
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-normal mb-4">{t("pwaFeatureTitle")}</h3>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>{t("pwaFeatureP1")}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("pwaFeatureList1")}</li>
                    <li>{t("pwaFeatureList2")}</li>
                    <li>{t("pwaFeatureList3")}</li>
                  </ul>
                  <p>{t("pwaFeatureP2")}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-4">
            <Card className="border border-gray-100 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-normal mb-4">{t("mobileFeatureTitle")}</h3>
                <div className="text-sm text-gray-600 space-y-4">
                  <p>{t("mobileFeatureP1")}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t("mobileFeatureList1")}</li>
                    <li>{t("mobileFeatureList2")}</li>
                    <li>{t("mobileFeatureList3")}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t("limitationsTitle")}</h2>
        <Card className="border border-gray-100 shadow-sm">
          <div className="p-6">
            <div className="text-sm text-gray-600 space-y-4">
              <p>{t("limitationsP1")}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t("limitationsList1")}</li>
                <li>{t("limitationsList2")}</li>
                <li>{t("limitationsList3")}</li>
                <li>{t("limitationsList4")}</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight">{t("faqTitle")}</h2>
        <div className="space-y-4">
          <Card className="border border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-normal mb-2">{t("faq1Question")}</h3>
              <p className="text-sm text-gray-600">{t("faq1Answer")}</p>
            </div>
          </Card>
          <Card className="border border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-normal mb-2">{t("faq2Question")}</h3>
              <p className="text-sm text-gray-600">{t("faq2Answer")}</p>
            </div>
          </Card>
          <Card className="border border-gray-100 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-normal mb-2">{t("faq3Question")}</h3>
              <p className="text-sm text-gray-600">{t("faq3Answer")}</p>
            </div>
          </Card>
        </div>
      </section>

      <div className="flex justify-center mt-12">
        <Link href="/">
          <Button className="uppercase text-xs tracking-wider px-8 py-6 transition-all hover:bg-black hover:text-white flex items-center gap-2">
            <span>{t("tryItNow")}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
