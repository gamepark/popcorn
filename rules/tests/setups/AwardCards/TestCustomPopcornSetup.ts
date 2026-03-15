import { MaterialGame, TutorialState } from '@gamepark/rules-api'
import { PopcornSetup } from '../../../src'
import { LocationType } from '../../../src/material/LocationType'
import { MaterialType } from '../../../src/material/MaterialType'
import { MovieCard, movieCardCharacteristics } from '../../../src/material/MovieCard'
import { TheaterTile, theaterTilesCharacteristics } from '../../../src/material/TheaterTile'
import { PlayerColor } from '../../../src/PlayerColor'
import { PopcornOptions } from '../../../src/PopcornOptions'
import { RuleId } from '../../../src/rules/RuleId'

export class TestCustomPopcornSetup extends PopcornSetup {
  private readonly player: PlayerColor
  private readonly movieIds: Exclude<MovieCard, MovieCard.FinalShowing>[]
  private readonly theaterTileIds: TheaterTile[]

  constructor(player: PlayerColor, movieIds: Exclude<MovieCard, MovieCard.FinalShowing>[], theaterTileIds: TheaterTile[]) {
    super()
    this.player = player
    this.movieIds = movieIds
    this.theaterTileIds = theaterTileIds
  }

  public override setup(
    _options?: PopcornOptions,
    tutorial?: TutorialState<PlayerColor, MaterialType, LocationType, RuleId>
  ): MaterialGame<PlayerColor, MaterialType, LocationType, RuleId> {
    return super.setup({ players: [{ id: this.player }] }, tutorial)
  }

  public override start(): void {}

  public override setupMaterial(_options: PopcornOptions): void {
    this.material(MaterialType.MovieCards).createItemsAtOnce(
      this.movieIds.map((movieId, index) => ({
        id: {
          front: movieId,
          back: movieCardCharacteristics[movieId].movieType
        },
        location: {
          type: LocationType.PlayerMovieCardArchiveSpot,
          player: this.player,
          x: index
        }
      }))
    )
    this.material(MaterialType.TheaterTiles).createItemsAtOnce(
      this.theaterTileIds.map((frontId, index) => ({
        id: {
          front: frontId,
          back: theaterTilesCharacteristics[frontId].getSeatsNumber()
        },
        location: {
          type: LocationType.TheaterTileSpotOnTopPlayerCinemaBoard,
          player: this.player,
          x: index
        }
      }))
    )
  }
}
