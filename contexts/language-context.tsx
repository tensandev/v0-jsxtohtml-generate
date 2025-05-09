"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

type Language = "en" | "ja"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    title: "JSX to HTML Converter",
    description: "Enter your JSX code below, convert it to HTML, and copy the generated code for your projects.",
    jsxSnippet: "JSX Snippet",
    htmlOutput: "HTML Output",
    enterJsx: "Enter your JSX snippet here...",
    convertButton: "Convert JSX to HTML",
    limitationsAlert:
      "This converter handles basic JSX to HTML conversion. Complex React components with state, hooks, or dynamic content will need manual adjustment after conversion.",
    generatedHtml: "Generated HTML",
    copyHtml: "Copy HTML",
    copied: "Copied!",
    outputPlaceholder: "HTML output will appear here...",
    preview: "Preview",
    previewPlaceholder: "Preview will appear here after conversion",
    languageSelector: "Language",
    downloadHtml: "Download",
    offlineMode: "You are currently offline. The app will continue to work, but some features may be limited.",
    installApp: "Install App",

    // Documentation page translations
    docsTitle: "Documentation",
    docsDescription: "Learn how to use the JSX to HTML Converter effectively",
    backToConverter: "Back to Converter",

    introductionTitle: "Introduction",
    introductionP1:
      "JSX to HTML Converter is a tool that allows you to convert JSX code snippets to standard HTML. This is useful for developers who want to extract HTML from React components or JSX fragments.",
    introductionP2:
      "The converter handles various JSX-specific syntax like className, camelCase event handlers, and self-closing tags, transforming them into their HTML equivalents.",

    howToUseTitle: "How to Use",
    step1Title: "Step 1: Enter JSX Code",
    step1Description:
      "Enter your JSX code in the editor. You can use any valid JSX syntax, including React-specific attributes like className and onClick.",
    step2Title: "Step 2: Convert to HTML",
    step2Description: "Click the 'Convert JSX to HTML' button to transform your JSX code into standard HTML.",
    step3Title: "Step 3: Use the Generated HTML",
    step3Description:
      "The converted HTML will appear in the output panel. You can copy it to your clipboard or download it as a file.",

    featuresTitle: "Features",
    conversionTab: "Conversion",
    pwaTab: "PWA",
    mobileTab: "Mobile",

    conversionFeatureTitle: "JSX to HTML Conversion",
    conversionFeatureP1: "The converter handles various JSX-specific syntax elements:",
    conversionFeatureList1: "Converts className attributes to class",
    conversionFeatureList2: "Transforms camelCase event handlers (onClick, onChange) to lowercase HTML attributes",
    conversionFeatureList3: "Converts self-closing tags to standard HTML tags",
    conversionFeatureList4: "Transforms JSX comments to HTML comments",
    conversionFeatureList5: "Handles basic inline styles conversion",

    pwaFeatureTitle: "Progressive Web App (PWA)",
    pwaFeatureP1: "This application is a Progressive Web App, which means:",
    pwaFeatureList1: "It can be installed on your device and used like a native app",
    pwaFeatureList2: "It works offline, allowing you to convert JSX to HTML without an internet connection",
    pwaFeatureList3: "It loads quickly and provides a smooth user experience",
    pwaFeatureP2:
      "To install the app, click the 'Install App' button that appears in the header (if available on your device).",

    mobileFeatureTitle: "Mobile Support",
    mobileFeatureP1: "The application is fully responsive and works well on mobile devices:",
    mobileFeatureList1: "Optimized layout for small screens",
    mobileFeatureList2: "Touch-friendly interface",
    mobileFeatureList3: "Efficient use of screen space",

    limitationsTitle: "Limitations",
    limitationsP1: "While the converter handles many JSX features, there are some limitations to be aware of:",
    limitationsList1: "Complex JavaScript expressions in curly braces are replaced with placeholders",
    limitationsList2: "React components and hooks cannot be converted directly to HTML",
    limitationsList3: "Dynamic content generation through JavaScript is not preserved in the HTML output",
    limitationsList4: "Some advanced JSX patterns may require manual adjustment after conversion",

    faqTitle: "Frequently Asked Questions",
    faq1Question: "Can I convert an entire React component?",
    faq1Answer:
      "The converter works best with JSX fragments rather than entire React components. While you can input a complete component, the output will only contain the HTML structure, not the component's functionality or state management.",

    faq2Question: "Will event handlers work in the converted HTML?",
    faq2Answer:
      "Simple event handlers are converted to their HTML equivalents, but the JavaScript functions they reference are replaced with placeholders. You'll need to implement the actual functionality in your HTML/JavaScript code.",

    faq3Question: "Can I use this offline?",
    faq3Answer:
      "Yes! This is a Progressive Web App that works offline once you've visited it with an internet connection. You can also install it on your device for quick access.",

    tryItNow: "Try It Now",
  },
  ja: {
    title: "JSX から HTML へのコンバーター",
    description: "JSX コードを入力し、HTML に変換して、生成されたコードをプロジェクトにコピーしましょう。",
    jsxSnippet: "JSX スニペット",
    htmlOutput: "HTML 出力",
    enterJsx: "JSX スニペットをここに入力してください...",
    convertButton: "JSX を HTML に変換",
    limitationsAlert:
      "このコンバーターは基本的な JSX から HTML への変換を処理します。状態、フック、または動的なコンテンツを持つ複雑な React コンポーネントは、変換後に手動で調整する必要があります。",
    generatedHtml: "生成された HTML",
    copyHtml: "HTML をコピー",
    copied: "コピーしました！",
    outputPlaceholder: "HTML 出力がここに表示されます...",
    preview: "プレビュー",
    previewPlaceholder: "変換後にプレビューがここに表示されます",
    languageSelector: "言語",
    downloadHtml: "ダウンロード",
    offlineMode: "現在オフラインです。アプリは引き続き動作しますが、一部の機能が制限される場合があります。",
    installApp: "アプリをインストール",

    // Documentation page translations
    docsTitle: "ドキュメント",
    docsDescription: "JSX to HTML コンバーターの効果的な使い方を学ぶ",
    backToConverter: "コンバーターに戻る",

    introductionTitle: "はじめに",
    introductionP1:
      "JSX to HTML コンバーターは、JSX コードスニペットを標準的な HTML に変換するツールです。これは、React コンポーネントや JSX フラグメントから HTML を抽出したい開発者に役立ちます。",
    introductionP2:
      "このコンバーターは、className、キャメルケースのイベントハンドラー、自己閉じタグなど、JSX 特有の構文を処理し、HTML 相当のものに変換します。",

    howToUseTitle: "使い方",
    step1Title: "ステップ 1: JSX コードを入力",
    step1Description:
      "エディターに JSX コードを入力します。className や onClick などの React 固有の属性を含む、有効な JSX 構文を使用できます。",
    step2Title: "ステップ 2: HTML に変換",
    step2Description: "「JSX を HTML に変換」ボタンをクリックして、JSX コードを標準的な HTML に変換します。",
    step3Title: "ステップ 3: 生成された HTML を使用",
    step3Description:
      "変換された HTML が出力パネルに表示されます。クリップボードにコピーするか、ファイルとしてダウンロードできます。",

    featuresTitle: "機能",
    conversionTab: "変換",
    pwaTab: "PWA",
    mobileTab: "モバイル",

    conversionFeatureTitle: "JSX から HTML への変換",
    conversionFeatureP1: "コンバーターは、さまざまな JSX 固有の構文要素を処理します：",
    conversionFeatureList1: "className 属性を class に変換",
    conversionFeatureList2: "キャメルケースのイベントハンドラー（onClick、onChange）を小文字の HTML 属性に変換",
    conversionFeatureList3: "自己閉じタグを標準的な HTML タグに変換",
    conversionFeatureList4: "JSX コメントを HTML コメントに変換",
    conversionFeatureList5: "基本的なインラインスタイルの変換を処理",

    pwaFeatureTitle: "プログレッシブ Web アプリ（PWA）",
    pwaFeatureP1: "このアプリケーションはプログレッシブ Web アプリであり、以下のことが可能です：",
    pwaFeatureList1: "デバイスにインストールして、ネイティブアプリのように使用できる",
    pwaFeatureList2: "オフラインで動作し、インターネット接続なしで JSX を HTML に変換できる",
    pwaFeatureList3: "素早く読み込まれ、スムーズなユーザーエクスペリエンスを提供",
    pwaFeatureP2:
      "アプリをインストールするには、ヘッダーに表示される「アプリをインストール」ボタンをクリックしてください（デバイスで利用可能な場合）。",

    mobileFeatureTitle: "モバイル対応",
    mobileFeatureP1: "このアプリケーションは完全にレスポンシブであり、モバイルデバイスでもうまく動作します：",
    mobileFeatureList1: "小さな画面向けに最適化されたレイアウト",
    mobileFeatureList2: "タッチ操作に適したインターフェース",
    mobileFeatureList3: "画面スペースの効率的な使用",

    limitationsTitle: "制限事項",
    limitationsP1: "コンバーターは多くの JSX 機能を処理しますが、注意すべきいくつかの制限があります：",
    limitationsList1: "中括弧内の複雑な JavaScript 式はプレースホルダーに置き換えられる",
    limitationsList2: "React コンポーネントとフックは HTML に直接変換できない",
    limitationsList3: "JavaScript による動的なコンテンツ生成は HTML 出力で保持されない",
    limitationsList4: "一部の高度な JSX パターンは、変換後に手動調整が必要な場合がある",

    faqTitle: "よくある質問",
    faq1Question: "React コンポーネント全体を変換できますか？",
    faq1Answer:
      "コンバーターは、完全な React コンポーネントよりも JSX フラグメントに最適です。完全なコンポーネントを入力することはできますが、出力にはコンポーネントの機能や状態管理ではなく、HTML 構造のみが含まれます。",

    faq2Question: "変換された HTML でイベントハンドラーは機能しますか？",
    faq2Answer:
      "単純なイベントハンドラーは HTML 相当のものに変換されますが、参照する JavaScript 関数はプレースホルダーに置き換えられます。実際の機能は HTML/JavaScript コードで実装する必要があります。",

    faq3Question: "オフラインで使用できますか？",
    faq3Answer:
      "はい！これはインターネット接続でアクセスした後にオフラインでも動作するプログレッシブ Web アプリです。また、素早くアクセスするためにデバイスにインストールすることもできます。",

    tryItNow: "今すぐ試す",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isLanguageDetected, setIsLanguageDetected] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !isLanguageDetected) {
      // Try to get language from localStorage first
      const savedLanguage = localStorage.getItem("preferredLanguage") as Language

      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ja")) {
        setLanguage(savedLanguage)
      } else {
        // Get browser language (e.g. "en-US", "ja", "fr")
        const browserLang = navigator.language.split("-")[0].toLowerCase()

        // Check if the browser language is supported in our app
        if (browserLang === "ja") {
          setLanguage("ja")
        } else {
          // Default to English for any other language
          setLanguage("en")
        }
      }

      setIsLanguageDetected(true)
    }
  }, [isLanguageDetected])

  // Save language preference when it changes
  useEffect(() => {
    if (isLanguageDetected) {
      localStorage.setItem("preferredLanguage", language)
    }
  }, [language, isLanguageDetected])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
