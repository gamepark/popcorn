import { css } from '@emotion/react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DialogNavigationProps } from '@gamepark/react-game'
import { FC } from 'react'
import { colors } from './colors'

export const PopcornNavigation: FC<DialogNavigationProps> = ({ onPrevious, onNext, currentIndex, total }) => {
  return (
    <div css={navBarCss}>
      <button css={navBtnCss} onClick={onPrevious} disabled={!onPrevious}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div css={navCenterCss}>
        <div css={dotsCss}>
          {Array.from({ length: Math.min(total, 10) }, (_, i) => (
            <div key={i} css={[dotCss, i === Math.min(currentIndex, 9) && dotActiveCss]} />
          ))}
        </div>
        <span css={counterCss}>
          {currentIndex + 1} / {total}
        </span>
      </div>
      <button css={navBtnCss} onClick={onNext} disabled={!onNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

const navBarCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 0.5em 1.5em;
  background: ${colors.darkWarm};
  border-top: 0.12em solid ${colors.gold};
  border-radius: 0 0 0.7rem 0.7rem;
  font-size: min(calc(2.5em * var(--gp-scale)), 2vh);
`

const navBtnCss = css`
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  border: 0.1em solid ${colors.gold};
  background: transparent;
  color: ${colors.gold};
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;

  &:hover:not(:disabled) {
    background: rgba(212, 168, 40, 0.2);
    color: ${colors.goldLight};
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }
`

const navCenterCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
`

const dotsCss = css`
  display: flex;
  gap: 0.3em;
`

const dotCss = css`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
`

const dotActiveCss = css`
  background: ${colors.gold};
  width: 1.1em;
  border-radius: 0.25em;
`

const counterCss = css`
  font-family: 'Lilita One', cursive;
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.12em;
`
