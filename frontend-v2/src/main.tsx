import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from './components/common/ScrollOnTop.tsx'
import { RecoilRoot } from 'recoil' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot >
      <BrowserRouter>
        <ScrollToTop />
        <App />
        <Toaster />
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
