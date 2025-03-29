import { PopCornOptionsSpec } from '@gamepark/popcorn/PopCornOptions'
import { PopCornRules } from '@gamepark/popcorn/PopCornRules'
import { PopCornSetup } from '@gamepark/popcorn/PopCornSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, popcornMaterialI18n } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="game-template"
      Rules={PopCornRules}
      optionsSpec={PopCornOptionsSpec}
      GameSetup={PopCornSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      materialI18n={popcornMaterialI18n}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
