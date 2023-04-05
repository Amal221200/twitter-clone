import { useCallback, useMemo } from "react"
import useCurrentUser from "./useCurrentUser"
import usePost from "./usePost"
import useLoginModal from "./useLoginModal"
import usePosts from "./usePosts"
import axios from "axios"
import { toast } from "react-hot-toast"

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: fetchedPost, isLoading, error, mutate: mutateFetchedPost } = usePost(postId)
    const { data: currentUser } = useCurrentUser()
    const { mutate: mutateFetchedPosts } = usePosts(userId)
    const loginModal = useLoginModal()

    const isLiked = useMemo(() => {
        const likedIds = fetchedPost?.likedIds || []
        return likedIds.includes(currentUser?.id)
    }, [fetchedPost?.likedIds, currentUser?.id])

    const toggleLike = useCallback(async () => {
        if (!currentUser) {
            return loginModal.onOpen()
        }
        try {
            let request
            if (isLiked) {
                request = () => axios.delete('/api/liked', { data: { postId } })
            } else {
                request = () => axios.post('/api/liked', { postId })
            }
            await request()
            mutateFetchedPost()
            mutateFetchedPosts()
            toast.success('Success')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    }, [mutateFetchedPost, isLiked, postId, loginModal.isOpen, currentUser, mutateFetchedPosts])

    return {
        isLiked, toggleLike
    }

}
export default useLike