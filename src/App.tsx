import { useEffect, useState } from "react"
import Homepage from "./components/Homepage"
import LoginPage from "./components/LoginPage"

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(() => localStorage.getItem("isLogin") === "true")

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true"
    setIsLogin(loginStatus)
  }, [isLogin])

  if (!isLogin) {
    return <LoginPage setIsLogin={setIsLogin} />
  }

  return <Homepage setIsLogin={setIsLogin} />
}

export default App
