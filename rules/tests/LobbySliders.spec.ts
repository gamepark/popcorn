import { describe, expect, test } from 'vitest'
import { getSliderColor, getSlidersForPlayers, LobbySlider } from '../src/material/LobbySlider'
import { PlayerColor } from '../src/PlayerColor'

describe('Lobby sliders tests', () => {
  test.for([
    {
      slider: LobbySlider.Cyan1,
      sliderName: LobbySlider[LobbySlider.Cyan1],
      expectedPlayerColor: PlayerColor.Cyan,
      expectedPlayerColorName: PlayerColor[PlayerColor.Cyan]
    },
    {
      slider: LobbySlider.Cyan2,
      sliderName: LobbySlider[LobbySlider.Cyan2],
      expectedPlayerColor: PlayerColor.Cyan,
      expectedPlayerColorName: PlayerColor[PlayerColor.Cyan]
    },
    {
      slider: LobbySlider.Cyan3,
      sliderName: LobbySlider[LobbySlider.Cyan3],
      expectedPlayerColor: PlayerColor.Cyan,
      expectedPlayerColorName: PlayerColor[PlayerColor.Cyan]
    },
    {
      slider: LobbySlider.Green1,
      sliderName: LobbySlider[LobbySlider.Green1],
      expectedPlayerColor: PlayerColor.Green,
      expectedPlayerColorName: PlayerColor[PlayerColor.Green]
    },
    {
      slider: LobbySlider.Green2,
      sliderName: LobbySlider[LobbySlider.Green2],
      expectedPlayerColor: PlayerColor.Green,
      expectedPlayerColorName: PlayerColor[PlayerColor.Green]
    },
    {
      slider: LobbySlider.Green3,
      sliderName: LobbySlider[LobbySlider.Green3],
      expectedPlayerColor: PlayerColor.Green,
      expectedPlayerColorName: PlayerColor[PlayerColor.Green]
    },
    {
      slider: LobbySlider.Orange1,
      sliderName: LobbySlider[LobbySlider.Orange1],
      expectedPlayerColor: PlayerColor.Orange,
      expectedPlayerColorName: PlayerColor[PlayerColor.Orange]
    },
    {
      slider: LobbySlider.Orange2,
      sliderName: LobbySlider[LobbySlider.Orange2],
      expectedPlayerColor: PlayerColor.Orange,
      expectedPlayerColorName: PlayerColor[PlayerColor.Orange]
    },
    {
      slider: LobbySlider.Orange3,
      sliderName: LobbySlider[LobbySlider.Orange3],
      expectedPlayerColor: PlayerColor.Orange,
      expectedPlayerColorName: PlayerColor[PlayerColor.Orange]
    },
    {
      slider: LobbySlider.Purple1,
      sliderName: LobbySlider[LobbySlider.Purple1],
      expectedPlayerColor: PlayerColor.Purple,
      expectedPlayerColorName: PlayerColor[PlayerColor.Purple]
    },
    {
      slider: LobbySlider.Purple2,
      sliderName: LobbySlider[LobbySlider.Purple2],
      expectedPlayerColor: PlayerColor.Purple,
      expectedPlayerColorName: PlayerColor[PlayerColor.Purple]
    },
    {
      slider: LobbySlider.Purple3,
      sliderName: LobbySlider[LobbySlider.Purple3],
      expectedPlayerColor: PlayerColor.Purple,
      expectedPlayerColorName: PlayerColor[PlayerColor.Purple]
    }
  ])(`Given $sliderName, getSliderColor should return $expectedPlayerColorName`, ({ slider, expectedPlayerColor }) => {
    // When
    const color = getSliderColor(slider)

    // Then
    expect(color).toBe(expectedPlayerColor)
  })

  test.for([
    {
      givenPlayers: [PlayerColor.Green, PlayerColor.Purple],
      expectedSliderIds: [LobbySlider.Green1, LobbySlider.Green2, LobbySlider.Green3, LobbySlider.Purple1, LobbySlider.Purple2, LobbySlider.Purple3]
    },
    {
      givenPlayers: [PlayerColor.Cyan, PlayerColor.Orange, PlayerColor.Purple],
      expectedSliderIds: [
        LobbySlider.Cyan1,
        LobbySlider.Cyan2,
        LobbySlider.Cyan3,
        LobbySlider.Orange1,
        LobbySlider.Orange2,
        LobbySlider.Orange3,
        LobbySlider.Purple1,
        LobbySlider.Purple2,
        LobbySlider.Purple3
      ]
    }
  ])('Given the players, getSlidersFOrPlayers() should return the correct ids', ({ givenPlayers, expectedSliderIds }) => {
    // When
    const sliderIds = getSlidersForPlayers(givenPlayers)

    // Then
    expect(sliderIds).to.have.lengthOf(expectedSliderIds.length)
    expect(sliderIds).to.include.members(expectedSliderIds)
  })
})
