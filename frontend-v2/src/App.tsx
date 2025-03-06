import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import { Navbar } from "./components/common/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import SpecificUserPage from "./components/pages/SpecificUserPage"
import PostPage from "./components/pages/PostPage"
import AuthPage from "./components/pages/AuthPage"
import { useRecoilValue } from "recoil"
import { userAtom } from "./atoms/userAtom"



function App() {
  
  const userInfo = useRecoilValue(userAtom)
  console.log(userInfo)

  return (



    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    
      <div className="h-screen flex flex-col relative">

            {/* SIDEBAR */}
            {/* <Sidebar /> */}

            {/* NAVBAR */}
            <Navbar />


            {/* MAIN PAGE CONTENTS */}  
            <Routes>

                <Route path="/" element={userInfo? <Home /> : <Navigate to={"/auth"} /> } />
                <Route path="/auth" element={!userInfo ? <AuthPage /> : <Navigate to={"/"} /> } />
                <Route path="/:username" element={<SpecificUserPage />} />
                <Route path="/:username/post/:pid" element={<PostPage />} />

                <Route path="*" element={<div className="text-center">Not Found</div>} />

            </Routes>



      </div>

    
    </ThemeProvider>
  )
}

export default App
