import { LINE_WIDTH } from '@/constants'
import { FC, ReactNode, useEffect, useRef } from 'react'
import rough from 'roughjs'

interface LargeButtonProps {
  onClick?: () => void
  children?: ReactNode
}

const LargeButton: FC<LargeButtonProps> = ({ onClick, children }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const rc = rough.svg(svg)
    const rect = rc.path('M18 11h164s7 0 7 7v44s0 7 -7 7h-164s-7 0 -7 -7v-44s0 -7 7 -7', {
      strokeWidth: LINE_WIDTH,
    })
    svg.appendChild(rect)
  }, [])

  return (
    <button className="large-button" onClick={onClick}>
      <svg ref={svgRef} width={200} height={80} viewBox="0 0 200 80" />
      {children}
    </button>
  )
}

export default LargeButton
