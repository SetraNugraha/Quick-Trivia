import { useEffect, useState } from "react"
import Register from "./Register"

interface LoginPageProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LoginPage({ setIsLogin }: LoginPageProps) {
  const [errorLogin, setErrorLogin] = useState<string>("")
  const [isRegister, setIsRegister] = useState<boolean>(() => localStorage.getItem("isRegister") === "true")

  const [formLogin, setFormLogin] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  })

  useEffect(() => {
    localStorage.setItem("isRegister", isRegister.toString())
  }, [isRegister])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const storedAuth = localStorage.getItem("auth")
    if (!storedAuth) {
      setErrorLogin("user not found")
      return
    }

    const authUser = JSON.parse(storedAuth)

    if (!formLogin.username || !formLogin.password) {
      setErrorLogin("username and password required")
      return
    }

    if (formLogin.username !== authUser.username || formLogin.password !== authUser.password) {
      setErrorLogin("Invalid username and password")
      return
    }

    localStorage.setItem("isLogin", "true")
    localStorage.removeItem("isRegister")
    setIsLogin(true)
  }

  const handleGuest = () => {
    const guestUser = { username: "Guest", password: "" }
    localStorage.setItem("auth", JSON.stringify(guestUser))
    localStorage.setItem("isLogin", "true")
    localStorage.removeItem("isRegister")
    setIsLogin(true)
  }

  if (isRegister) {
    return <Register setIsRegister={setIsRegister} />
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleLogin} className="flex flex-col w-100">
        <h1 className="text-2xl font-semibold text-center">Login Quick Trivia</h1>
        {/* Username */}
        <div className="flex flex-col items-start gap-y-2 w-full mt-5">
          <label htmlFor="username" className="font-semibold text-[18px]">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formLogin.username}
            onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })}
            className="ring-1 ring-blue-500 w-full py-1.5 px-5 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col items-start gap-y-2 w-full mt-5">
          <label htmlFor="password" className="font-semibold text-[18px]">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formLogin.password}
            onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
            className="ring-1 ring-blue-500 w-full py-1.5 px-5 rounded-lg"
          />
        </div>

        {errorLogin && <span className="font-semibold mt-3 ml-2 text-red-500">{errorLogin}</span>}

        <div className="w-full flex flex-col gap-y-3">
          <div className="flex items-center gap-x-3 w-full">
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className="w-full mt-5 px-5 py-2 bg-yellow-600 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
              Register
            </button>
            <button type="submit" className="w-full mt-5 px-5 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
              Login
            </button>
          </div>
          <button
            type="button"
            onClick={handleGuest}
            className="px-5 py-2 bg-gray-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
            Login As Guest
          </button>
        </div>
      </form>
    </div>
  )
}
