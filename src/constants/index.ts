import { Winning } from '@/types/game.ts'

export const BOARD_SIZE = 360

export const STAGE_SIZE = Math.min(BOARD_SIZE, (window.innerWidth - 32), (window.innerHeight - 32) / 2)

export const LINE_WIDTH = 2

export const MARKER_RADIUS = 40


/** 胜利组合 */
export const WINNINGS: readonly Winning[] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

/** 落子限时（秒） */
export const MOVE_TIME = 9
