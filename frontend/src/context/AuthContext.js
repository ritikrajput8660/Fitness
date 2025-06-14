import { createContext, useReducer, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isLoaded: true }
    case "LOGOUT":
      return { user: null, isLoaded: true }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoaded: false
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "LOGIN", payload: user })
    }
  }, [])

  useEffect(() => {
    const checkTokenExpiration = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        const token = user.token
        const decodedToken = jwtDecode(token) // Updated function name
        const currentTime = Date.now() / 1000

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('user')
          dispatch({ type: 'LOGOUT' })
        }
      }
    }

    checkTokenExpiration()
    const interval = setInterval(checkTokenExpiration, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
