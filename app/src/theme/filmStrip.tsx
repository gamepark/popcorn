import { css } from '@emotion/react'
import { FC } from 'react'
import { colors } from './colors'

export const FilmStrip: FC = () => (
  <div css={filmStripCss}>
    {Array.from({ length: 30 }, (_, i) => (
      <i key={i} css={holeCss} />
    ))}
  </div>
)

const filmStripCss = css`
  background: ${colors.film};
  height: 1em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 0.3em;
  position: relative;
  flex-shrink: 0;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 0.04em;
    background: rgba(255, 255, 255, 0.08);
  }

  &::before {
    top: 0.12em;
  }
  &::after {
    bottom: 0.12em;
  }
`

const holeCss = css`
  display: block;
  width: 0.45em;
  height: 0.28em;
  background: ${colors.filmHole};
  border-radius: 0.06em;
  flex-shrink: 0;
  box-shadow: inset 0 0.03em 0 rgba(255, 255, 255, 0.04);
  font-style: normal;
`
