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
      film: MovieCard.BlueTheGodmother,
      filmName: MovieCard[MovieCard.BlueTheGodmother],
      expectedFilmColor: FilmColor.Blue,
      expectedFilmColorName: FilmColor[FilmColor.Blue]
    },
    {
      film: MovieCard.BlueHenrietta,
      filmName: MovieCard[MovieCard.BlueHenrietta],
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
      film: MovieCard.RedTheFuryOfTheSerpent,
      filmName: MovieCard[MovieCard.RedTheFuryOfTheSerpent],
      expectedFilmColor: FilmColor.Red,
      expectedFilmColorName: FilmColor[FilmColor.Red]
    },
    {
      film: MovieCard.RedFinalLasso,
      filmName: MovieCard[MovieCard.RedFinalLasso],
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
      film: MovieCard.YellowSchoolOfZombies,
      filmName: MovieCard[MovieCard.YellowSchoolOfZombies],
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
      film: MovieCard.FirstMovieGreenEndOfTheWorld,
      filmName: MovieCard[MovieCard.FirstMovieGreenEndOfTheWorld],
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
      film: MovieCard.RedTheVolcano,
      filmName: MovieCard[MovieCard.RedTheVolcano],
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
      film: MovieCard.BlueMe,
      filmName: MovieCard[MovieCard.BlueMe],
      expectedBonusCondition: BonusCondition.None,
      expectedBonusConditionName: BonusCondition[BonusCondition.None]
    },
    {
      film: MovieCard.GreenBadman,
      filmName: MovieCard[MovieCard.GreenBadman],
      expectedBonusCondition: BonusCondition.OneSeatTheater,
      expectedBonusConditionName: BonusCondition[BonusCondition.OneSeatTheater]
    },
    {
      film: MovieCard.RedTheCursedPegleg,
      filmName: MovieCard[MovieCard.RedTheCursedPegleg],
      expectedBonusCondition: BonusCondition.TwoSeatTheater,
      expectedBonusConditionName: BonusCondition[BonusCondition.TwoSeatTheater]
    },
    {
      film: MovieCard.YellowTheFirePrincess,
      filmName: MovieCard[MovieCard.YellowTheFirePrincess],
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
      film: MovieCard.Blue5678,
      filmName: MovieCard[MovieCard.Blue5678],
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
      film: MovieCard.RedTheWorkdAfter,
      filmName: MovieCard[MovieCard.RedTheWorkdAfter],
      expectedBonusAction: FilmAction.Get1Money,
      expectedBonusActionName: FilmAction[FilmAction.Get1Money]
    },
    {
      film: MovieCard.Yellow28InTheFamily,
      filmName: MovieCard[MovieCard.Yellow28InTheFamily],
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
      film: MovieCard.FirstMovieGreenEndOfTheWorld,
      filmName: MovieCard[MovieCard.FirstMovieGreenEndOfTheWorld],
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
      film: MovieCard.FirstMovieRedItSMyWar,
      filmName: MovieCard[MovieCard.FirstMovieRedItSMyWar],
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
      film: MovieCard.BlueHenrietta,
      filmName: MovieCard[MovieCard.BlueHenrietta],
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
      film: MovieCard.GreenTheBarbarian,
      filmName: MovieCard[MovieCard.GreenTheBarbarian],
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
