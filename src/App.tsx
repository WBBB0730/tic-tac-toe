import { GlobalProvider } from '@/contexts/GlobalContext.tsx'
import router from '@/router'
import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import 'virtual:uno.css'
import './styles/index.scss'
import './styles/game.scss'
import './styles/ui.scss'

const App: FC = () => {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  )
}

export default App
