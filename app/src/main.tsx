import { PopCornOptionsSpec } from '@gamepark/popcorn/PopcornOptions'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { PopcornSetup } from '@gamepark/popcorn/PopcornSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, popcornMaterialI18n } from './material/Material'
import { PopcornTheme } from './PopcornTheme'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

createRoot(document.getElementById('root')!).render(
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
  </StrictMode>
)
