import { format } from 'date-fns'
import { BiCalendar } from 'react-icons/bi';
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useCallback, useMemo } from 'react';
import Button from '../Button';
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';


interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {

    const editModal = useEditModal()
    const { data: currentUser } = useCurrentUser()
    const { data: fetchedUser } = useUser(userId)
    const { isFollowing, toggleFollow } = useFollow(userId)
    const createdAt = useMemo(() => {
        if (!fetchedUser?.createdAt) {
            return null
        }

        return format(new Date(fetchedUser?.createdAt), 'MMMM yyyy')
    }, [fetchedUser?.createdAt])

    const handleEdit = useCallback(() => {
        editModal.onOpen()
    }, [editModal])

    return (
        <div className='border-b-[2px] border-neutral-800 pb-4'>
            <div className="flex justify-end p-2">
                {
                    currentUser?.id === fetchedUser?.id ? (
                        <Button secondary label='Edit' onClick={() => { handleEdit() }} />
                    ) : (
                        <Button onClick={toggleFollow} label={isFollowing ? 'Unfollow' : 'Follow'} secondary={!isFollowing} outline={isFollowing} />
                    )
                }
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="font-md text-neutral-500">
                        {fetchedUser?.username}
                    </p>
                </div>
                <div className="flex flex-col m1-4">
                    <p className="text-white">
                        {fetchedUser?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar /> <p>Joined {createdAt}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4 gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <p className='text-white'>
                            {fetchedUser?.followingIds?.length}
                        </p>
                        <p className="text-neutral-500">Following</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <p className='text-white'>
                            {fetchedUser?.followersCount || 0}
                        </p>
                        <p className="text-neutral-500">Followers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserBio