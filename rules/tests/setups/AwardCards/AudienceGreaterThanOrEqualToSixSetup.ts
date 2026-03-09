import { PopcornSetup } from '../../../src'
import { AwardCard } from '../../../src/material/AwardCard'
import { LocationType } from '../../../src/material/LocationType'
import { MaterialType } from '../../../src/material/MaterialType'
import { PopcornOptions } from '../../../src/PopcornOptions'

export class AudienceGreaterThanOrEqualToSixSetup extends PopcornSetup {
  public override setupMaterial(_options: PopcornOptions): void {
    this.material(MaterialType.AwardCards).createItem({
      id: AwardCard.AudienceGreaterThanOrEqualToSix,
      location: {
        type: LocationType.PlayerAwardCardHand,
        player: _options.players[0].id
      }
    })
    this.material(MaterialType.AudienceCubes).createItem({
      location: {
        type: LocationType.AudienceCubeSpotOnTopPlayerCinemaBoard,
        player: _options.players[0].id,
        x: 0
      }
    })
  }

  public override start(): void {}
}
