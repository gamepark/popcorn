import { HelpCard } from '@gamepark/popcorn/material/HelpCard.ts'
import { HelpCardDescription } from './HelpCardDescription.ts'
import phasesHelpCard from '../images/Cards/Movies/fr/HelpPhases.jpg'
import actionHelpCard from '../images/Cards/Movies/fr/HelpActions.jpg'

class FrenchHelpCardsDescription extends HelpCardDescription {
  images = {
    [HelpCard.PhaseHelp]: phasesHelpCard,
    [HelpCard.ActionsHelp]: actionHelpCard
  }
}

export const frenchHelpCardsDescription = new FrenchHelpCardsDescription()
