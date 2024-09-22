import { LINE_WIDTH } from '@/constants'
import { ShapeProps } from '@/types/shape.ts'
import { Shape } from 'react-konva'
import rough from 'roughjs'
import { Options } from 'roughjs/bin/core'
import { randomSeed } from 'roughjs/bin/math'

interface RoughLineProps extends ShapeProps {
  points: [number, number][]
}

const defaultOptions: Options = {
  seed: randomSeed(),
  strokeWidth: LINE_WIDTH,
}

const RoughLine = ({ points, options, ...props }: RoughLineProps) => (
  <Shape
    sceneFunc={(context) => {
      const rc = rough.canvas(context.canvas as any)
      rc.linearPath(points, { ...defaultOptions, ...options })
    }}
    {...props}
  />
)

export default RoughLine
