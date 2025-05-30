export const formatTimer = (second: number) => {
  const minutes = Math.floor(second / 60)
  const remainingSecond = second % 60

  return `${String(minutes).padStart(2, "0")} : ${String(remainingSecond).padStart(2, "0")}`
}
