import Link from "next/link"
import { useRouter } from "next/router"
import { BsTwitter } from 'react-icons/bs'

const SidebarLogo = () => {
    const router = useRouter()

    return (
        <Link href={'/'}  className="h-14 w-14 rounded-full flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
            <BsTwitter color="white" size={20} />
        </Link>
    )
}
export default SidebarLogo