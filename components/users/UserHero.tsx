import Image from "next/image"
import Avatar from "../Avatar"
import useUser from "@/hooks/useUser";
// import useUser from "@/hooks/useUser"

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId)
  return (
    <div>
      <div className="h-44 bg-neutral-700 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser?.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }} />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={fetchedUser.id} isLarge hasBorder />
        </div>
      </div>
    </div>
  )
}

export default UserHero