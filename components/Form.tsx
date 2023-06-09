import { useCallback, useState } from "react"
import { toast } from 'react-hot-toast'
import useCurrentUser from "@/hooks/useCurrentUser"
import useLoginModal from "@/hooks/useLoginModal"
import usePosts from "@/hooks/usePosts"
import useRegisterModal from "@/hooks/useRegisterModal"
import axios from "axios"
import Button from "./Button"
import Avatar from "./Avatar"

interface FormProps {
  placeholder: string,
  // onSubmit: (event: any) => void,
  isComment?: boolean,
  postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatePosts } = usePosts()
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/posts', { body })
      toast.success('Post created')
      setBody('')
      mutatePosts()
      setIsLoading(false)
    } catch (error) {
      toast.error('Somthing went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePosts])

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">

      {currentUser ?
        (
          <div className="flex flex-row gap-4">
            <div>
              <Avatar userId={currentUser?.id} />
            </div>
            <div className="w-full">
              <textarea disabled={isLoading} value={body} onChange={(e) => setBody(e.target.value)}
                className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black text-white ring-0 outline-none text-[24px] placeholder-neutral-500" placeholder={placeholder}>
              </textarea>
              <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
              <div className="flex mt-4 flex-row justify-end">
                <Button label="Tweet" disabled={isLoading || !body} onClick={onSubmit} />
              </div>
            </div>
          </div>) : (
          <div className="py-8">
            <h1 className="text-white text-2xl text-center mb-6 font-bold">
              Welcome to twitter
            </h1>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button label="Login" onClick={loginModal.onOpen} /> <Button label="Register" secondary onClick={registerModal.onOpen} />
            </div>
          </div>
        )
      }
    </div>
  )
}
export default Form