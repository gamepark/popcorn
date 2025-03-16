import { LobbySlider } from '@gamepark/game-template/material/LobbySlider'
import { LocationType } from '@gamepark/game-template/material/LocationType'
import { MaterialType } from '@gamepark/game-template/material/MaterialType'
import { PlayerColor } from '@gamepark/game-template/PlayerColor'
import { BoardDescription } from '@gamepark/react-game'
import cyan1LobbySlider from '../images/Sliders/SliderBlue1.png'
import cyan2LobbySlider from '../images/Sliders/SliderBlue2.png'
import cyan3LobbySlider from '../images/Sliders/SliderBlue3.png'
import green1LobbySlider from '../images/Sliders/SliderBlue1.png'
import green2LobbySlider from '../images/Sliders/SliderBlue2.png'
import green3LobbySlider from '../images/Sliders/SliderBlue3.png'
import orange1LobbySlider from '../images/Sliders/SliderBlue1.png'
import orange2LobbySlider from '../images/Sliders/SliderBlue2.png'
import orange3LobbySlider from '../images/Sliders/SliderBlue3.png'
import purple1LobbySlider from '../images/Sliders/SliderBlue1.png'
import purple2LobbySlider from '../images/Sliders/SliderBlue2.png'
import purple3LobbySlider from '../images/Sliders/SliderBlue3.png'

class LobbySliderDescription extends BoardDescription<PlayerColor, MaterialType, LocationType, LobbySlider> {
  width = 1.8
  height = 6.4
  thickness = 0.2

  images = {
    [LobbySlider.Cyan1]: cyan1LobbySlider,
    [LobbySlider.Cyan2]: cyan2LobbySlider,
    [LobbySlider.Cyan3]: cyan3LobbySlider,
    [LobbySlider.Green1]: green1LobbySlider,
    [LobbySlider.Green2]: green2LobbySlider,
    [LobbySlider.Green3]: green3LobbySlider,
    [LobbySlider.Orange1]: orange1LobbySlider,
    [LobbySlider.Orange2]: orange2LobbySlider,
    [LobbySlider.Orange3]: orange3LobbySlider,
    [LobbySlider.Purple1]: purple1LobbySlider,
    [LobbySlider.Purple2]: purple2LobbySlider,
    [LobbySlider.Purple3]: purple3LobbySlider
  }
}

export const lobbySliderDescription = new LobbySliderDescription()
