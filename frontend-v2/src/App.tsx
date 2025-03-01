import { Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import { Navbar } from "./components/common/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import SpecificUserPage from "./components/pages/SpecificUserPage"
import PostPage from "./components/pages/PostPage"



function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    
      <div className="h-screen flex flex-col relative">

            {/* SIDEBAR */}
            {/* <Sidebar /> */}

            {/* NAVBAR */}
            <Navbar />


            {/* MAIN PAGE CONTENTS */}
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/:username" element={<SpecificUserPage />} />
                <Route path="/:username/post/:pid" element={<PostPage />} />

                <Route path="*" element={<div className="text-center">Not Found</div>} />

            </Routes>



      </div>

    
    </ThemeProvider>
  )
}

export default App
