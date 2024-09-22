import EliminateLocal from '@/pages/eliminate/local/EliminateLocal.tsx'
import HomePage from '@/pages/home/HomePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/eliminate',
    children: [
      { path: 'local', element: <EliminateLocal /> },
    ],
  },
])

export default router
