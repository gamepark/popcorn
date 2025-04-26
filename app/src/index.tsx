/** @jsxImportSource @emotion/react */
import { PopcornOptionsSpec } from '@gamepark/popcorn/PopcornOptions'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { PopcornSetup } from '@gamepark/popcorn/PopcornSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { popcornAnimations } from './animations/PopcornAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material, popcornMaterialI18n } from './material/Material'
import { PopcornTheme } from './PopcornTheme'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="popcorn"
      Rules={PopcornRules}
      optionsSpec={PopcornOptionsSpec}
      GameSetup={PopcornSetup}
      material={Material}
      locators={Locators}
      animations={popcornAnimations}
      materialI18n={popcornMaterialI18n}
      theme={PopcornTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
