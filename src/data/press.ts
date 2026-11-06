/**
 * Media coverage, transcribed from `sections/media.tex` in the CV repo, which
 * stays the source of record. Three kinds of thing live here:
 *
 *   interviews — she spoke; a programme and a date
 *   coverage   — a paper was written about; one entry per paper, many outlets
 *   profiles   — a piece about her rather than about one result
 *
 * Outlet and programme names are proper nouns and are not translated. Only the
 * surrounding description takes an `{ en, es }` pair.
 */
import type { Bilingual } from './i18n';

/** Languages coverage has appeared in, as BCP 47 tags for the `lang` attribute. */
export type PieceLang = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh';

export type Outlet = {
  /** The publication. */
  name: string;
  href: string;
  /** Language the piece was published in; the page lists its own language
   *  first so a reader meets the ones they can read. */
  lang: PieceLang;
  /**
   * The headline that outlet ran, which says far more than the outlet name
   * alone. Fetched from the live pages. A few sites block automated requests
   * (marked below); those show the outlet name on its own until someone adds
   * the headline by hand.
   */
  headline?: string;
};

export type Interview = {
  id: string;
  /** Not displayed — the list is chronological and each entry carries a date
   *  or is self-evidently recent. Kept because it is how the CV orders these. */
  year: string;
  /** Episode title, in the language it was broadcast in. */
  title: string;
  href: string;
  /** Programme and network. */
  outlet: string;
  date: Bilingual;
  note: Bilingual;
  /** A written Q&A rather than audio; shown with the article icon. */
  written?: boolean;
};

export type Coverage = {
  id: string;
  year: string;
  /** The paper the coverage is about. */
  title: string;
  /** DOI or preprint. The journal name is deliberately not repeated here —
   *  on a press page it adds nothing the link does not, and the publications
   *  page already carries the full citation. */
  href: string;
  outlets: Outlet[];
};

export type Profile = {
  id: string;
  year: string;
  title: Bilingual;
  href: string;
  outlet: string;
  note?: Bilingual;
  /** The same piece published in another language. */
  translations?: { lang: PieceLang; label: Bilingual; href: string }[];
};

export const interviews: Interview[] = [
  {
    id: 'askastrobio-2026',
    year: '2026',
    title: 'Astrobiology Revealed #38: Celia Blanco',
    href: 'https://askastrobio.org/articles/astrobiology-revealed-38',
    outlet: 'AskAstrobio, Blue Marble Space',
    date: { en: '20 Oct 2026', es: '20 de octubre de 2026' },
    note: {
      en: 'Written Q&A on integrating astrobiology into crewed space missions.',
      es: 'Entrevista escrita sobre la integración de la astrobiología en las misiones espaciales tripuladas.',
    },
    written: true,
  },
  {
    id: 'principio-de-incertidumbre-2026',
    year: '2026',
    title: 'El jardín de las civilizaciones que se bifurcan',
    href: 'https://podcasts.apple.com/podcast/id1070524537?i=1000770297370',
    outlet: 'Principio de Incertidumbre, Canal Extremadura',
    date: { en: '30 May 2026', es: '30 de mayo de 2026' },
    note: {
      en: 'Interview on the technosphere collapse–recovery model.',
      es: 'Entrevista sobre el modelo de colapso y recuperación de la tecnosfera.',
    },
  },
  {
    id: 'rosa-de-los-vientos-2026',
    year: '2026',
    title: '¿Cuánto tardaría una civilización en colapsar teniendo en cuenta su tecnología?',
    href: 'https://podcasts.apple.com/podcast/id468637823?i=1000769429134',
    outlet: 'La Rosa de los Vientos, Onda Cero',
    date: { en: '25 May 2026', es: '25 de mayo de 2026' },
    note: {
      en: 'Interview on the technosphere collapse–recovery model.',
      es: 'Entrevista sobre el modelo de colapso y recuperación de la tecnosfera.',
    },
  },
];

export const coverage: Coverage[] = [
  {
    id: 'technosphere-2026',
    year: '2026',
    title: "Projections of Earth's Technosphere: Civilization Collapse-Recovery Dynamics and Detectability",
    href: 'https://doi.org/10.1016/j.actaastro.2026.10.055',
    outlets: [
      { name: 'El País', href: 'https://elpais.com/ciencia/2026-05-20/cuanto-tiempo-puede-vivir-una-civilizacion-antes-de-colapsar-las-utopias-estables-son-los-escenarios-menos-probables.html', lang: 'es', headline: '¿Cuánto tiempo puede vivir una civilización antes de colapsar? “Las utopías estables son los escenarios menos probables”' },
      { name: 'El País (English)', href: 'https://english.elpais.com/science-tech/2026-05-21/how-long-can-a-civilization-survive-before-it-collapses-stable-utopias-are-the-least-likely-scenarios.html', lang: 'en', headline: 'How long can a civilization survive before it collapses? ‘Stable utopias are the least likely scenarios’' },
      { name: 'El Confidencial', href: 'https://www.elconfidencial.com/tecnologia/novaceno/2026-04-27/investigacion-civilizaciones-universo-humanos_4344882/', lang: 'es', headline: 'Los 10 futuros que provocarán el colapso de nuestra civilización, según un estudio de la astrobióloga española Celia Blanco' },
      { name: 'elDiario.es', href: 'https://www.eldiario.es/spin/quedan-futuros-viables-ocho-diez-escenarios-simulados-cientifica-espanola-no-garantizan-supervivencia-humana-pm_1_13269686.html', lang: 'es', headline: 'Solo quedan dos futuros viables: ocho de los diez escenarios simulados por una científica española no garantizan la supervivencia humana' },
      { name: 'Universe Today', href: 'https://www.universetoday.com/articles/which-types-of-civilizations-collapse-and-which-can-endure', lang: 'en', headline: 'Which Types of Civilizations Collapse and Which Can Endure?' },
      { name: 'Phys.org', href: 'https://phys.org/news/2026-04-civilizations-collapse.html', lang: 'en', headline: 'Which types of civilizations collapse and which can endure?' },
      { name: 'Eltiempo.es', href: 'https://www.eltiempo.es/noticias/un-estudio-espanol-plantea-el-escenario-mas-inquietante-sobre-la-vida-extraterrestre', lang: 'es', headline: 'Un estudio español plantea el escenario más inquietante sobre la vida extraterrestre' },
      { name: 'Mundiario', href: 'https://www.mundiario.com/articulo/tecnologia-ciencia/mil-anos-caer-ciencia-que-explica-que-civilizaciones-duran/20260520161629387187.html', lang: 'es', headline: 'Mil años para caer: la ciencia que explica por qué las civilizaciones no duran' },
      { name: '3DJuegos', href: 'https://www.3djuegos.com/3djuegos-trivia/noticias/utopias-estables-escenarios-probables-cientifica-espanola-ha-simulado-10-futuros-para-humanidad-solo-2-sobreviven', lang: 'es', headline: 'Una científica de Madrid ha simulado 10 futuros para la humanidad, pero sólo 2 sobreviven: «Las utopías estables son los escenarios menos probables»' },
      { name: 'MuyMac', href: 'https://www.muymac.com/solo-2-de-cada-10-futuros-simulados-dejan-a-la-humanidad-viva-estudio-madrileno-descarta-utopias/', lang: 'es', headline: 'Solo 2 de cada 10 futuros simulados dejan a la humanidad viva: estudio madrileño descarta utopías' },
      { name: 'Teleamazonas', href: 'https://www.teleamazonas.com/tendencias/entretenimiento/ciencia/vivir-civilizacion-colapsar-recursos/', lang: 'es', headline: '¿Cuánto tiempo puede vivir una civilización antes de colapsar?' },
      { name: 'Above the Norm News', href: 'https://www.abovethenormnews.com/2026/08/17/human-civilization-collapse-simulations/', lang: 'en', headline: 'Scientists Ran 2,000 Simulations Of Humanity\'s Future. Most Ended In Collapse' },
      // Listed on the Project Janus press page, janus.bluemarblespace.org/press-interviews.
      { name: 'Rivista Studio', href: 'https://www.rivistastudio.com/crollo-civilta-consumo-risorse/', lang: 'it', headline: 'Una ricerca ha dimostrato che le civiltà non crollano per le catastrofi ma perché iniziano a consumare troppo, che è proprio quello che sta succedendo alla nostra civiltà' },
      { name: 'Xataka Brasil', href: 'https://www.xataka.com.br/ciencia/cientistas-simulam-10-cenarios-possiveis-para-a-humanidade-e-constatam-apenas-2-chegam-ao-proximo-milenio-sem-entrar-em-colapso', lang: 'pt', headline: 'Cientistas simulam 10 cenários possíveis para a humanidade e constatam: apenas 2 chegam ao próximo milênio sem entrar em colapso' },
      { name: 'ScienceAlert', href: 'https://www.sciencealert.com/a-1000-year-simulation-reveals-what-could-save-civilization-from-collapse', lang: 'en', headline: 'A 1,000-Year Simulation Reveals What Could Save Civilization From Collapse' },
      { name: 'Olhar Digital', href: 'https://olhardigital.com.br/2026/09/18/ciencia-e-espaco/o-que-pode-salvar-uma-civilizacao-do-colapso-simulacao-de-mil-anos-aponta-dois-fatores-decisivos-para-o-futuro', lang: 'pt', headline: 'O que pode salvar uma civilização do colapso? Simulação de mil anos aponta dois fatores decisivos para o futuro' },
      { name: 'scinexx', href: 'https://www.scinexx.de/news/gesellschaft/welche-zivilisationen-kollabieren-und-welche-ueberdauern/', lang: 'de', headline: 'Welche Zivilisationen kollabieren und welche überdauern?' },
      { name: 'Everyeye Tech', href: 'https://tech.everyeye.it/notizie/civilta-collasso-simulazione-lunga-1000-anni-svela-come-evitare-umanita-901261.html', lang: 'it', headline: 'Civiltà al collasso: una simulazione lunga 1000 anni svela come evitare la fine dell\'umanità' },
      { name: 'ZAP Notícias', href: 'https://zap.aeiou.pt/uma-simulacao-de-mil-anos-mostra-o-que-pode-salvar-a-nossa-civilizacao-do-colapso-765496', lang: 'pt', headline: 'Uma simulação de mil anos mostra o que pode salvar a nossa civilização do colapso' },
      { name: 'Correio do Estado', href: 'https://correiodoestado.com.br/extra/cientista-simula-os-proximos-1000-anos-da-humanidade-e-encontra-unica/473354/', lang: 'pt', headline: 'Cientista simula os próximos 1.000 anos da humanidade e encontra única saída para o colapso' },
      { name: 'Vistazo', href: 'https://www.vistazo.com/discover/cientificos-simulan-los-proximos-1-000-anos-de-la-tierra-y-solo-hay-una-posibilidad-de-que-la-humanidad-evite-el-colapso/', lang: 'es', headline: 'Científicos simulan los próximos 1.000 años de la Tierra y solo hay una posibilidad de que la humanidad evite el colapso' },
      { name: 'Schwarzwälder Bote', href: 'https://www.schwarzwaelder-bote.de/wissen/wie-phoenix-aus-der-asche-warum-zivilisationen-kollabieren-und-welche-ueberdauern-79511387.html', lang: 'de', headline: 'Wie Phönix aus der Asche: Warum Zivilisationen kollabieren und welche überdauern' },
      { name: 'Actu Alt Plus', href: 'https://www.actu-alt-plus.com/tech-ia-futur/dix-futurs-simules-mille-ans-effondrement-civilisation/37364/', lang: 'fr', headline: 'Effondrement de civilisation : dix futurs simulés' },
    ],
  },
  {
    id: 'pacbio-2021',
    year: '2021',
    title: 'PacBio sequencing output increased through uniform and directional fivefold concatenation',
    href: 'https://doi.org/10.1038/s41598-021-96829-z',
    outlets: [
      { name: 'GenomeWeb', href: 'https://www.genomeweb.com/sequencing/new-pacbio-library-prep-method-helps-cover-death-valley-between-short-and-long-reads', lang: 'en', headline: 'New PacBio Library Prep Method Helps Cover ‘Death Valley’ Between Short and Long Reads' },
    ],
  },
  {
    id: 'protein-rna-2018',
    year: '2018',
    title: 'Analysis of evolutionarily independent protein–RNA complexes yields a criterion to evaluate the relevance of prebiotic scenarios',
    href: 'https://doi.org/10.1016/j.cub.2018.01.014',
    outlets: [
      { name: 'Dispatch article by A. Lazcano', href: 'https://www.sciencedirect.com/science/article/pii/S0960982218300885', lang: 'en' }, // headline: blocked by the site
      { name: 'UCSB press release (EurekAlert!)', href: 'https://sciencesources.eurekalert.org/news-releases/858035', lang: 'en', headline: 'The recipe for life' },
      { name: 'Phys.org', href: 'https://phys.org/news/2018-02-amino-acid-arginine-important-role.html', lang: 'en', headline: 'Researchers find that the amino acid arginine may have played a more important role in the chemical origins of life' },
      { name: 'ScienceDaily', href: 'https://www.sciencedaily.com/releases/2018/02/180206115111.htm', lang: 'en', headline: 'The recipe for life' },
      { name: 'UCSB The Current', href: 'https://www.news.ucsb.edu/2018/018694/recipe-life', lang: 'en', headline: 'The Recipe for Life' },
      { name: 'Daily Nexus', href: 'https://dailynexus.com/2018-02-22/arginines-larger-in-life-role/', lang: 'en', headline: 'Arginine’s Larger (in) Life Role' },
      { name: 'BioQuick News', href: 'https://bioquicknews.com/arginine-may-have-played-key-role-in-origin-of-life-finding-would-put-constraints-on-types-of-scenarios-that-could-have-given-rise-to-the-genetic-code/', lang: 'en', headline: 'Arginine May Have Played Key Role in Origin of Life; Finding Would Put Constraints on Types of Scenarios That Could Have Given Rise to the Genetic Code' },
    ],
  },
];

export const profiles: Profile[] = [
  {
    id: 'our-narratives-2026',
    year: '2026',
    title: { en: 'The Loop and the Silence', es: 'The Loop and the Silence' },
    href: 'https://ournarratives.net/the-loop-and-the-silence/',
    outlet: 'Our Narratives',
    note: {
      en: 'On how life begins, how civilizations last, and why a quiet galaxy may not be an empty one.',
      es: 'Sobre cómo empieza la vida, cuánto duran las civilizaciones y por qué una galaxia silenciosa puede no estar vacía.',
    },
    translations: [
      { lang: 'zh', label: { en: 'Chinese version', es: 'Versión en chino' }, href: 'https://ournarratives.net/the-loop-and-the-silence-chinese/' },
    ],
  },
  {
    id: 'scope-2024',
    year: '2024',
    title: { en: 'Researcher profile', es: 'Perfil de investigadora' },
    href: 'https://scope.asu.edu/celia-blanco',
    outlet: 'NASA SMD Community of Practice for Education (SCoPE)',
  },
  {
    id: 'bms-2023',
    year: '2023',
    title: {
      en: 'Celia Blanco is Bridging Gaps Between Theoretical Physics, Astrobiology, and the Origins of Life',
      es: 'Celia Blanco is Bridging Gaps Between Theoretical Physics, Astrobiology, and the Origins of Life',
    },
    href: 'https://bmsis.org/celia-blanco-is-bridging-gaps-between-theoretical-physics-astrobiology-and-the-origins-of-life/',
    outlet: 'Blue Marble Space',
  },
  {
    id: 'ucsb-2016',
    year: '2016',
    title: { en: 'And the Winner Is…', es: 'And the Winner Is…' },
    href: 'https://www.news.ucsb.edu/2016/017126/and-winner',
    outlet: 'The Current, UC Santa Barbara',
    note: {
      en: 'On the Otis Williams Postdoctoral Fellowship.',
      es: 'Sobre la beca postdoctoral Otis Williams.',
    },
  },
];
