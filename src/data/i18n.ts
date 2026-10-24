/** Text that differs between the English and Spanish versions of a page. */
export type Bilingual = { en: string; es: string };

export type Lang = 'en' | 'es';

/**
 * Reduce a pathname to its clean route: `/es.html` -> `/es`,
 * `/research.html` -> `/research`, `/index.html` -> `/`, `/es/` -> `/es`.
 *
 * With `build.format: 'file'` Astro reports built pages with a `.html`
 * suffix, while the dev server and GitHub Pages also serve the bare path, so
 * every language check has to go through this first.
 */
export function routeOf(pathname: string): string {
  const route = pathname
    .replace(/\.html$/, '')
    .replace(/\/index$/, '')
    .replace(/\/+$/, '');
  return route || '/';
}

export function langOf(pathname: string): Lang {
  const route = routeOf(pathname);
  return route === '/es' || route.startsWith('/es/') ? 'es' : 'en';
}

/** The same page in the other language. */
export function mirrorOf(pathname: string): string {
  const route = routeOf(pathname);
  if (langOf(pathname) === 'es') return route.slice(3) || '/';
  return route === '/' ? '/es' : '/es' + route;
}
