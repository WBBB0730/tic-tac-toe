import { LINE_WIDTH } from '@/constants'
import { ShapeProps } from '@/types/shape.ts'
import Konva from 'konva'
import { forwardRef } from 'react'
import { Shape } from 'react-konva'
import rough from 'roughjs'
import { Options } from 'roughjs/bin/core'
import { randomSeed } from 'roughjs/bin/math'

interface RoughRectProps extends ShapeProps {
  x: number
  y: number
  width: number
  height: number
}

const defaultOptions: Options = {
  seed: randomSeed(),
  strokeWidth: LINE_WIDTH,
}

const RoughRect = forwardRef<Konva.Shape, RoughRectProps>(({ x, y, width, height, options, ...props }, ref) => (
  <Shape
    ref={ref}
    x={x}
    y={y}
    width={width}
    height={height}
    sceneFunc={(context, shape) => {
      const rc = rough.canvas(context.canvas as any)
      rc.rectangle(0, 0, shape.width(), shape.height(), { ...defaultOptions, ...options })
    }}
    hitFunc={(context, shape) => {
      context.beginPath()
      context.rect(0, 0, width, height)
      context.closePath()
      context.fillStrokeShape(shape)
    }}
    {...props}
  />
))

export default RoughRect
