import { BOARD_SIZE } from '@/constants'
import { Winning } from '@/types/game.ts'

export const POS_MAP = new Array(9).fill(0).map<[number, number]>((_, i) => {
  const x = i % 3
  const y = Math.floor(i / 3)
  return [BOARD_SIZE / 6 * (x * 2 + 1), BOARD_SIZE / 6 * (y * 2 + 1)]
})

export const indexToPos = (index: number): [number, number] => {
  return POS_MAP[index]
}

export const posToIndex = (posX: number, posY: number): number => {
  const x = Math.floor(posX / (BOARD_SIZE / 3))
  const y = Math.floor(posY / (BOARD_SIZE / 3))
  return y * 3 + x
}

export const getWinningLine = ([i, , k]: Winning): [number, number][] => {
  let [x1, y1] = indexToPos(i), [x2, y2] = indexToPos(k)
  const dx = x2 - x1, dy = y2 - y1
  if (dx > 0) {
    x1 -= BOARD_SIZE / 6
    x2 += BOARD_SIZE / 6
  } else if (dx < 0) {
    x1 += BOARD_SIZE / 6
    x2 -= BOARD_SIZE / 6
  }
  if (dy > 0) {
    y1 -= BOARD_SIZE / 6
    y2 += BOARD_SIZE / 6
  } else if (dy < 0) {
    y1 += BOARD_SIZE / 6
    y2 -= BOARD_SIZE / 6
  }
  return [[x1, y1], [x2, y2]]
}
