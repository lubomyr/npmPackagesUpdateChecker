if (import.meta.env.DEV) {
  window.onerror = (event, source, lineno, colno, err) => {
    // must be within function call because that's when the element is defined for sure.
    const ErrorOverlay = customElements.get('vite-error-overlay');
    // don't open outside vite environment
    if (!ErrorOverlay) {
      return;
    }
    const overlay = new ErrorOverlay(err);
    document.body.appendChild(overlay);
  };
}
