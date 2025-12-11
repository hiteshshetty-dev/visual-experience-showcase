export {};

declare global {
  interface Window {
    jstag: {
      init: (config: { src: string }) => void;
      isLoaded: boolean;
    };
  }
}
