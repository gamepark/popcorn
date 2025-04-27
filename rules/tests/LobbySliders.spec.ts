import { getSliderColor, getSlidersForPlayers, LobbySlider } from '../src/material/LobbySlider'
import { PlayerColor } from '../src/PlayerColor'

describe('Lobby sliders tests', () => {
  test.each([
    { slider: LobbySlider.Cyan1, expectedPlayerColor: PlayerColor.Cyan },
    { slider: LobbySlider.Cyan2, expectedPlayerColor: PlayerColor.Cyan },
    { slider: LobbySlider.Cyan3, expectedPlayerColor: PlayerColor.Cyan },
    { slider: LobbySlider.Green1, expectedPlayerColor: PlayerColor.Green },
    { slider: LobbySlider.Green2, expectedPlayerColor: PlayerColor.Green },
    { slider: LobbySlider.Green3, expectedPlayerColor: PlayerColor.Green },
    { slider: LobbySlider.Orange1, expectedPlayerColor: PlayerColor.Orange },
    { slider: LobbySlider.Orange2, expectedPlayerColor: PlayerColor.Orange },
    { slider: LobbySlider.Orange3, expectedPlayerColor: PlayerColor.Orange },
    { slider: LobbySlider.Purple1, expectedPlayerColor: PlayerColor.Purple },
    { slider: LobbySlider.Purple2, expectedPlayerColor: PlayerColor.Purple },
    { slider: LobbySlider.Purple3, expectedPlayerColor: PlayerColor.Purple }
  ])('Given $slider, getSliderColor should return $expectedPlayerCOlor', ({ slider, expectedPlayerColor }) => {
    // When
    const color = getSliderColor(slider)

    // Then
    expect(color).toBe(expectedPlayerColor)
  })

  test.each([
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
  ])('Given the players, getSlidersFOrPlayers() shoudl return the correct ids', ({ givenPlayers, expectedSliderIds }) => {
    // When
    const sliderIds = getSlidersForPlayers(givenPlayers)

    // Then
    expect(sliderIds).toHaveLength(expectedSliderIds.length)
    expect(sliderIds).toEqual(expect.arrayContaining(expectedSliderIds))
  })
})
