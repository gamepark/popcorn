import { LocationType } from '../src/material/LocationType'
import { MovieAction, MovieCard, movieCardCharacteristics, MovieColor } from '../src/material/MovieCard'
import { TheaterTile } from '../src/material/TheaterTile'

describe('Movie card tests', () => {
  test.each([
    {
      film: MovieCard.BlueTheGodmother as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.BlueTheGodmother],
      expectedFilmColor: MovieColor.Blue,
      expectedFilmColorName: MovieColor[MovieColor.Blue]
    },
    {
      film: MovieCard.BlueHenrietta as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.BlueHenrietta],
      expectedFilmColor: MovieColor.Blue,
      expectedFilmColorName: MovieColor[MovieColor.Blue]
    },
    {
      film: MovieCard.GreenKingOfTokyo as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.GreenKingOfTokyo],
      expectedFilmColor: MovieColor.Green,
      expectedFilmColorName: MovieColor[MovieColor.Green]
    },
    {
      film: MovieCard.GreenWitchesVsCheerleaders as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.GreenWitchesVsCheerleaders],
      expectedFilmColor: MovieColor.Green,
      expectedFilmColorName: MovieColor[MovieColor.Green]
    },
    {
      film: MovieCard.RedTheFuryOfTheSerpent as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.RedTheFuryOfTheSerpent],
      expectedFilmColor: MovieColor.Red,
      expectedFilmColorName: MovieColor[MovieColor.Red]
    },
    {
      film: MovieCard.RedFinalLasso as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.RedFinalLasso],
      expectedFilmColor: MovieColor.Red,
      expectedFilmColorName: MovieColor[MovieColor.Red]
    },
    {
      film: MovieCard.YellowFrenchKiss as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.YellowFrenchKiss],
      expectedFilmColor: MovieColor.Yellow,
      expectedFilmColorName: MovieColor[MovieColor.Yellow]
    },
    {
      film: MovieCard.YellowSchoolOfZombies as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.YellowSchoolOfZombies],
      expectedFilmColor: MovieColor.Yellow,
      expectedFilmColorName: MovieColor[MovieColor.Yellow]
    }
  ])('Given $filmName, getFilmColor() should return $expectedFilmColorName', ({ film, expectedFilmColor }) => {
    // When
    const color = movieCardCharacteristics[film].getColor()

    // Then
    expect(color).toEqual(expectedFilmColor)
  })

  test.each([
    {
      film: MovieCard.FirstMovieGreenEndOfTheWorld as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.FirstMovieGreenEndOfTheWorld],
      expectedPrice: 0
    },
    {
      film: MovieCard.BlueControlZ as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.BlueControlZ],
      expectedPrice: 3
    },
    {
      film: MovieCard.GreenAbracadab as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.GreenAbracadab],
      expectedPrice: 4
    },
    {
      film: MovieCard.RedTheVolcano as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.RedTheVolcano],
      expectedPrice: 2
    },
    {
      film: MovieCard.YellowKangarooMan as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.YellowKangarooMan],
      expectedPrice: 1
    }
  ])('Given $filmName, getPrice() should return $expectedPrice', ({ film, expectedPrice }) => {
    // When
    const price = movieCardCharacteristics[film].getPrice(LocationType.FeaturesRowSpot)

    // Then
    expect(price).toEqual(expectedPrice)
  })

  test.each([
    {
      film: MovieCard.Blue5678 as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.Blue5678],
      theaterTile: TheaterTile.DefaultOneSeatTile,
      expectedBonusAction: MovieAction.AudienceTrackAdvance,
      expectedBonusActionName: MovieAction[MovieAction.AudienceTrackAdvance]
    },
    {
      film: MovieCard.GreenIntergalactic as Exclude<MovieCard, MovieCard.FinalShowing>,
      theaterTile: TheaterTile.ThreeSeatBlueBlueGrey,
      filmName: MovieCard[MovieCard.GreenIntergalactic],
      expectedBonusAction: MovieAction.Get4Popcorn,
      expectedBonusActionName: MovieAction[MovieAction.Get4Popcorn]
    },
    {
      film: MovieCard.RedTheWorldAfter as Exclude<MovieCard, MovieCard.FinalShowing>,
      theaterTile: TheaterTile.DefaultOneSeatTile,
      filmName: MovieCard[MovieCard.RedTheWorldAfter],
      expectedBonusAction: MovieAction.Get1Money,
      expectedBonusActionName: MovieAction[MovieAction.Get1Money]
    },
    {
      film: MovieCard.Yellow28InTheFamily as Exclude<MovieCard, MovieCard.FinalShowing>,
      theaterTile: TheaterTile.ThreeSeatBlueBlueGrey,
      filmName: MovieCard[MovieCard.Yellow28InTheFamily],
      expectedBonusAction: MovieAction.DrawAwardCard,
      expectedBonusActionName: MovieAction[MovieAction.DrawAwardCard]
    }
  ])('Given $filmName, getBonusAction() should return $expectedBonusActionName', ({ film, theaterTile, expectedBonusAction }) => {
    // When
    const action = movieCardCharacteristics[film].getBonusAction(theaterTile)

    // Then
    expect(action).toEqual(expectedBonusAction)
  })

  test.each([
    {
      film: MovieCard.FirstMovieBlueRosebud as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.FirstMovieBlueRosebud],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnBlueGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnBlueGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: undefined,
      expectedFourthActionName: 'undefined'
    },
    {
      film: MovieCard.FirstMovieGreenEndOfTheWorld as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.FirstMovieGreenEndOfTheWorld],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnGreenGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnGreenGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: undefined,
      expectedFourthActionName: 'undefined'
    },
    {
      film: MovieCard.FirstMovieRedItSMyWar as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.FirstMovieRedItSMyWar],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnRedGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnRedGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: undefined,
      expectedFourthActionName: 'undefined'
    },
    {
      film: MovieCard.FirstMovieYellowModernLove as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.FirstMovieYellowModernLove],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnYellowGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnYellowGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: undefined,
      expectedFourthActionName: 'undefined'
    },
    {
      film: MovieCard.BlueHenrietta as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.BlueHenrietta],
      expectedFirstAction: MovieAction.None,
      expectedFirstActionName: MovieAction[MovieAction.None],
      expectedSecondAction: MovieAction.Get2Money,
      expectedSecondActionName: MovieAction[MovieAction.Get2Money],
      expectedThirdAction: MovieAction.AdvertisingTokenOnBlueGuest,
      expectedThirdActionName: MovieAction[MovieAction.AdvertisingTokenOnBlueGuest],
      expectedFourthAction: MovieAction.AdvertisingTokenOnWhiteGuestToBag,
      expectedFourthActionName: MovieAction[MovieAction.AdvertisingTokenOnWhiteGuestToBag]
    },
    {
      film: MovieCard.GreenTheBarbarian as Exclude<MovieCard, MovieCard.FinalShowing>,
      filmName: MovieCard[MovieCard.GreenTheBarbarian],
      expectedFirstAction: MovieAction.None,
      expectedFirstActionName: MovieAction[MovieAction.None],
      expectedSecondAction: MovieAction.DrawGuestAndPlaceThem,
      expectedSecondActionName: MovieAction[MovieAction.DrawGuestAndPlaceThem],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: MovieAction.PlaceGuestInReserve,
      expectedFourthActionName: MovieAction[MovieAction.PlaceGuestInReserve]
    }
  ])(
    'Given $filmName, getFirstAction(), getSecondAction(), getThirdAction and getFourthAction should return respectively $expectedFirstActionName, $expectedSecondActionName, $expectedThirdActionName, $expectedFourthActionName',
    ({ film, expectedFirstAction, expectedSecondAction, expectedThirdAction, expectedFourthAction }) => {
      // When
      const testMovieCharacteristics = movieCardCharacteristics[film]
      const firstAction = testMovieCharacteristics.getAction(0)
      const secondAction = testMovieCharacteristics.getAction(1)
      const thirdAction = testMovieCharacteristics.getAction(2)
      const fourthAction = testMovieCharacteristics.getAction(3)

      // Then
      expect(firstAction).toEqual(expectedFirstAction)
      expect(secondAction).toEqual(expectedSecondAction)
      expect(thirdAction).toEqual(expectedThirdAction)
      expect(fourthAction).toEqual(expectedFourthAction)
    }
  )
})
