import { div } from "framer-motion/client"
import Sidebar from "./components/common/Sidebar"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Profile from "./components/Profile"



function App() {

  return (
    <div className="h-screen flex flex-row relative">

          {/* SIDEBAR */}
          <Sidebar />

          {/* MAIN PAGE CONTENTS */}
          <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />

          </Routes>



    </div>
  )
}

export default App
