import { PopcornSetup } from '../../../src'
import { LocationType } from '../../../src/material/LocationType'
import { MaterialType } from '../../../src/material/MaterialType'
import { moneyTokens } from '../../../src/material/MoneyToken'
import { movieCardCharacteristics, PlayableMovieCardId } from '../../../src/material/MovieCard'
import { PopcornOptions } from '../../../src/PopcornOptions'
import { RuleId } from '../../../src/rules/RuleId'

export class PopcornEndPhaseWithNoMoneyForPlayersAndNoAdvertisingTokensSetup extends PopcornSetup {
  public setupMaterial(options: PopcornOptions): void {
    super.setupMaterial(options)
    const movieCardsMaterial = this.material(MaterialType.MovieCards)
    movieCardsMaterial
      .id<Required<PlayableMovieCardId>>((id) => movieCardCharacteristics[id.front].getPrice(LocationType.FeaturesRowSpot) === 0)
      .deleteItemsAtOnce()
    const movieCardDeck = movieCardsMaterial.location(LocationType.MovieCardDeckSpot).deck()
    const premiersRow = movieCardsMaterial.location(LocationType.PremiersRowSpot)
    const featuresRow = movieCardsMaterial.location(LocationType.FeaturesRowSpot)
    if (premiersRow.length < 3) {
      movieCardDeck.dealAtOnce(
        {
          type: LocationType.PremiersRowSpot
        },
        3 - premiersRow.length
      )
    }
    if (featuresRow.length < 3) {
      movieCardDeck.dealAtOnce(
        {
          type: LocationType.FeaturesRowSpot
        },
        3 - featuresRow.length
      )
    }
    this.game.players.forEach((player) => {
      const playerMoney = this.material(MaterialType.MoneyTokens).location(LocationType.PlayerMoneyPileSpot).player(player).money(moneyTokens)
      this.material(MaterialType.MoneyTokens).money(moneyTokens).removeMoney(playerMoney.count, {
        type: LocationType.PlayerMoneyPileSpot,
        player: player
      })
    })
  }

  public start(): void {
    this.startPlayerTurn(RuleId.EndOfRoundPhaseTheatricalRunRule, this.players[0])
  }
}
