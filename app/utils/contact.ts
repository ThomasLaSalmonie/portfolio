/**
 * Contact surface — email + social links. Static, no form (RENOVATION.md #5).
 */
export const CONTACT_EMAIL = 'tlasalmonie@gmail.com';

export const LOCATION = 'Montréal, QC';

export type Social = {
  label: string;
  href: string;
  icon: string;
  handle: string;
};

export const socials: Social[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/ThomasLaSalmonie',
    icon: 'lucide:github',
    handle: '@ThomasLaSalmonie'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lasalmoniethomas/',
    icon: 'lucide:linkedin',
    handle: 'in/lasalmoniethomas'
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/tlasalmonie',
    icon: 'lucide:twitter',
    handle: '@tlasalmonie'
  }
];
