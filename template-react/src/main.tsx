import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import router from './router'
import { RouterProvider } from 'react-router'

// must import here if in micro frontend environment
import './assets/css/tailwind.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
