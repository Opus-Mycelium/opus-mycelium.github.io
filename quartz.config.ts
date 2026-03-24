import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono", // Fonte de código para títulos fica muito "tech"
        body: "Inter",           // Leitura limpa para as hifas
        code: "JetBrains Mono",  // A clássica do seu terminal
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#6d28d9", // Roxo NERV
          tertiary: "#f59e0b",  // Âmbar de Alerta
          highlight: "rgba(109, 40, 217, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0d0211",      // Fundo quase preto (vibe Terminal)
          lightgray: "#261431",  // Bordas e fundos secundários roxos
          gray: "#8b5cf6",       // Texto de suporte (Roxo claro)
          darkgray: "#e2e8f0",   // Texto principal (quase branco)
          dark: "#fbbf24",       // Títulos e destaques fortes (Dourado/Âmbar)
          secondary: "#a78bfa",  // Links e interatividade (Violeta elétrico)
          tertiary: "#f472b6",   // Detalhes (Rosa choque/Evangelion 08)
          highlight: "rgba(139, 92, 246, 0.2)", // Realce de seleção
          textHighlight: "#6d28d988",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
