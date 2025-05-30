import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

const authUser = { username: "setra", password: "setra123" }

if (!localStorage.getItem("auth")) {
  localStorage.setItem("auth", JSON.stringify(authUser))
}

if (!localStorage.getItem("isLogin")) {
  localStorage.setItem("isLogin", "false")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
