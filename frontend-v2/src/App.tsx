import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/pages/Home"
import { Navbar } from "./components/common/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import SpecificUserPage from "./components/pages/SpecificUserPage"
import PostPage from "./components/pages/PostPage"
import AuthPage from "./components/pages/AuthPage"
import { useRecoilValue } from "recoil"
import { userAtom } from "./atoms/userAtom"
import UpdateProfilePage from "./components/pages/UpdateProfilePage"
import ComingSoon from "./components/common/ComingSoon"
import SurahPage from "./components/pages/SurahPage"
import TafsirPage from "./components/pages/TafsirPage"
import Contact from "./components/common/Contact"
import PopUp from "./components/common/PopUp"



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

                {/* <Route path="/" element={userInfo? <Home /> : <Navigate to={"/auth"} /> } /> */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={!userInfo ? <AuthPage /> : <Navigate to={"/"} /> } />
                <Route path="/:username" element={<SpecificUserPage />} />
                <Route path="/:username/post/:pid" element={<PostPage />} />

                {/* @TODO: Edit later */}
                <Route path="/update" element={userInfo? <UpdateProfilePage /> : <Navigate to={"/auth"} />} />

                <Route path="/surahs" element={<SurahPage />} />
                <Route path="/tafsir" element={<TafsirPage />} />
                <Route path="/hadith" element={<ComingSoon />} />


                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<div className="text-center">Not Found</div>} />


            </Routes>


            



      </div>

    
    </ThemeProvider>
  )
}

export default App
