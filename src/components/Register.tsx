import { useState } from "react"

interface RegisterProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Register({ setIsRegister }: RegisterProps) {
  const [formRegister, setFormRegister] = useState<{ username: string; password: string; confirmPassword: string }>({
    username: "",
    password: "",
    confirmPassword: "",
  })

  const [registerError, setRegisterError] = useState<string>("")

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formRegister.username || !formRegister.password || !formRegister.confirmPassword) {
      setRegisterError("all fields are required")
      return
    }

    if (formRegister.password !== formRegister.confirmPassword) {
      setRegisterError("Password do not match")
      return
    }

    if (formRegister.username && formRegister.password && formRegister.confirmPassword) {
      setRegisterError("")
      const newUser = { username: formRegister.username, password: formRegister.password }
      localStorage.setItem("auth", JSON.stringify(newUser))
      alert("Success create account")
      setIsRegister(false)
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form onSubmit={handleRegister} className="flex flex-col w-100">
        <h1 className="text-2xl font-semibold text-center">Simple Register Quick Trivia</h1>
        {/* Username */}
        <div className="flex flex-col items-start gap-y-2 w-full mt-5">
          <label htmlFor="username" className="font-semibold text-[18px]">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formRegister.username}
            onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })}
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
            value={formRegister.password}
            onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
            className="ring-1 ring-blue-500 w-full py-1.5 px-5 rounded-lg"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col items-start gap-y-2 w-full mt-5">
          <label htmlFor="confirmPassword" className="font-semibold text-[18px]">
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formRegister.confirmPassword}
            onChange={(e) => setFormRegister({ ...formRegister, confirmPassword: e.target.value })}
            className="ring-1 ring-blue-500 w-full py-1.5 px-5 rounded-lg"
          />
        </div>

        {registerError && <span className="font-semibold mt-3 ml-2 text-red-500">{registerError}</span>}

        <div className="w-full flex flex-col gap-y-3">
          <button type="submit" className="w-full mt-5 px-5 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
            Register
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className=" px-5 py-2 bg-slate-500 font-semibold text-white rounded-lg hover:brightness-70 cursor-pointer">
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}
