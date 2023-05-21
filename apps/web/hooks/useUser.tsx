import { getAuthToken } from "@/utils/authToken"
import { create } from "zustand"

import { User } from "@/types/user"
import axiosInstance from "@/lib/axios"

interface IUseUser {
  user?: User
  loginStatus: "loading" | "login" | "logout"
  setUserAuth: (user: User) => void
  fetchUser: () => void
}

const useUser = create<IUseUser>((set) => ({
  loginStatus: `loading`,
  user: undefined,
  setUser: (user: User) => {
    set({ user: user })
  },
  setUserAuth: (user: User) => {
    set({ user, loginStatus: `login` })
  },
  fetchUser: async () => {
    const token = getAuthToken()
    try {
      if (token) {
        const response = await axiosInstance.get<{ data: User }>(`/user/me`)
        set({
          loginStatus: `login`,
          user: response.data.data,
        })
        return
      } else {
        set({ loginStatus: `logout` })
        return
      }
    } catch (e) {
      set({ loginStatus: `logout` })
      return
    }
  },
}))

export default useUser
