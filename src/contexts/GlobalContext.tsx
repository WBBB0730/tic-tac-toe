import { createContext, FC, ReactNode, useEffect, useState } from 'react'

interface GlobalContextType {
  timestamp: number
  windowWidth: number
  windowHeight: number
}

const GlobalContext = createContext<GlobalContextType | null>(null)

const GlobalProvider: FC<{
  children: ReactNode
}> = ({ children }) => {

  // region 时间戳
  const [timestamp, setTimestamp] = useState(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(Date.now())
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])
  // endregion

  // region 屏幕宽高
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  useEffect(() => {
    const windowResizeHandler = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', windowResizeHandler)

    return () => {
      window.removeEventListener('resize', windowResizeHandler)
    }
  }, [])
  // endregion

  return (
    <GlobalContext.Provider value={{
      timestamp,
      windowWidth,
      windowHeight,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export { GlobalContext, GlobalProvider }
