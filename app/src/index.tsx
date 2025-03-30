/** @jsxImportSource @emotion/react */
import { PopCornOptionsSpec } from '@gamepark/game-template/PopcornOptions'
import { PopcornRules } from '@gamepark/game-template/PopcornRules'
import { PopcornSetup } from '@gamepark/game-template/PopcornSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material, popcornMaterialI18n } from './material/Material'
import { PopcornTheme } from './PopcornTheme'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="game-template"
      Rules={PopcornRules}
      optionsSpec={PopCornOptionsSpec}
      GameSetup={PopcornSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      materialI18n={popcornMaterialI18n}
      theme={PopcornTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
