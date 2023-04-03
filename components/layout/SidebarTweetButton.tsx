import Link from "next/link"
import { FaFeather } from 'react-icons/fa'
import { useRouter } from "next/router"
import useLoginModal from "@/hooks/useLoginModal"
import { useCallback } from "react"


const SidebarTweetButton = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  
  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal])

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex justify-center items-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={20} color="white" />
      </div>
      <div className="mt-6 hidden lg:block rounded-full p-4 bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">Tweet</p>
      </div>
    </div>
  )
}
export default SidebarTweetButton