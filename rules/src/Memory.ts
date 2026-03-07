import { MovieCard } from './material/MovieCard'

export enum Memory {
  AvailableMovieActions = 1,
  PendingActions,
  GamePopcornScoreBeforeFinalRoundScore
}

export type AvailableMovieActionsMemory = Partial<Record<MovieCard, boolean[]>>
