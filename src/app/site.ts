export const siteConfig = {
  name: 'Voximir',
  title: 'Voximir',
  description:
    'Personal portfolio of Voximir, a developer building open-source tools, clean interfaces, and practical software projects.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.voximir.org').replace(/\/$/, ''),
  ogImage: '/img/profile.webp',
  github: 'https://github.com/voximir-p',
  instagram: 'https://www.instagram.com/voximir/',
  discord: 'https://discord.com/users/711114008954142752',
  facebook: 'https://web.facebook.com/pek.n.thach/',
} as const;

export const siteUrl = new URL(siteConfig.url);