/** @jsxImportSource @emotion/react */
import { PopCornOptionsSpec } from '@gamepark/game-template/PopCornOptions'
import { PopCornRules } from '@gamepark/game-template/PopCornRules'
import { PopCornSetup } from '@gamepark/game-template/PopCornSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="game-template"
      Rules={PopCornRules}
      optionsSpec={PopCornOptionsSpec}
      GameSetup={PopCornSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
