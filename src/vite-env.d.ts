/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// 环境变量
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
