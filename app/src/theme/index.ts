import { css, keyframes } from '@emotion/react'
import { addStylesheetUrl } from '@gamepark/react-game'
import redCarpetBackground from '../images/Background.jpg'
import { colors } from './colors'
import { PopcornCloseButton } from './PopcornCloseButton'
import { PopcornNavigation } from './PopcornNavigation'

addStylesheetUrl('https://fonts.googleapis.com/css2?family=Lilita+One&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap')

const dialogOpen = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`

const dialogClose = keyframes`
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.95); }
`

export const PopcornTheme = {
  root: {
    fontFamily: 'Mulish'
  },
  dialog: {
    backgroundColor: colors.cream,
    color: colors.dark,
    container: css`
      background: linear-gradient(170deg, ${colors.cream} 0%, ${colors.creamMid} 55%, ${colors.creamDark} 100%);
      border-radius: 1em;
      overflow: visible;
      box-shadow:
        0 0 0 0.06em rgba(212,168,40,0.35),
        0 0.15em 0 0.06em rgba(140,100,20,0.25),
        0 0.4em 1em rgba(0,0,0,0.35),
        0 1.5em 4em rgba(0,0,0,0.55);
      font-family: 'Crimson Pro', Georgia, serif;
    `,
    backdrop: css`
      background: rgba(10, 5, 5, 0.7);
    `,
    openAnimation: css`
      animation: ${dialogOpen} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.05) forwards;
    `,
    closeAnimation: css`
      animation: ${dialogClose} 0.25s ease-in forwards;
    `,
    closeButton: PopcornCloseButton,
    navigation: PopcornNavigation,
    content: css`
      > h2 {
        font-family: 'Playfair Display', serif;
        font-weight: 900;
        color: ${colors.dark};
      }

      > h4 {
        font-family: 'Lilita One', cursive;
        font-size: 0.65em;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: ${colors.redDeep};
        margin: 1.1em 0 0.45em;
        padding-bottom: 0.3em;
        border-bottom: 0.06em solid rgba(0,0,0,0.08);
      }

      > p {
        color: rgba(26,10,10,0.72);
      }

      strong {
        color: ${colors.dark};
      }

      > q {
        display: block;
        font-style: italic;
        color: rgba(26,10,10,0.45);
        text-align: center;
        margin-bottom: 0.8em;
      }
    `
  },
  palette: {
    primary: colors.red,
    primaryHover: colors.redGlow,
    primaryActive: colors.redDeep,
    primaryLight: colors.goldPale,
    primaryLighter: colors.cream,
    surface: colors.cream,
    onSurface: colors.dark,
    onSurfaceFocus: 'rgba(196,30,58,0.15)',
    onSurfaceActive: 'rgba(196,30,58,0.25)',
    danger: colors.redDeep,
    dangerHover: '#ffd7d7',
    dangerActive: '#ffbebe',
    disabled: '#999'
  },
  playerPanel: {
    activeRingColors: [colors.gold, colors.red] as [string, string]
  },
  header: {
    bar: css`
      background: linear-gradient(180deg, rgba(26,10,10,0.85), rgba(26,10,10,0.7));
      border-bottom: 0.06em solid rgba(212,168,40,0.3);
      font-family: 'Crimson Pro', Georgia, serif;
      color: ${colors.cream};
    `
  },
  menu: {},
  journal: {
    tab: css`
      font-family: 'Lilita One', cursive;
      font-size: 0.65em;
      letter-spacing: 0.05em;
    `,
    tabSelected: css`
      background: ${colors.red} !important;
      color: white !important;
      border-color: ${colors.red} !important;
    `
  }
}
