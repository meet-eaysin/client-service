interface Window {
  _Sentry?: {
    captureException: (error: unknown) => void;
  };
}
