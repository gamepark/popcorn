import {
  BonusCondition,
  FilmAction,
  FilmColor,
  getBonusAction,
  getBonusCondition,
  getFilmColor,
  getFirstAction,
  getFourthAction,
  getPrice,
  getSecondAction,
  getThirdAction,
  MovieCard
} from '../src/material/MovieCard'

describe('Movie card tests', () => {
  test.each([
    {
      film: MovieCard.BlueLaMarraine,
      filmName: MovieCard[MovieCard.BlueLaMarraine],
      expectedFilmColor: FilmColor.Blue,
      expectedFilmColorName: FilmColor[FilmColor.Blue]
    },
    {
      film: MovieCard.BluePoupoule,
      filmName: MovieCard[MovieCard.BluePoupoule],
      expectedFilmColor: FilmColor.Blue,
      expectedFilmColorName: FilmColor[FilmColor.Blue]
    },
    {
      film: MovieCard.GreenKingOfTokyo,
      filmName: MovieCard[MovieCard.GreenKingOfTokyo],
      expectedFilmColor: FilmColor.Green,
      expectedFilmColorName: FilmColor[FilmColor.Green]
    },
    {
      film: MovieCard.GreenWitchesVsCheerleaders,
      filmName: MovieCard[MovieCard.GreenWitchesVsCheerleaders],
      expectedFilmColor: FilmColor.Green,
      expectedFilmColorName: FilmColor[FilmColor.Green]
    },
    {
      film: MovieCard.RedLaFureurDuSerpent,
      filmName: MovieCard[MovieCard.RedLaFureurDuSerpent],
      expectedFilmColor: FilmColor.Red,
      expectedFilmColorName: FilmColor[FilmColor.Red]
    },
    {
      film: MovieCard.RedLassoFinal,
      filmName: MovieCard[MovieCard.RedLassoFinal],
      expectedFilmColor: FilmColor.Red,
      expectedFilmColorName: FilmColor[FilmColor.Red]
    },
    {
      film: MovieCard.YellowFrenchKiss,
      filmName: MovieCard[MovieCard.YellowFrenchKiss],
      expectedFilmColor: FilmColor.Yellow,
      expectedFilmColorName: FilmColor[FilmColor.Yellow]
    },
    {
      film: MovieCard.YellowLEcoleDesZombies,
      filmName: MovieCard[MovieCard.YellowLEcoleDesZombies],
      expectedFilmColor: FilmColor.Yellow,
      expectedFilmColorName: FilmColor[FilmColor.Yellow]
    }
  ])('Given $filmName, getFilmColor() should return $expectedFilmColorName', ({ film, expectedFilmColor }) => {
    // When
    const color = getFilmColor(film)

    // Then
    expect(color).toEqual(expectedFilmColor)
  })

  test.each([
    {
      film: MovieCard.FirstMovieGreenLaFinDuMonde,
      filmName: MovieCard[MovieCard.FirstMovieGreenLaFinDuMonde],
      expectedPrice: 0
    },
    {
      film: MovieCard.BlueControlZ,
      filmName: MovieCard[MovieCard.BlueControlZ],
      expectedPrice: 3
    },
    {
      film: MovieCard.GreenAbracadab,
      filmName: MovieCard[MovieCard.GreenAbracadab],
      expectedPrice: 4
    },
    {
      film: MovieCard.RedLeVolcan,
      filmName: MovieCard[MovieCard.RedLeVolcan],
      expectedPrice: 2
    },
    {
      film: MovieCard.YellowKangarooMan,
      filmName: MovieCard[MovieCard.YellowKangarooMan],
      expectedPrice: 1
    }
  ])('Given $filmName, getPrice() should return $expectedPrice', ({ film, expectedPrice }) => {
    // Given
    const movie = film

    // When
    const price = getPrice(movie)

    // Then
    expect(price).toEqual(expectedPrice)
  })

  test.each([
    {
      film: MovieCard.BlueMoi,
      filmName: MovieCard[MovieCard.BlueMoi],
      expectedBonusCondition: BonusCondition.None,
      expectedBonusConditionName: BonusCondition[BonusCondition.None]
    },
    {
      film: MovieCard.GreenBadMan,
      filmName: MovieCard[MovieCard.GreenBadMan],
      expectedBonusCondition: BonusCondition.OneSeatTheater,
      expectedBonusConditionName: BonusCondition[BonusCondition.OneSeatTheater]
    },
    {
      film: MovieCard.RedLaJambeDeBoisMaudite,
      filmName: MovieCard[MovieCard.RedLaJambeDeBoisMaudite],
      expectedBonusCondition: BonusCondition.TwoSeatTheater,
      expectedBonusConditionName: BonusCondition[BonusCondition.TwoSeatTheater]
    },
    {
      film: MovieCard.YellowLaPrincessDeFeu,
      filmName: MovieCard[MovieCard.YellowLaPrincessDeFeu],
      expectedBonusCondition: BonusCondition.ThreeSeatTheater,
      expectedBonusConditionName: BonusCondition[BonusCondition.ThreeSeatTheater]
    }
  ])('Given $filmName, getBonusCondidition should return $expectedBonusConditionName', ({ film, expectedBonusCondition }) => {
    // When
    const condition = getBonusCondition(film)

    // Then
    expect(condition).toEqual(expectedBonusCondition)
  })

  test.each([
    {
      film: MovieCard.Blue1234,
      filmName: MovieCard[MovieCard.Blue1234],
      expectedBonusAction: FilmAction.AudienceTrackAdvance,
      expectedBonusActionName: FilmAction[FilmAction.AudienceTrackAdvance]
    },
    {
      film: MovieCard.GreenIntergalactic,
      filmName: MovieCard[MovieCard.GreenIntergalactic],
      expectedBonusAction: FilmAction.Get4Popcorn,
      expectedBonusActionName: FilmAction[FilmAction.Get4Popcorn]
    },
    {
      film: MovieCard.RedLeMondeDApres,
      filmName: MovieCard[MovieCard.RedLeMondeDApres],
      expectedBonusAction: FilmAction.Get1Money,
      expectedBonusActionName: FilmAction[FilmAction.Get1Money]
    },
    {
      film: MovieCard.Yellow28DansLaFamille,
      filmName: MovieCard[MovieCard.Yellow28DansLaFamille],
      expectedBonusAction: FilmAction.DrawAwardCard,
      expectedBonusActionName: FilmAction[FilmAction.DrawAwardCard]
    }
  ])('Given $filmName, getBonusAction() should return $expectedBonusActionName', ({ film, expectedBonusAction }) => {
    // When
    const action = getBonusAction(film)

    // Then
    expect(action).toEqual(expectedBonusAction)
  })

  test.each([
    {
      film: MovieCard.FirstMovieBlueRosebud,
      filmName: MovieCard[MovieCard.FirstMovieBlueRosebud],
      expectedFirstAction: FilmAction.AudienceTrackAdvance,
      expectedFirstActionName: FilmAction[FilmAction.AudienceTrackAdvance],
      expectedSecondAction: FilmAction.AdvertisingTokenOnBlueGuest,
      expectedSecondActionName: FilmAction[FilmAction.AdvertisingTokenOnBlueGuest],
      expectedThirdAction: FilmAction.Get2Money,
      expectedThirdActionName: FilmAction[FilmAction.Get2Money],
      expectedFourthAction: FilmAction.None,
      expectedFourthActionName: FilmAction[FilmAction.None]
    },
    {
      film: MovieCard.FirstMovieGreenLaFinDuMonde,
      filmName: MovieCard[MovieCard.FirstMovieGreenLaFinDuMonde],
      expectedFirstAction: FilmAction.AudienceTrackAdvance,
      expectedFirstActionName: FilmAction[FilmAction.AudienceTrackAdvance],
      expectedSecondAction: FilmAction.AdvertisingTokenOnGreenGuest,
      expectedSecondActionName: FilmAction[FilmAction.AdvertisingTokenOnGreenGuest],
      expectedThirdAction: FilmAction.Get2Money,
      expectedThirdActionName: FilmAction[FilmAction.Get2Money],
      expectedFourthAction: FilmAction.None,
      expectedFourthActionName: FilmAction[FilmAction.None]
    },
    {
      film: MovieCard.FirstMovieRedCEstMaGuerre,
      filmName: MovieCard[MovieCard.FirstMovieRedCEstMaGuerre],
      expectedFirstAction: FilmAction.AudienceTrackAdvance,
      expectedFirstActionName: FilmAction[FilmAction.AudienceTrackAdvance],
      expectedSecondAction: FilmAction.AdvertisingTokenOnRedGuest,
      expectedSecondActionName: FilmAction[FilmAction.AdvertisingTokenOnRedGuest],
      expectedThirdAction: FilmAction.Get2Money,
      expectedThirdActionName: FilmAction[FilmAction.Get2Money],
      expectedFourthAction: FilmAction.None,
      expectedFourthActionName: FilmAction[FilmAction.None]
    },
    {
      film: MovieCard.FirstMovieYellowModernLove,
      filmName: MovieCard[MovieCard.FirstMovieYellowModernLove],
      expectedFirstAction: FilmAction.AudienceTrackAdvance,
      expectedFirstActionName: FilmAction[FilmAction.AudienceTrackAdvance],
      expectedSecondAction: FilmAction.AdvertisingTokenOnYellowGuest,
      expectedSecondActionName: FilmAction[FilmAction.AdvertisingTokenOnYellowGuest],
      expectedThirdAction: FilmAction.Get2Money,
      expectedThirdActionName: FilmAction[FilmAction.Get2Money],
      expectedFourthAction: FilmAction.None,
      expectedFourthActionName: FilmAction[FilmAction.None]
    },
    {
      film: MovieCard.BluePoupoule,
      filmName: MovieCard[MovieCard.BluePoupoule],
      expectedFirstAction: FilmAction.None,
      expectedFirstActionName: FilmAction[FilmAction.None],
      expectedSecondAction: FilmAction.Get2Money,
      expectedSecondActionName: FilmAction[FilmAction.Get2Money],
      expectedThirdAction: FilmAction.AdvertisingTokenOnBlueGuest,
      expectedThirdActionName: FilmAction[FilmAction.AdvertisingTokenOnBlueGuest],
      expectedFourthAction: FilmAction.AdvertisingTokenOnWhiteGuestToBag,
      expectedFourthActionName: FilmAction[FilmAction.AdvertisingTokenOnWhiteGuestToBag]
    },
    {
      film: MovieCard.GreenLeBarbare,
      filmName: MovieCard[MovieCard.GreenLeBarbare],
      expectedFirstAction: FilmAction.None,
      expectedFirstActionName: FilmAction[FilmAction.None],
      expectedSecondAction: FilmAction.DrawGuestAndPlaceThem,
      expectedSecondActionName: FilmAction[FilmAction.DrawGuestAndPlaceThem],
      expectedThirdAction: FilmAction.Get2Money,
      expectedThirdActionName: FilmAction[FilmAction.Get2Money],
      expectedFourthAction: FilmAction.PlaceGuestInReserve,
      expectedFourthActionName: FilmAction[FilmAction.PlaceGuestInReserve]
    }
  ])(
    'Given $filmName, getFirstAction(), getSecondAction(), getThirdAction and getFourthAction should return respectively $expectedFirstActionName, $expectedSecondActionName, $expectedThirdActionName, $expectedFourthActionName',
    ({ film, expectedFirstAction, expectedSecondAction, expectedThirdAction, expectedFourthAction }) => {
      // When
      const firstAction = getFirstAction(film)
      const secondAction = getSecondAction(film)
      const thirdAction = getThirdAction(film)
      const fourthAction = getFourthAction(film)

      // Then
      expect(firstAction).toEqual(expectedFirstAction)
      expect(secondAction).toEqual(expectedSecondAction)
      expect(thirdAction).toEqual(expectedThirdAction)
      expect(fourthAction).toEqual(expectedFourthAction)
    }
  )
})
