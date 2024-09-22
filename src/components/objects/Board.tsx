import RoughLine from '@/components/shapes/RoughLine.tsx'
import { BOARD_SIZE } from '@/constants'
import { posToIndex } from '@/utils/pos.ts'
import Konva from 'konva'
import { FC } from 'react'
import { Rect } from 'react-konva'

interface BoardProps {
  onHover?: (index: number) => void
  onClick?: (index: number) => void
}

/** 棋盘 */
const Board: FC<BoardProps> = ({ onHover, onClick }) => {
  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = e.currentTarget.getRelativePointerPosition()
    onHover?.(pos ? posToIndex(pos.x, pos.y) : -1)
  }

  const handleMouseLeave = () => {
    onHover?.(-1)
  }

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = e.currentTarget.getRelativePointerPosition()
    onClick?.(pos ? posToIndex(pos.x, pos.y) : -1)
  }

  const handleTouchEnd = (e: Konva.KonvaEventObject<TouchEvent>) => {
    const pos = e.currentTarget.getRelativePointerPosition()
    onClick?.(pos ? posToIndex(pos.x, pos.y) : -1)
  }

  return (
    <>
      <RoughLine points={[[BOARD_SIZE / 3, 0], [BOARD_SIZE / 3, BOARD_SIZE]]} />
      <RoughLine points={[[0, BOARD_SIZE / 3], [BOARD_SIZE, BOARD_SIZE / 3]]} />
      <RoughLine points={[[BOARD_SIZE / 3 * 2, 0], [BOARD_SIZE / 3 * 2, BOARD_SIZE]]} />
      <RoughLine points={[[0, BOARD_SIZE / 3 * 2], [BOARD_SIZE, BOARD_SIZE / 3 * 2]]} />
      <Rect x={0} y={0} width={BOARD_SIZE} height={BOARD_SIZE}
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            onClick={handleClick} onTouchEnd={handleTouchEnd} />
    </>
  )
}

export default Board
