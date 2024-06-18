/** @type {import('tailwindcss').Config} */

const REM_BASE = 10;
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px, base = REM_BASE) => `${round(px / base)}rem`;
const stripUnit = (value) => parseInt(value, 10);
const media = (resolution, mobileFirst = true) => {
  if (mobileFirst) {
    return `@media (min-width: ${stripUnit(resolution)}px)`;
  }

  return `@media (max-width: ${stripUnit(resolution) - 1}px)`;
};

const extraSizes = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '15/12': '125%',
  '1/10': '10%',
  '2/10': '20%',
  '3/10': '30%',
  '4/10': '40%',
  '5/10': '50%',
  '6/10': '60%',
  '7/10': '70%',
  '8/10': '80%',
  '9/10': '90%',
};

const SPACING = {
  full: '100%',
  0: 0,
  1: '1px',
  2: '2px',
  3: '3px',
  4: rem(4),
  5: rem(5),
  6: rem(6),
  7: rem(7),
  8: rem(8),
  9: rem(9),
  10: rem(10),
  11: rem(11),
  12: rem(12),
  13: rem(13),
  14: rem(14),
  15: rem(15),
  16: rem(16),
  17: rem(17),
  18: rem(18),
  20: rem(20),
  21: rem(21),
  22: rem(22),
  24: rem(24),
  25: rem(25),
  28: rem(28),
  30: rem(30),
  31: rem(31),
  34: rem(34),
  38: rem(38),
  39: rem(39),
  35: rem(35),
  40: rem(40),
  41: rem(41),
  45: rem(45),
  48: rem(48),
  50: rem(50),
  51: rem(51),
  55: rem(55),
  60: rem(60),
  65: rem(65),
  67: rem(67),
  70: rem(70),
  72: rem(72),
  74: rem(74),
  75: rem(75),
  80: rem(80),
  84: rem(84), 
  85: rem(85),
  90: rem(90),
  95: rem(95),
  100: rem(100),
  105: rem(105),
  110: rem(110),
  115: rem(115),
  120: rem(120),
  130: rem(130),
  140: rem(140),
  145: rem(145),
  150: rem(150),
  160: rem(160),
  170: rem(170),
  180: rem(180),
  190: rem(190),
  200: rem(200),
  220: rem(220),
  240: rem(240),
  250: rem(250),
  300: rem(300),
  310: rem(310),
  320: rem(320),
  325: rem(325),
  400: rem(400),
  440: rem(440),
  500: rem(500),
  550: rem(550),
  600: rem(600),
  640: rem(640),
  700: rem(700),
  800: rem(800),
  900: rem(900),
  1000: rem(1000),
  'vh-static': 'var(--vh-static)',
  'vh-dynamic': 'var(--vh-dynamic)',
};

const OPACITY = {
  0: '0',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
};




module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      opacity: OPACITY,
      borderOpacity: OPACITY,
      height: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        section: 'calc(100vh - 7.8rem)',
        'section-mobile': 'calc(100vh - 5rem)',
        screen: '100svh'
      }),
      minHeight: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        section: 'calc(100vh - 7.8rem)',
        'section-mobile': 'calc(100vh - 5rem)',
        screen: '100svh'
      }),
      width: {
        screen: '100vw',
        section: '100%',
      },
      minWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        section: '100%',
      }),
      maxWidth: (theme, { breakpoints }) => ({
        ...breakpoints(theme('screens')),
        ...SPACING,
        ...extraSizes,
        section: '100%',
      }),
      spacing: {
        ...SPACING,
        ...extraSizes,
      },
      inset: (theme) => ({
        '1/2': '50%',
        ...SPACING,
        ...extraSizes,
        ...theme('spacing'),
        ...theme('width'),
      }),
      colors: {
        current: 'currentColor',
        inherit: 'inherit',
        transparent: 'transparent',
        white: '#fff',
        black: {
          ...Object.keys(OPACITY).reduce((acc, key) => ({ ...acc, [`${key}0`]: `rgba(0,0,0, ${OPACITY[key]})` }), {}),
          DEFAULT: '#000',
        },
        bg: "#2B2B2B",
        bgSecondary: "#3B3B3B",
        captionText: "#858584",
        action: "#A259FF",
        footerText: '#CCCCCC',
        green: '#00AC4F'
      },
      screens: {
        xs: '375px',
        sm: '520px',
        md: '768px',
        lg: '1024px',
        laptop: '1280px',
        xl: '1366px',
        '2xl': '1440px',
        fhd: '1920px',
        'h-min': { raw: '(max-height: 800px) and (min-width: 1280px)' },
        land: { raw: '(orientation: landscape) and (max-width: 1023px)' },
      },
      fontSize: {
        xxs: rem(8),
        xs: rem(12),
        sm: rem(14),
        base: rem(16),
        md: rem(22),
        lg: rem(28),
        xl: rem(38),
        '4xl': rem(51),
        '7xl': rem(67),
      },
      lineHeight: {
        xs: '0.8',
        none: '1',
        tight: '1.1',
        small: '1.2',
        base: '1.3',
        relaxed: '1.4',
        loose: '1.6',
        high: '1.7',
      },
      letterSpacing: {
        tightest: '-0.07em',
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        high: '0.01em',
        higher: '0.02em',
        highest: '0.04em',
      },
      borderRadius: {
        none: '0',
        xs: '0.4rem',
        sm: '0.5rem',
        DEFAULT: '1rem',
        md: '1.2rem',
        lg: '1.5rem',
        xl: '3rem',
        full: '9999px',
        img: '2rem'
      },
      fontFamily: {
        'main': ["Work Sans", "sans-serif"],
        'secondary': ["Space Mono", 'monospace']
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        fadeInOut: 'fadeInOut 0.5s ease-in-out',
      },

    
    
    },
    
  },
  plugins: [
    ({ addComponents, theme, addBase }) => {
        addBase({
        html: {
          fontSize: `${REM_BASE}px`,
          marginTop: '0 !important',
          

          [media(theme('screens.2xl'))]: {
            fontSize: `${1000 / stripUnit(theme('screens.2xl'))}vw`,
          },
        },

        'html, body': {
          width: '100%',
          height: '100%',
          minHeight: '100%',
        },

        body: {
          color: theme('colors.gray[900]'),
          backgroundColor: theme('colors.gray[100]'),
          lineHeight: theme('lineHeight.relaxed'),
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.main'),
          fontWeight: theme('fontWeight.normal'),
          '-webkit-font-smoothing': 'antialiased',
          marginRight: '0 !important',

          [media(theme('screens.lg'))]: {
            fontSize: theme('fontSize.xl'),
          },
        },
        h1: {
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.7xl'),
          lineHeight: theme('lineHeight.tight'),
        },
        h2: {
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.4xl'),
          lineHeight: theme('lineHeight.tight'),
        },
        h3: {
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.xl'),
          lineHeight: theme('lineHeight.small'),
        },
        h4: {
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.lg'),
          lineHeight: theme('lineHeight.relaxed'),
        },
        h5: {
          fontWeight: theme('fontWeight.semibold'),
          fontSize: theme('fontSize.md'),
          lineHeight: theme('lineHeight.relaxed'),
        }

        });
    }
    
  ],
};