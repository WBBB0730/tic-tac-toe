import RoughCircle from '@/components/shapes/RoughCircle.tsx'
import RoughLine from '@/components/shapes/RoughLine.tsx'
import { MARKER_RADIUS } from '@/constants'
import { MarkerType } from '@/types/game.ts'
import { indexToPos } from '@/utils/pos.ts'
import { FC } from 'react'

interface MarkerProps {
  type: MarkerType
  index: number
  isPreview?: boolean
  isRed?: boolean
}

const Marker: FC<MarkerProps> = ({ type, index, isPreview, isRed }) => {
  const [posX, posY] = indexToPos(index)

  return type === MarkerType.X ? (
    <>
      <RoughLine
        points={[[posX - MARKER_RADIUS, posY - MARKER_RADIUS], [posX + MARKER_RADIUS, posY + MARKER_RADIUS]]}
        opacity={isPreview ? 0.2 : 1}
        options={{ stroke: isRed ? 'red' : undefined }}
      />
      <RoughLine
        points={[[posX + MARKER_RADIUS, posY - MARKER_RADIUS], [posX - MARKER_RADIUS, posY + MARKER_RADIUS]]}
        opacity={isPreview ? 0.2 : 1}
        options={{ stroke: isRed ? 'red' : undefined }}
      />
    </>
  ) : (
    <RoughCircle
      x={posX} y={posY} radius={MARKER_RADIUS} hitFunc={null}
      opacity={isPreview ? 0.2 : 1}
      options={{ stroke: isRed ? 'red' : undefined }} />
  )
}

export default Marker
