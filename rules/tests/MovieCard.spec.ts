import {
  BonusCondition,
  MovieAction,
  MovieColor,
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
      expectedFilmColor: MovieColor.Blue,
      expectedFilmColorName: MovieColor[MovieColor.Blue]
    },
    {
      film: MovieCard.BlueHenrietta,
      filmName: MovieCard[MovieCard.BlueHenrietta],
      expectedFilmColor: MovieColor.Blue,
      expectedFilmColorName: MovieColor[MovieColor.Blue]
    },
    {
      film: MovieCard.GreenKingOfTokyo,
      filmName: MovieCard[MovieCard.GreenKingOfTokyo],
      expectedFilmColor: MovieColor.Green,
      expectedFilmColorName: MovieColor[MovieColor.Green]
    },
    {
      film: MovieCard.GreenWitchesVsCheerleaders,
      filmName: MovieCard[MovieCard.GreenWitchesVsCheerleaders],
      expectedFilmColor: MovieColor.Green,
      expectedFilmColorName: MovieColor[MovieColor.Green]
    },
    {
      film: MovieCard.RedTheFuryOfTheSerpent,
      filmName: MovieCard[MovieCard.RedTheFuryOfTheSerpent],
      expectedFilmColor: MovieColor.Red,
      expectedFilmColorName: MovieColor[MovieColor.Red]
    },
    {
      film: MovieCard.RedFinalLasso,
      filmName: MovieCard[MovieCard.RedFinalLasso],
      expectedFilmColor: MovieColor.Red,
      expectedFilmColorName: MovieColor[MovieColor.Red]
    },
    {
      film: MovieCard.YellowFrenchKiss,
      filmName: MovieCard[MovieCard.YellowFrenchKiss],
      expectedFilmColor: MovieColor.Yellow,
      expectedFilmColorName: MovieColor[MovieColor.Yellow]
    },
    {
      film: MovieCard.YellowSchoolOfZombies,
      filmName: MovieCard[MovieCard.YellowSchoolOfZombies],
      expectedFilmColor: MovieColor.Yellow,
      expectedFilmColorName: MovieColor[MovieColor.Yellow]
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
      expectedBonusAction: MovieAction.AudienceTrackAdvance,
      expectedBonusActionName: MovieAction[MovieAction.AudienceTrackAdvance]
    },
    {
      film: MovieCard.GreenIntergalactic,
      filmName: MovieCard[MovieCard.GreenIntergalactic],
      expectedBonusAction: MovieAction.Get4Popcorn,
      expectedBonusActionName: MovieAction[MovieAction.Get4Popcorn]
    },
    {
      film: MovieCard.RedTheWorldAfter,
      filmName: MovieCard[MovieCard.RedTheWorldAfter],
      expectedBonusAction: MovieAction.Get1Money,
      expectedBonusActionName: MovieAction[MovieAction.Get1Money]
    },
    {
      film: MovieCard.Yellow28InTheFamily,
      filmName: MovieCard[MovieCard.Yellow28InTheFamily],
      expectedBonusAction: MovieAction.DrawAwardCard,
      expectedBonusActionName: MovieAction[MovieAction.DrawAwardCard]
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
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnBlueGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnBlueGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: MovieAction.None,
      expectedFourthActionName: MovieAction[MovieAction.None]
    },
    {
      film: MovieCard.FirstMovieGreenEndOfTheWorld,
      filmName: MovieCard[MovieCard.FirstMovieGreenEndOfTheWorld],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnGreenGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnGreenGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: MovieAction.None,
      expectedFourthActionName: MovieAction[MovieAction.None]
    },
    {
      film: MovieCard.FirstMovieRedItSMyWar,
      filmName: MovieCard[MovieCard.FirstMovieRedItSMyWar],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnRedGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnRedGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: MovieAction.None,
      expectedFourthActionName: MovieAction[MovieAction.None]
    },
    {
      film: MovieCard.FirstMovieYellowModernLove,
      filmName: MovieCard[MovieCard.FirstMovieYellowModernLove],
      expectedFirstAction: MovieAction.AudienceTrackAdvance,
      expectedFirstActionName: MovieAction[MovieAction.AudienceTrackAdvance],
      expectedSecondAction: MovieAction.AdvertisingTokenOnYellowGuest,
      expectedSecondActionName: MovieAction[MovieAction.AdvertisingTokenOnYellowGuest],
      expectedThirdAction: MovieAction.Get2Money,
      expectedThirdActionName: MovieAction[MovieAction.Get2Money],
      expectedFourthAction: MovieAction.None,
      expectedFourthActionName: MovieAction[MovieAction.None]
    },
    {
      film: MovieCard.BlueHenrietta,
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
      film: MovieCard.GreenTheBarbarian,
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
