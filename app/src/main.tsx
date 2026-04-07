import { PopcornOptionsSpec } from '@gamepark/popcorn/PopcornOptions'
import { PopcornRules } from '@gamepark/popcorn/PopcornRules'
import { PopcornSetup } from '@gamepark/popcorn/PopcornSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { popcornAnimations } from './animations/PopcornAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material, popcornMaterialI18n } from './material/Material'
import { PopcornLogDescription } from './logs/PopcornLogDescription'
import { PopcornScoringDescription } from './scoring/PopcornScoringDescription'
import { PopcornTheme } from './theme'

createRoot(document.getElementById('root')!).render(
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
      logs={new PopcornLogDescription()}
      scoring={new PopcornScoringDescription()}
      theme={PopcornTheme}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
