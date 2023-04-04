import Image from "next/image"
import Avatar from "../Avatar"
// import useUser from "@/hooks/useUser"

interface UserHeroProps {
  userId: string;
  userData: any
}

const UserHero: React.FC<UserHeroProps> = ({ userData }) => {

  return (
    <div>
      <div className="h-44 bg-neutral-700 relative">
        {userData?.coverImage && (
          <Image src={userData?.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userData.id} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}
export default UserHero