import { LINE_WIDTH } from '@/constants'
import { FC, ReactNode, useEffect, useRef } from 'react'
import rough from 'roughjs'

interface SmallButtonProps {
  onClick?: () => void
  children?: ReactNode
}

const SmallButton: FC<SmallButtonProps> = ({ onClick, children }) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current!
    const rc = rough.svg(svg)
    const circle = rc.circle(40, 40, 60, {
      strokeWidth: LINE_WIDTH,
    })
    svg.appendChild(circle)
  }, [])

  return (
    <button className="small-button" onClick={onClick}>
      <svg ref={svgRef} width={80} height={80} viewBox="0 0 80 80" />
      {children}
    </button>
  )
}

export default SmallButton
