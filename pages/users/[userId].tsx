import { ClipLoader } from 'react-spinners'
import Header from "@/components/Header"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/router"
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio'


const UserView = () => {
    const router = useRouter()
    const { userId } = router.query
    const { data: fethedUser, isLoading } = useUser(userId as string)

    if (isLoading || !fethedUser) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader loading={isLoading} color='lightblue' size={80} />
            </div>
        )
    }
    return (
        <>
            <Header label={fethedUser?.name} showBackArrow />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
        </>
    )
}
export default UserView