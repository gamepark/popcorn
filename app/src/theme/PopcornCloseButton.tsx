import { css } from '@emotion/react'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { colors } from './colors'

export const PopcornCloseButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button css={closeCss} onClick={onClick} aria-label="Close">
      <FontAwesomeIcon icon={faXmark} />
    </button>
  )
}

const closeCss = css`
  position: absolute;
  top: -1em;
  right: -1em;
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  border: 0.15em solid ${colors.gold};
  background: ${colors.red};
  color: white;
  font-size: min(calc(3em * var(--gp-scale)), 2.5vh);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
  line-height: 1;
  box-shadow: 0 0.2em 0.6em rgba(0, 0, 0, 0.5);
  padding: 0;

  svg {
    font-size: 1.2em;
  }

  &:hover {
    background: ${colors.redGlow};
    transform: scale(1.12);
    box-shadow: 0 0.25em 1em rgba(196, 30, 58, 0.4);
  }
`
