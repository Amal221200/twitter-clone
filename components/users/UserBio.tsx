import { format } from 'date-fns'
import { BiCalendar } from 'react-icons/bi';
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from 'react';
import Button from '../Button';


interface UserBioProps {
    userId?: string;
    userData?: any
}

const UserBio: React.FC<UserBioProps> = ({ userData, userId }) => {
    const { data: currentUser } = useCurrentUser()
    if (userId) {
        const { data: fetchedUser } = useUser(userId)
        userData = fetchedUser
    }


    const createdAt = useMemo(() => {
        if (!userData?.createdAt) {
            return null
        }

        return format(new Date(userData?.createdAt), 'MMMM yyyy')
    }, [userData?.createdAt])


    return (
        <div className='border-b-[2px] border-neutral-800 pb-4'>
            <div className="flex justify-end p-2">
                {
                    currentUser?.id === userData?.id ? (
                        <Button secondary label='Edit' onClick={() => { }} />
                    ) : (
                        <Button onClick={() => { }} label='Follow' secondary />
                    )
                }
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {userData?.name}
                    </p>
                    <p className="font-md text-neutral-500">
                        {userData?.username}
                    </p>
                </div>
                <div className="flex flex-col m1-4">
                    <p className="text-white">
                        {userData?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar /> <p>Joined {createdAt}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4 gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className='text-white'>
                            {userData?.followingIds?.length}
                        </p>
                         <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <p className='text-white'>
                            {userData?.followersCount || 0}
                        </p>
                         <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserBio