export enum MarkerType {
  X = 'X',
  O = 'O',
}

export enum GameStatus {
  READY = 'READY',
  PLAYING = 'PLAYING',
  OVER = 'OVER',
}

export type Winning = [number, number, number]
