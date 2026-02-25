/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADMIN_ID: string;
    readonly VITE_ADMIN_PW: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
