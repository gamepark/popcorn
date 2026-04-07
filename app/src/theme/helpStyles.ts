import { css, keyframes } from '@emotion/react'
import { colors } from './colors'

// ─── GOLD SHIMMER ANIMATION ───
const shimmer = keyframes`
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`

// ─── HEADER VARIANTS ───
const headerBase = css`
  padding: 0.9em 1.1em 0.7em;
  border-radius: 0.5em 0.5em 0 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.15em;
    background: linear-gradient(
      90deg,
      ${colors.goldDark} 0%,
      ${colors.gold} 20%,
      ${colors.goldLight} 40%,
      ${colors.gold} 60%,
      ${colors.goldDark} 80%,
      ${colors.gold} 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 4s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: -2em;
    right: -1em;
    width: 8em;
    height: 8em;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 65%);
    pointer-events: none;
  }
`

export const headerRedCss = css`
  ${headerBase};
  background: linear-gradient(135deg, ${colors.red} 0%, ${colors.redDeep} 100%);
`

export const headerNavyCss = css`
  ${headerBase};
  background: linear-gradient(135deg, ${colors.blueDark} 0%, ${colors.blueDarker} 100%);
`

export const headerDarkCss = css`
  ${headerBase};
  background: linear-gradient(135deg, ${colors.darkWarm} 0%, ${colors.dark} 100%);
`

// ─── HEADER ELEMENTS ───
export const headerTitleCss = css`
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 1.55em;
  color: white;
  text-shadow: 0 0.06em 0.15em rgba(0, 0, 0, 0.3);
  line-height: 1.05;
  letter-spacing: 0.02em;
  margin: 0;
`

export const headerSubCss = css`
  font-family: 'Crimson Pro', serif;
  font-style: italic;
  font-weight: 300;
  font-size: 0.88em;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 0.15em;
`

export const headerRowCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const badgeCss = css`
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  background: rgba(0, 0, 0, 0.22);
  padding: 0.2em 0.7em 0.2em 0.45em;
  border-radius: 1em;
  font-family: 'Lilita One', cursive;
  font-size: 0.6em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.6em;
`

export const badgeDotCss = css`
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
  border: 0.08em solid rgba(255, 255, 255, 0.45);
  flex-shrink: 0;
`

// ─── PRICE TAG ───
export const priceTagCss = css`
  background: linear-gradient(145deg, ${colors.goldLight}, ${colors.gold}, ${colors.goldDark});
  padding: 0.25em 0.75em;
  border-radius: 1.2em;
  font-family: 'Lilita One', cursive;
  font-size: 1.1em;
  color: white;
  text-shadow: 0 0.06em 0.12em rgba(0, 0, 0, 0.3);
  box-shadow:
    0 0.1em 0.4em rgba(0, 0, 0, 0.2),
    inset 0 0.06em 0 rgba(255, 255, 255, 0.2);
`

// ─── SEAT ICON ───
export const seatIconCss = css`
  width: 2.6em;
  height: 2.6em;
  background: linear-gradient(160deg, ${colors.red} 20%, ${colors.redDeep} 100%);
  border-radius: 0.55em 0.55em 0.2em 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow:
    inset 0 0.15em 0 rgba(255, 255, 255, 0.12),
    inset 0 -0.2em 0 rgba(0, 0, 0, 0.2),
    0 0.15em 0.5em rgba(0, 0, 0, 0.25);
  font-family: 'Lilita One', cursive;
  font-size: 1.2em;
  color: white;
  text-shadow: 0 0.06em 0.12em rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    bottom: -0.22em;
    left: 0.35em;
    right: 0.35em;
    height: 0.22em;
    background: linear-gradient(180deg, ${colors.goldDark}, ${colors.gold});
    border-radius: 0 0 0.12em 0.12em;
  }
`

// ─── BODY ───
export const helpBodyCss = css`
  padding: 0.9em 1.1em 1.1em;
  color: ${colors.dark};
  line-height: 1.6;
`

// ─── SECTION HEADER (h4) ───
export const sectionHeaderCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.65em;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${colors.redDeep};
  margin: 1.1em 0 0.45em;
  padding-bottom: 0.3em;
  border-bottom: 0.06em solid rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 0.5em;

  &::before {
    content: '';
    width: 0.35em;
    height: 0.35em;
    background: ${colors.gold};
    border-radius: 50%;
    flex-shrink: 0;
  }
`

// ─── INFO PILLS ───
export const pillsCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
  margin: 0.5em 0 0.7em;
`

export const pillCss = css`
  display: inline-flex;
  align-items: baseline;
  gap: 0.35em;
  padding: 0.3em 0.7em;
  background: rgba(0, 0, 0, 0.04);
  border: 0.06em solid rgba(0, 0, 0, 0.07);
  border-radius: 0.35em;
`

export const pillLabelCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.5em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.35);
  line-height: 1;
`

export const pillValueCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.92em;
  color: ${colors.dark};
`

export const pillValuePriceCss = css`
  ${pillValueCss};
  color: ${colors.green};
`

export const pillValueRedCss = css`
  ${pillValueCss};
  color: ${colors.red};
`

export const pillDotCss = css`
  width: 0.6em;
  height: 0.6em;
  border-radius: 50%;
  border: 0.06em solid rgba(0, 0, 0, 0.12);
  flex-shrink: 0;
`

// ─── TABLE ───
export const tableCss = css`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0.4em 0;
`

export const tableHeadCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.55em;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.3);
  padding: 0.5em 0.6em;
  text-align: left;
  border-bottom: 0.06em solid rgba(0, 0, 0, 0.08);
  font-weight: 400;
`

export const tableHeadCenterCss = css`
  ${tableHeadCss};
  text-align: center;
`

export const tableCellCss = css`
  padding: 0.5em 0.6em;
  vertical-align: middle;
  font-size: 0.9em;
  color: rgba(26, 10, 10, 0.72);
  text-align: center;

  &:last-child {
    text-align: left;
  }
`

export const tableRowHoverCss = css`
  transition: background 0.15s;

  &:nth-of-type(even) {
    background: rgba(0, 0, 0, 0.03);
  }

  &:hover {
    background: rgba(212, 168, 40, 0.08);
  }
`

// ─── NUM BADGE ───
export const numBadgeCss = css`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: 0.06em solid rgba(0, 0, 0, 0.08);
  font-family: 'Lilita One', cursive;
  font-size: 0.7em;
  color: ${colors.redDeep};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`

// ─── AVAILABILITY BADGE ───
export const availYesCss = css`
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: 700;
  background: #c8e6c9;
  color: #2e7d32;
`

export const availNoCss = css`
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: 700;
  background: #ffcdd2;
  color: #c62828;
`

// ─── ACTION ICON ───
export const actionIconCss = css`
  width: 1.5em;
  height: 1.5em;
  border-radius: 0.3em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: 700;
  border: 0.06em solid rgba(0, 0, 0, 0.06);
`

export const actionIconMoneyCss = css`
  ${actionIconCss};
  background: #e8f5e9;
  color: ${colors.green};
`

export const actionIconPopcornCss = css`
  ${actionIconCss};
  background: #fff3e0;
  color: ${colors.red};
`

export const actionIconAudienceCss = css`
  ${actionIconCss};
  background: #e3f2fd;
  color: ${colors.teal};
`

export const actionIconMovieCss = css`
  ${actionIconCss};
  background: #f3e5f5;
  color: #7b1fa2;
`

// ─── SEAT NUMBER ───
export const seatNumCss = css`
  width: 1.4em;
  height: 1.25em;
  background: linear-gradient(180deg, ${colors.red} 30%, ${colors.redDeep});
  border-radius: 0.25em 0.25em 0.1em 0.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lilita One', cursive;
  font-size: 0.65em;
  color: white;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0.06em 0.15em rgba(0, 0, 0, 0.15);

  &::after {
    content: '';
    position: absolute;
    bottom: -0.12em;
    left: 0.15em;
    right: 0.15em;
    height: 0.12em;
    background: ${colors.goldDark};
    border-radius: 0 0 0.06em 0.06em;
  }
`

// ─── GUEST PAWN (MEEPLE) ───
export const pawnCss = css`
  width: 0.8em;
  height: 1em;
  border-radius: 45% 45% 0.08em 0.08em;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.25em;
  position: relative;
  box-shadow: 0 0.04em 0.1em rgba(0, 0, 0, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: -0.3em;
    left: 50%;
    transform: translateX(-50%);
    width: 0.45em;
    height: 0.45em;
    border-radius: 50%;
    background: inherit;
    box-shadow: inherit;
  }
`

// ─── TEAR LINE ───
export const tearLineCss = css`
  position: relative;
  height: 0;
  margin: 0.8em 0;
  border-top: 0.1em dashed rgba(0, 0, 0, 0.1);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -0.45em;
    width: 0.9em;
    height: 0.9em;
    background: var(--gp-dialog-bg, ${colors.cream});
    border-radius: 50%;
    box-shadow: inset 0 0.03em 0.06em rgba(0, 0, 0, 0.06);
  }
  &::before {
    left: -1.1em;
  }
  &::after {
    right: -1.1em;
  }
`

// ─── SCORE ROWS ───
export const scoreRowCss = css`
  display: flex;
  align-items: center;
  padding: 0.45em 0.55em;
  border-radius: 0.35em;
  margin-bottom: 0.1em;
  transition: background 0.15s;
  &:hover {
    background: rgba(212, 168, 40, 0.06);
  }
`

export const scoreIconCss = css`
  width: 1.7em;
  height: 1.7em;
  border-radius: 0.35em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85em;
  margin-right: 0.55em;
  flex-shrink: 0;
  border: 0.06em solid rgba(0, 0, 0, 0.06);
`

export const scoreCategoryCss = css`
  flex: 1;
  color: rgba(26, 10, 10, 0.55);
  font-size: 0.88em;
`

export const scoreValueCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 1.2em;
  color: ${colors.dark};
  min-width: 2em;
  text-align: right;
`

// ─── TOTAL BAR ───
export const totalBarCss = css`
  margin-top: 0.5em;
  padding: 0.55em 0.85em;
  background: linear-gradient(135deg, rgba(212, 168, 40, 0.15), rgba(212, 168, 40, 0.05));
  border: 0.06em solid rgba(212, 168, 40, 0.22);
  border-radius: 0.45em;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.1em;
    background: linear-gradient(90deg, ${colors.goldDark}, ${colors.goldLight}, ${colors.goldDark});
  }
`

export const totalLabelCss = css`
  flex: 1;
  font-family: 'Lilita One', cursive;
  font-size: 0.75em;
  color: ${colors.goldDark};
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const totalValueCss = css`
  font-family: 'Playfair Display', serif;
  font-size: 1.8em;
  font-weight: 900;
  color: ${colors.goldDark};
  text-shadow: 0 0.04em 0.2em rgba(212, 168, 40, 0.2);
`

// ─── BODY TEXT DEFAULTS ───
export const bodyTextCss = css`
  margin: 0.3em 0;
  color: rgba(26, 10, 10, 0.72);
  font-size: 0.92em;
`

export const bodyStrongCss = css`
  color: ${colors.dark};
  font-weight: 700;
`

// ─── PLAYER HEADER ───
export const playerRowCss = css`
  display: flex;
  align-items: center;
  gap: 0.6em;
`

export const avatarCss = css`
  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;
  background: linear-gradient(145deg, #5eaab8, #3a8a98);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lilita One', cursive;
  font-size: 0.85em;
  color: white;
  border: 0.14em solid ${colors.gold};
  box-shadow: 0 0.1em 0.4em rgba(0, 0, 0, 0.3);
`
