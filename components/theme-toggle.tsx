"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle dark mode"
      className="fixed top-1 right-3 z-50 size-12 rounded-full backdrop-blur-sm sm:top-2 sm:right-4"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
    </Button>
  )
}

export { ThemeToggle }
