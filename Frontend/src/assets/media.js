const partnerFiles = [
  '3s.png',
  'Horizons.png',
  'Managers.png',
  'asteel flash.png',
  'atb.png',
  'cognira.png',
  'euranova.png',
  'finlogik.png',
  'habemus.png',
  'infor.png',
  'instadeep.png',
  'io.jpg',
  'iobeya.png',
  'logo-Startup-village.png',
  'machinestalk.png',
  'minotore.png',
  'newAccess.png',
  'novastore.png',
  'opus.png',
  'smt.png',
  'stb.png',
  'talan.png',
  'uib.png',
]

const toLabel = (filename) =>
  filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const media = {
  logos: {
    primary: '/assets/eje-logo/logo-primary.svg',
    mark: '/assets/eje-logo/logo-mark.svg',
  },
  images: {
    hero: '/assets/images/hero.jpg',
    aboutPrimary: '/assets/images/EJE-stand.jpg',
    aboutSecondary: '/assets/images/EJE-cover-photo-2.jpg',
    milestone: '/assets/images/20th Generation.png',
  },
  documents: {
    statuts: '/assets/Documents/statuts.pdf',
    politiqueRse: '/assets/Documents/politique-rse.pdf',
  },
  partners: partnerFiles.map((file) => ({
    name: toLabel(file),
    src: `/assets/partner-logos/${encodeURIComponent(file)}`,
  })),
}
