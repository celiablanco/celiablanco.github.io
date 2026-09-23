/**
 * Roster for the Theoretical Astrobiology Group.
 *
 * Unlike the page content, this list is shared by the English and Spanish
 * People pages — names and photos are identical in both languages, so only the
 * prose fields are bilingual. Add a person once here and both pages update.
 *
 * Photos go in `public/img/people/` and are referenced as `/img/people/<file>`.
 * A person without a photo renders as a monogram, so a new member can be added
 * before a portrait exists.
 */

import type { Bilingual } from './i18n';

export type { Bilingual };

export type Role =
  | 'pi'
  | 'postdoc'
  | 'phd'
  | 'assistant'
  | 'masters'
  | 'undergrad'
  | 'visiting';

export type Link = { label: string; href: string };

export type Person = {
  /** Anchor id, also used as the React-style key. */
  id: string;
  /** A plain string, or `{ en, es }` when the honorific differs (Dr. / Dra.). */
  name: string | Bilingual;
  role: Role;
  /**
   * Overrides the default label for `role`. Spanish role names are gendered,
   * and the defaults use the neutral `-o/a` form; set this to the form the
   * person uses, e.g. `{ en: 'PhD Student', es: 'Doctoranda' }`.
   */
  roleLabel?: Bilingual;
  /** Path under `public/`, e.g. `/img/people/marina.jpg`. Omit for a silhouette. */
  photo?: string;
  /** CAB staff page or personal site — the main link on a member card. */
  profile?: string;
  email?: string;
  /** Position line shown under the name, if it needs more than the role label. */
  position?: Bilingual;
  /** Optional one-line research topic. */
  topic?: Bilingual;
  /** Longer paragraph — only rendered for the PI card. */
  bio?: Bilingual;
  /** Extra links beyond profile and email (ORCID, Scholar). */
  links?: Link[];
};

export type Alum = {
  id: string;
  name: string | Bilingual;
  role: Role;
  /** e.g. '2024' or '2023–2025'. */
  years: string;
  topic?: Bilingual;
  /** Where they went next. */
  now?: Bilingual;
};

export const roleLabels: Record<Role, Bilingual> = {
  pi: { en: 'Principal Investigator', es: 'Investigadora Principal' },
  postdoc: { en: 'Postdoctoral Researcher', es: 'Investigador/a Postdoctoral' },
  phd: { en: 'PhD Student', es: 'Doctorando/a' },
  // For someone working with the group whose doctorate is supervised elsewhere,
  // or who is not enrolled in a PhD at all.
  assistant: { en: 'Research Assistant', es: 'Ayudante de investigación' },
  masters: { en: "Master's Student", es: 'Estudiante de Máster' },
  undergrad: { en: 'Undergraduate Student', es: 'Estudiante de Grado' },
  visiting: { en: 'Visiting Researcher', es: 'Investigador/a Visitante' },
};

/**
 * Tints for the placeholder avatars, spaced roughly evenly around the colour
 * wheel so that no two read as the same colour, and kept at a similar
 * lightness so they still look like one family against the dark page.
 *
 * Assigned by position in the roster rather than by hashing the name: a hash
 * collides, and two people side by side in the same colour looks like a bug.
 * The cost is that colours shift if the list is reordered, which is fine —
 * they are decoration, not identity.
 */
export const avatarHues = [
  '#d4af6f', // amber
  '#a9c46c', // moss
  '#6ee7b7', // mint
  '#7dd3fc', // sky
  '#a78bfa', // violet
  '#d98fd0', // orchid
  '#e8899a', // rose
];

/**
 * The PI's own tint. Kept out of `avatarHues` because she sits in her own
 * section, so it never has to be told apart from a neighbouring card.
 */
export const piHue = '#e895b8'; // pink

export const pi: Person = {
  id: 'celia-blanco',
  name: { en: 'Dr. Celia Blanco', es: 'Dra. Celia Blanco' },
  role: 'pi',
  // Astronaut placeholder for now, so the whole roster matches; restore with:
  // photo: '/img/profile2025.jpeg',
  position: {
    en: 'Ramón y Cajal Fellow · Centro de Astrobiología (CAB, CSIC-INTA)',
    es: 'Investigadora Ramón y Cajal · Centro de Astrobiología (CAB, CSIC-INTA)',
  },
  // No bio here on purpose — the homepage About section already carries it, and
  // repeating it on this page just makes the reader read it twice. The `bio`
  // field still exists if a future member card wants one.
  links: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=nzOjUiUAAAAJ&hl=en' },
    { label: 'ORCID', href: 'https://orcid.org/0000-0003-1536-1493' },
  ],
};

/**
 * Current group members, listed in the order they should appear.
 *
 * A member entry needs very little: a name, a role, and a way to reach them.
 * Everything else is optional.
 *
 *   {
 *     id: 'first-last',
 *     name: 'First Last',
 *     role: 'phd',
 *     profile: 'https://cab.inta-csic.es/personal/...',
 *     email: 'someone@cab.inta-csic.es',
 *     photo: '/img/people/first-last.jpg',   // omit for the silhouette
 *   },
 */
export const members: Person[] = [
  {
    id: 'marina-fernandez-ruz',
    name: 'Marina Fernández Ruz',
    role: 'assistant',
    roleLabel: { en: 'Research Assistant', es: 'Investigadora contratada' },
    profile: 'https://cab.inta-csic.es/personal/fernandez-ruz-marina/',
  },
  {
    id: 'antonio-varo-garcia',
    name: 'Antonio Varo García',
    role: 'masters',
    position: {
      en: "Master's thesis (TFM)",
      es: 'Trabajo de Fin de Máster (TFM)',
    },
  },
  {
    id: 'hugo-beltran-de-heredia-llamazares',
    name: 'Hugo Beltrán de Heredia Llamazares',
    role: 'masters',
    position: {
      en: "Master's thesis (TFM)",
      es: 'Trabajo de Fin de Máster (TFM)',
    },
  },
  {
    id: 'angel-pedroche',
    name: 'Ángel Pedroche',
    role: 'masters',
    position: { en: 'CSIC JAE-Intro', es: 'CSIC JAE-Intro' },
    // email: pending
  },
];

/**
 * Past members. Same shape, plus the years they were in the group and, where
 * it is known, where they went next.
 */
export const alumni: Alum[] = [];

/* ══════════════════════════════════════════════════════════════════════════
   BMS affiliates

   People mentored remotely through the Blue Marble Space,
   which is a separate affiliation from the group at CAB — hence their own list
   rather than an entry in `members`.

   Several have held more than one appointment, so each person carries a list
   of them rather than a single role. Source of record is the BMS affiliate
   page: https://www.bluemarblespace.org/affiliates/celia-blanco
   ══════════════════════════════════════════════════════════════════════════ */

export type Program = 'ysp' | 'visiting';

export const programLabels: Record<Program, Bilingual> = {
  // The Young Scientist Program appointment carries the title "Research
  // Associate"; the year is tagged 'YSP' so the programme stays visible.
  ysp: { en: 'Research Associate', es: 'Investigador/a asociado/a' },
  visiting: { en: 'Visiting Scholar', es: 'Investigador/a visitante' },
};

/** Years for these programmes read 'YSP 2024' rather than a bare year. */
export const yearPrefix: Partial<Record<Program, string>> = { ysp: 'YSP ' };

export type Appointment = {
  program: Program;
  /** A single year ('2024') or a range ('2024–2025'). */
  years: string;
  /** Still running — renders as '2026–present'. */
  ongoing?: boolean;
};

export type Affiliate = {
  id: string;
  name: string;
  /** Most recent first. */
  appointments: Appointment[];
};

/** Current BMS affiliates, longest-standing first. */
export const bmsCurrent: Affiliate[] = [
  {
    id: 'tiana-noll-walker',
    name: 'Tiana Noll-Walker',
    appointments: [{ program: 'visiting', years: '2024', ongoing: true }],
  },
  {
    id: 'kaoutar-elasri',
    name: 'Kaoutar Elasri',
    appointments: [
      { program: 'visiting', years: '2024', ongoing: true },
      { program: 'ysp', years: '2024' },
    ],
  },
  {
    id: 'eungi-jo',
    name: 'Eungi Jo',
    appointments: [
      { program: 'visiting', years: '2024', ongoing: true },
      { program: 'ysp', years: '2024' },
    ],
  },
  {
    id: 'ceren-balkan',
    name: 'Ceren Balkan',
    appointments: [
      { program: 'visiting', years: '2024', ongoing: true },
      { program: 'ysp', years: '2024' },
    ],
  },
  {
    id: 'ecem-arpaci',
    // The BMS page lists this person twice, as 'Ecem Arpacı' and 'Ecem
    // Arpaci', so the two appointments do not cluster there. Merged here.
    name: 'Ecem Arpacı',
    appointments: [
      { program: 'visiting', years: '2025', ongoing: true },
      { program: 'ysp', years: '2025' },
    ],
  },
];

/** Past BMS affiliates, most recent first. */
export const bmsPast: Affiliate[] = [
  {
    id: 'nikol-solaligue',
    name: 'Nikol Solaligue',
    appointments: [{ program: 'ysp', years: '2026' }],
  },
  {
    id: 'natalie-orrantia',
    name: 'Natalie Orrantia',
    appointments: [{ program: 'ysp', years: '2026' }],
  },
  {
    id: 'sriya-pothapragada',
    name: 'Sriya Pothapragada',
    appointments: [{ program: 'visiting', years: '2023–2026' }],
  },
  {
    id: 'izaac-wilkinson',
    name: 'Izaac Wilkinson',
    appointments: [{ program: 'ysp', years: '2025' }],
  },
  {
    id: 'charly-bisson',
    name: 'Charly Bisson',
    appointments: [{ program: 'ysp', years: '2025' }],
  },
  {
    id: 'iris-cabral',
    name: 'Iris Cabral',
    appointments: [{ program: 'ysp', years: '2025' }],
  },
  {
    id: 'syeda-ameena-hashmi',
    name: 'Syeda Ameena Hashmi',
    appointments: [
      { program: 'visiting', years: '2024–2025' },
      { program: 'ysp', years: '2024' },
    ],
  },
  {
    id: 'jonathan-fussel',
    name: 'Jonathan Fussel',
    appointments: [{ program: 'ysp', years: '2024' }],
  },
  {
    id: 'niyati-mule',
    name: 'Niyati Mule',
    appointments: [{ program: 'ysp', years: '2024' }],
  },
  {
    id: 'bhawana-paudel',
    name: 'Bhawana Paudel',
    appointments: [{ program: 'ysp', years: '2024' }],
  },
  {
    id: 'pramesh-sharma',
    name: 'Pramesh Sharma',
    appointments: [{ program: 'ysp', years: '2024' }],
  },
  {
    id: 'allison-tee',
    name: 'Allison Tee',
    appointments: [
      { program: 'visiting', years: '2023–2024' },
      { program: 'ysp', years: '2023' },
    ],
  },
  {
    id: 'caner-karabasoglu',
    name: 'Caner Karabaşoğlu',
    appointments: [{ program: 'visiting', years: '2023–2024' }],
  },
  {
    id: 'ali-ergul',
    name: 'Ali Ergül',
    appointments: [{ program: 'visiting', years: '2023–2024' }],
  },
];
