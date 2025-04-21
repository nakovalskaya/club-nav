export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
          };
          auth_date?: number;
          hash?: string;
        };
        ready: () => void;
        expand?: () => void;
        close?: () => void;
        sendData?: (data: string) => void;
        version?: string;
        isExpanded?: boolean;
        viewportHeight?: number;
        themeParams?: Record<string, string>;
      };
    };
  }
}
