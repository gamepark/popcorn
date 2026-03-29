import { HelpCard } from '@gamepark/popcorn/material/HelpCard'
import { LocationType } from '@gamepark/popcorn/material/LocationType'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor'
import { RuleId } from '@gamepark/popcorn/rules/RuleId'
import { CardDescription } from '@gamepark/react-game'
import actionHelp from '../images/Cards/Movies/en/HelpActions.jpg'
import phaseHelp from '../images/Cards/Movies/en/HelpPhases.jpg'
import { HelpCardHelp } from './help/HelpCardHelp'

export class HelpCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, HelpCard, RuleId, PlayerColor> {
  width = 7
  height = 7

  images = {
    [HelpCard.PhaseHelp]: phaseHelp,
    [HelpCard.ActionsHelp]: actionHelp
  }

  staticItems = [
    {
      id: HelpCard.PhaseHelp,
      location: {
        type: LocationType.PhasesHelpCardSpot
      }
    },
    {
      id: HelpCard.ActionsHelp,
      location: {
        type: LocationType.ActionsHelpCardSpot
      }
    }
  ]

  help = HelpCardHelp
}

export const helpCardDescription = new HelpCardDescription()
