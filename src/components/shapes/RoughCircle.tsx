import { LINE_WIDTH } from '@/constants'
import { ShapeProps } from '@/types/shape.ts'
import Konva from 'konva'
import { forwardRef } from 'react'
import { Shape } from 'react-konva'
import rough from 'roughjs'
import { Options } from 'roughjs/bin/core'
import { randomSeed } from 'roughjs/bin/math'

interface RoughCircleProps extends ShapeProps {
  x: number
  y: number
  radius: number
}

const defaultOptions: Options = {
  seed: randomSeed(),
  strokeWidth: LINE_WIDTH,
}

const RoughCircle = forwardRef<Konva.Shape, RoughCircleProps>(({ x, y, radius, options, ...props }, ref) => (
  <Shape
    ref={ref}
    x={x - radius}
    y={y - radius}
    width={radius * 2}
    height={radius * 2}
    sceneFunc={(context, shape) => {
      const rc = rough.canvas(context.canvas as any)
      rc.circle(shape.width() / 2, shape.height() / 2, shape.width(), { ...defaultOptions, ...options })
    }}
    hitFunc={(context, shape) => {
      context.beginPath()
      context.arc(shape.width() / 2, shape.height() / 2, shape.width() / 2, 0, Math.PI * 2)
      context.closePath()
      context.fillStrokeShape(shape)
    }}
    {...props}
  />
))

export default RoughCircle
