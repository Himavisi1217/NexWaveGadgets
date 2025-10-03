"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: "user" | "admin") => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("nextwave_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("nextwave_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "user" | "admin" = "user"): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would call your API
      if (role === "admin") {
        // Admin credentials check
        if (email === "admin@nextwavegadgets.com" && password === "admin123") {
          const adminUser: User = {
            id: "admin-1",
            email,
            name: "Admin User",
            role: "admin",
            createdAt: new Date().toISOString(),
          }
          setUser(adminUser)
          localStorage.setItem("nextwave_user", JSON.stringify(adminUser))
          return true
        }
      } else {
        // Regular user authentication
        // In a real app, you'd validate against your database
        if (email && password.length >= 6) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            name: email.split("@")[0],
            role: "user",
            createdAt: new Date().toISOString(),
          }
          setUser(newUser)
          localStorage.setItem("nextwave_user", JSON.stringify(newUser))
          return true
        }
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Mock registration - in real app, this would call your API
      if (email && password.length >= 6 && name) {
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          role: "user",
          createdAt: new Date().toISOString(),
        }
        setUser(newUser)
        localStorage.setItem("nextwave_user", JSON.stringify(newUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nextwave_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
