import Konva from 'konva'
import { KonvaNodeEvents } from 'react-konva'
import { Options } from 'roughjs/bin/core'

export interface ShapeProps extends Konva.ShapeConfig, KonvaNodeEvents {
  options?: Options
}