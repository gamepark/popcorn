import { HeaderText } from '@gamepark/react-game'
import { FC } from 'react'

export const DiscardAwardCardHeader: FC = () => (
  <HeaderText
    code="header.actionRules.discardAwardCard"
    defaults={{
      you: 'You must place one of the two award cards you received under the deck',
      player: '{player} must place one of the two award cards they received under the deck',
      players: 'Players must place one of the two award cards they received under the deck'
    }}
  />
)
