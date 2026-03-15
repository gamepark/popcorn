import { AwardCard } from '@gamepark/popcorn/material/AwardCard.ts'
import { LocationType } from '@gamepark/popcorn/material/LocationType.ts'
import { MaterialType } from '@gamepark/popcorn/material/MaterialType.ts'
import { PlayerColor } from '@gamepark/popcorn/PlayerColor.ts'
import { MaterialHelpDisplayProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { camelCase } from 'es-toolkit'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const AwardCardHelp: FC<MaterialHelpDisplayProps<PlayerColor, MaterialType, LocationType>> = ({
  item
}: {
  item: Partial<MaterialItem<PlayerColor, LocationType, AwardCard>>
}) => {
  const playerName = usePlayerName(item.location?.player)
  const viewingPlayer = usePlayerId<PlayerColor>()
  const { t } = useTranslation()
  if (item.id === undefined) {
    return
  }
  const movieKeyPart = camelCase(AwardCard[item.id])
  return (
    <>
      <h2>
        <Trans
          i18nKey="help.awardCard.title.hand"
          defaults="{awardCardTitle} — {location}"
          values={{
            awardCardTitle: t(`help.awardCard.title.${movieKeyPart}`, titleDefaults[item.id]),
            location:
              item.location?.type === LocationType.AwardCardDeckSpot
                ? 'Award card deck'
                : item.location?.player === viewingPlayer
                  ? t('help.awardCard.location.hand.you', 'Your award card hand')
                  : t('help.awardCard.location.hand.other', "{name}'s award card hand", { name: playerName })
          }}
        />
      </h2>
      <p>
        <Trans i18nKey={`help.awardCard.description.${movieKeyPart}`} defaults={descriptionDefaults[item.id]} />
      </p>
    </>
  )
}

const titleDefaults = {
  [AwardCard.AudienceGreaterThanOrEqualToSix]: 'Audience greater than or equal to 6 award card',
  [AwardCard.BlueGreenGuestPair]: 'Blue green Guests pairs award card',
  [AwardCard.BlueGreenMoviePair]: 'Blue green Movies pairs award card',
  [AwardCard.BlueRedMoviePair]: 'Blue red Movies pairs award card',
  [AwardCard.BlueRedSeatPair]: 'Blue red Seats pairs award card',
  [AwardCard.BlueTwoSeatsGuestsMoviesSet]: 'Sets of two blue Guests, two blue Movies, two blue Seats award card',
  [AwardCard.BlueYellowGuestPair]: 'Blue yellow Guests pairs award card',
  [AwardCard.BlueYellowSeatPair]: 'Blue yellow Seats pairs award card',
  [AwardCard.FourMovieSameColorSet]: 'Sets of four Movies of same color award card',
  [AwardCard.FourOfAKindMovie]: 'Sets of Movies of each color award card',
  [AwardCard.FourOfAKindSeat]: 'Sets of Seats of each color award card',
  [AwardCard.GreenRedGuestPair]: 'Green red Guests pairs award card',
  [AwardCard.GreenRedSeatPair]: 'Green red Seats pairs award card',
  [AwardCard.GreenTwoSeatsGuestsMoviesSet]: 'Sets of two green Guests, two green Movies, two green Seats award card',
  [AwardCard.GreenYellowMoviePair]: 'Green yellow Movies pairs award card',
  [AwardCard.GreenYellowSeatPair]: 'Green yellow Seats pairs award card',
  [AwardCard.GuestNumber]: 'Total number of Guests award card',
  [AwardCard.MoviePrice0Or1]: 'Movies that cost $0 or $1 award card',
  [AwardCard.MoviePrice4Or5]: 'Movies that cost $4 or $5 award card',
  [AwardCard.RedTwoSeatsGuestsMoviesSet]: 'Sets of two red Guests, two red Movies, two red Seats award card',
  [AwardCard.RedYellowGuestPair]: 'Red yellow Guests pairs award card',
  [AwardCard.RedYellowMoviePair]: 'Red yellow Movies pairs award card',
  [AwardCard.ThreeSeatTheater]: 'Three Seats theaters award card',
  [AwardCard.TwoFourOfAKindGuest]: 'Sets of two Guests of each color award card',
  [AwardCard.WhiteGuestCount]: 'Number of white Guests award card',
  [AwardCard.YellowTwoSeatsGuestsMoviesSet]: 'Sets of two yellow Guests, two yellow Movies, two yellow Seats award card'
}

const descriptionDefaults = {
  [AwardCard.AudienceGreaterThanOrEqualToSix]: 'If your audience is greater than or equal to 6, gain 4 Popcorn.',
  [AwardCard.BlueGreenGuestPair]: 'For each pair of 1 blue Guest and 1 green Guest, gain 2 Popcorn.',
  [AwardCard.BlueGreenMoviePair]: 'For each pair of 1 blue movie and 1 green movie, gain 2 Popcorn.',
  [AwardCard.BlueRedMoviePair]: 'For each pair of 1 red movie and 1 blue movie, gain 2 Popcorn.',
  [AwardCard.BlueRedSeatPair]: 'For each pair of 1 blue seat and 1 red seat, gain 3 Popcorn (seats can be in different theaters).',
  [AwardCard.BlueTwoSeatsGuestsMoviesSet]: 'For each set of 2 blue Guests, 2 blue movies, and 2 blue seats, gain 4 Popcorn.',
  [AwardCard.BlueYellowGuestPair]: 'For each pair of 1 blue Guest and 1 yellow Guest, gain 2 Popcorn.',
  [AwardCard.BlueYellowSeatPair]: 'For each pair of 1 blue seat and 1 yellow seat, gain 3 Popcorn (seats can be in different theaters).',
  [AwardCard.FourMovieSameColorSet]: 'For each set of 4 movies of the same color (red, green, yellow, or blue), gain 5 Popcorn.',
  [AwardCard.FourOfAKindMovie]: 'For each set of 4 movies of different colors, gain 4 Popcorn.',
  [AwardCard.FourOfAKindSeat]: 'For each set of 4 seats of different colors, gain 6 Popcorn (seats can be in different theaters).',
  [AwardCard.GreenRedGuestPair]: 'For each pair of 1 green Guest and 1 red Guest, gain 2 Popcorn.',
  [AwardCard.GreenRedSeatPair]: 'For each pair of 1 green seat and 1 red seat, gain 3 Popcorn (seats can be in different theaters).',
  [AwardCard.GreenTwoSeatsGuestsMoviesSet]: 'For each set of 2 green Guests, 2 green movies, and 2 green seats, gain 4 Popcorn.',
  [AwardCard.GreenYellowMoviePair]: 'For each pair of 1 green movie and 1 yellow movie, gain 2 Popcorn.',
  [AwardCard.GreenYellowSeatPair]: 'For each pair of 1 green seat and 1 yellow seat, gain 3 Popcorn (seats can be in different theaters).',
  [AwardCard.GuestNumber]: 'If you have 6 or fewer Guests (no matter which colors) at the end of the game, gain 5 Popcorn. If you have 7 or 8, gain 3 Popcorn.',
  [AwardCard.MoviePrice0Or1]: 'For each movie that costs $0 or $1, gain 1 Popcorn (Starting Movies do not count).',
  [AwardCard.MoviePrice4Or5]: 'For each movie that costs $4 or $5, gain 2 Popcorn',
  [AwardCard.RedTwoSeatsGuestsMoviesSet]: 'For each set of 2 red Guests, 2 red movies, and 2 red seats, gain 4 Popcorn.',
  [AwardCard.RedYellowGuestPair]: 'For each pair of 1 red Guest and 1 yellow Guest, gain 2 Popcorn.',
  [AwardCard.RedYellowMoviePair]: 'For each pair of 1 red movie and 1 yellow movie, gain 2 Popcorn.',
  [AwardCard.ThreeSeatTheater]: 'For each 3-seat theater in your cinema, gain 2 Popcorn.',
  [AwardCard.TwoFourOfAKindGuest]: 'For each set of 2 Guests of each color (red, green, yellow, and blue), gain 5 Popcorn.',
  [AwardCard.WhiteGuestCount]: 'If you have 0 white Guests, gain 7 Popcorn. If you have 1 or 2, gain 4.',
  [AwardCard.YellowTwoSeatsGuestsMoviesSet]: 'For each set of 2 yellow Guests, 2 yellow movies, and 2 yellow seats, gain 4 Popcorn.'
}
