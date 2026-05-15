/**
 * Fire a custom analytics event via Google Analytics 4 (gtag).
 * @param  {...any} args — first arg is the event name, second optional is `{ props: { ... } }`
 *
 * Usage:
 *   fireEvent('Hard mode')
 *   fireEvent('Click: Share', { props: { type: 'share' } })
 */
export default (...args) => {
  if (typeof window.gtag !== 'function') return;
  const [eventName, detail] = args;
  if (!eventName) return;
  const params = detail?.props || {};
  window.gtag('event', eventName, params);
};
