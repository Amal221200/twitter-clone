import Link from "next/link"
import { FaFeather } from 'react-icons/fa'
// import { useRouter } from "next/router"


const SidebarTweetButton = () => {
  // const router = useRouter()
  return (
    <Link href={'/'}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex justify-center items-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={20} color="white" />
      </div>
      <div className="mt-6 hidden lg:block rounded-full p-4 bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">Tweet</p>
      </div>
    </Link>
  )
}
export default SidebarTweetButton