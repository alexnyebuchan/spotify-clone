import { useContext, createContext, useState, FC, PropsWithChildren } from 'react'
import { ProfileResponseType } from '../types/profile'

export type UserContextType = {
    profile: ProfileResponseType | null
} 

const UserContext = createContext<UserContextType>({
    profile: null
})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [profile, setProfile] = useState(null);

    console.warn(window.sessionStorage.getItem("token"));

  return (
    <UserContext.Provider value={{ profile }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('you are trying to use this custom hook outside of the UserProvider')
    }

    return context
}

export default UserProvider