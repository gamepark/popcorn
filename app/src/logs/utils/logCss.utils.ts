import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { linkButtonCss } from '@gamepark/react-game'
import cyanBackground from '../../images/logs/cyanBackground.jpg'
import greenBackground from '../../images/logs/greenBackground.jpg'
import orangeBackground from '../../images/logs/orangeBackground.jpg'
import purpleBackground from '../../images/logs/purpleBackground.jpg'

const getBackgroundImageForPlayer = (player: PlayerColor) => {
  switch (player) {
    case PlayerColor.Cyan:
      return cyanBackground
    case PlayerColor.Green:
      return greenBackground
    case PlayerColor.Orange:
      return orangeBackground
    case PlayerColor.Purple:
      return purpleBackground
  }
}

export const playerLogBackground = (player: PlayerColor) => css`
  background:
    linear-gradient(to right, transparent, rgba(246, 239, 234, 0.8) 10%),
    url(${getBackgroundImageForPlayer(player)}) 0 0.25em / auto 4.5em repeat-x;
  color: black;
`

const textCss = css`
  color: black;
  text-shadow: #444 1px 1px 2px;
`

export const logContainerCss = [
  css`
    padding-right: 0.25em;
    vertical-align: middle;
    text-wrap: wrap;
  `,
  textCss
]

export const ruleLogContainerCss = [
  logContainerCss,
  css`
    color: white;
    text-shadow: none;
  `
]

export const popcornLinkCss = [linkButtonCss, textCss]

export const popcornRuleLinkCss = [
  linkButtonCss,
  css`
    color: white;
  `
]

export const materialComponentCss = css`
  display: inline-block;
  vertical-align: middle;
  font-size: 0.75em;
`

export const symbolCss = [
  materialComponentCss,
  css`
    height: 2.75em;
  `
]

export const guestPawnCss = [
  materialComponentCss,
  css`
    font-size: 1.25em;
  `
]
