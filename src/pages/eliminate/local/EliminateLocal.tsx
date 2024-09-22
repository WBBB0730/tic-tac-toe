import Board from '@/components/objects/Board.tsx'
import Marker from '@/components/objects/Marker.tsx'
import LargeButton from '@/components/ui/LargeButton.tsx'
import SmallButton from '@/components/ui/SmallButton.tsx'
import { BOARD_SIZE, MOVE_TIME, STAGE_SIZE, WINNINGS } from '@/constants'
import { GlobalContext } from '@/contexts/GlobalContext.tsx'
import { GameStatus, MarkerType, Winning } from '@/types/game.ts'
import { random } from 'lodash'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Layer, Stage } from 'react-konva'
import { useImmer } from 'use-immer'

const EliminateLocal: FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.READY)
  const [currentType, setCurrentType] = useState<MarkerType>(MarkerType.X)
  const [hoverIndex, setHoverIndex] = useState(-1)

  /** 棋子 */
  const [markers, setMarkers] = useImmer<Record<MarkerType, number[]>>({
    [MarkerType.X]: [],
    [MarkerType.O]: [],
  })
  const markerMap = useMemo<(MarkerType | null)[]>(() => {
    const markerMap = new Array(9).fill(null)
    for (const index of markers[MarkerType.X]) {
      markerMap[index] = MarkerType.X
    }
    for (const index of markers[MarkerType.O]) {
      markerMap[index] = MarkerType.O
    }
    return markerMap
  }, [markers])

  /** 获胜者 */
  const [winner, setWinner] = useState<MarkerType | null>(null)
  /** 胜利组合 */
  const [winning, setWinning] = useState<Winning | null>(null)
  const winningMap = useMemo<boolean[]>(() => {
    const winningMap = new Array(9).fill(false)
    winning?.forEach(index => winningMap[index] = true)
    return winningMap
  }, [winning])


  /** 超时时间 */
  const [cutoff, setCutoff] = useState<number>(0)
  const { timestamp } = useContext(GlobalContext)!
  const timeLeft = useMemo(() => {
    if (!cutoff) {
      return MOVE_TIME
    }
    if (timestamp >= cutoff) {
      return 0
    }
    return Math.ceil((cutoff - timestamp) / 1000)
  }, [cutoff, timestamp])

  useEffect(() => {
    if (gameStatus === GameStatus.PLAYING && cutoff && timestamp >= cutoff) {
      autoMove()
    }
  }, [cutoff, timestamp])

  /** 开始游戏 */
  const start = () => {
    setGameStatus(GameStatus.PLAYING)
    setCutoff(timestamp + MOVE_TIME * 1000)
  }

  /** 落子 */
  const move = (index: number) => {
    if (gameStatus !== GameStatus.PLAYING) return
    if (index === -1 || markerMap[index]) return

    setMarkers(markers => {
      markers[currentType].push(index)
      if (markers[currentType].length > 3) {
        markers[currentType].shift()
      }
    })

    setCheckFlag(true)
  }

  /** 超时自动落子 */
  const autoMove = () => {
    if (gameStatus !== GameStatus.PLAYING) return
    const indexes = []
    for (let i = 0; i < 9; i++) {
      if (!markerMap[i]) indexes.push(i)
    }
    move(indexes[random(0, indexes.length - 1)])
  }

  const [checkFlag, setCheckFlag] = useState(false)

  /** 检查游戏是否结束 */
  const checkOver = () => {
    if (!checkFlag) return
    setCheckFlag(false)

    let winning: Winning | null = null
    for (const [i, j, k] of WINNINGS) {
      if (markerMap[i] === currentType && markerMap[j] === currentType && markerMap[k] === currentType) {
        winning = [i, j, k]
        break
      }
    }

    if (winning) {
      gameOver(currentType, winning)
    } else {
      nextTurn()
    }
  }

  /** 监听棋子变化 */
  useEffect(checkOver, [checkFlag])

  /** 下一回合 */
  const nextTurn = () => {
    setCurrentType(currentType === MarkerType.X ? MarkerType.O : MarkerType.X)
    setCutoff(timestamp + MOVE_TIME * 1000)
  }

  /** 游戏结束 */
  const gameOver = (winner: MarkerType, winning: Winning | null) => {
    setGameStatus(GameStatus.OVER)
    setWinner(winner)
    setWinning(winning)
  }

  /** 重置游戏 */
  const reset = () => {
    setMarkers(markers => {
      markers[MarkerType.X] = []
      markers[MarkerType.O] = []
    })
    setCurrentType(MarkerType.X)
    setWinning(null)
    setGameStatus(GameStatus.READY)
    setCutoff(0)
  }

  /** 认输 */
  const resign = () => {
    gameOver(currentType === MarkerType.X ? MarkerType.O : MarkerType.X, null)
  }

  return (
    <div className="page">
      <div className="game" style={{
        transform: `scale(${STAGE_SIZE / BOARD_SIZE})`
      }}>
        <div className="game-header">
          {gameStatus === GameStatus.READY && (
            <>
              <div className="game-link">游戏规则</div>
            </>
          )}
          {gameStatus === GameStatus.PLAYING && (
            <div className="game-timer">{timeLeft}</div>
          )}
          {gameStatus === GameStatus.OVER && (
            <div className="game-winner">
              <span>{winner}</span>获胜！
            </div>
          )}
        </div>
        <Stage className="game-board" width={BOARD_SIZE} height={BOARD_SIZE}>
          <Layer>
            <Board onHover={setHoverIndex} onClick={move} />
            {markerMap.map((type, index) => type && (
              <Marker key={index} type={type} index={index}
                      isPreview={gameStatus === GameStatus.OVER && !winningMap[index]}
                      isRed={gameStatus === GameStatus.OVER && winningMap[index]} />
            ))}
            {gameStatus === GameStatus.PLAYING && hoverIndex !== -1 && !markerMap[hoverIndex] && (
              <Marker type={currentType} index={hoverIndex} isPreview />
            )}
          </Layer>
        </Stage>
        <div className="game-actions">
          {gameStatus === GameStatus.PLAYING ? (
            <>
              <SmallButton onClick={resign}>认输</SmallButton>
              <SmallButton onClick={reset}>重置</SmallButton>
            </>
          ) : (
            <LargeButton onClick={gameStatus === GameStatus.READY ? start : reset}>
              {gameStatus === GameStatus.READY ? '开始游戏' : '重置'}
            </LargeButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default EliminateLocal
