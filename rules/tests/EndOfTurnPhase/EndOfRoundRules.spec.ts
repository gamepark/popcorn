import { describe, expect, test } from 'vitest'
import { PlayerColor } from '../../src/PlayerColor'
import { PopcornOptions } from '../../src/PopcornOptions'
import { RuleId } from '../../src/rules/RuleId'
import { PopcornEndPhaseWithNoMoneyForPlayersAndNoAdvertisingTokensSetup } from '../setups/EndOfRoundPhase/PopcornEndPhaseWithNoMoneyForPlayersAndNoAdvertisingTokensSetup'

describe('EndOfRoundPhaseRules tests', () => {
  test('Should players have no money and advertising token, next phase should be the Showings Phase', () => {
    // Given
    const gameSetup = new PopcornEndPhaseWithNoMoneyForPlayersAndNoAdvertisingTokensSetup()
    const options: PopcornOptions = {
      players: [{ id: PlayerColor.Cyan }, { id: PlayerColor.Green }]
    }

    // When
    const game = gameSetup.setup(options)

    // Then
    expect(game.rule!.id).to.equal(RuleId.ShowingsPhaseRule)
  })
})
