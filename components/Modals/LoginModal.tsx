import { useCallback, useState } from "react"
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Input from "../Input"
import Modal from "../Modal"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"


const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await signIn('credentials', {
                email, password
            })

            toast.success('Logged in')
            loginModal.onClose()
        } catch (error) {
            toast.success('Something went wrong')
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password])

    const onToggle = useCallback(() => {
        if (isLoading) return
        loginModal.onClose()
        registerModal.onOpen()
    }, [isLoading, loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input type="email" value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)} disabled={isLoading} />

            <Input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} disabled={isLoading} />
        </div>
    )


    const footerContent = (
        <footer className="text-neutral-400 text-center mt-4">
            <p>First time using twitter? <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>Create an account</span></p>
        </footer>
    )
    return (
        <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Sign In" onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    )
}
export default LoginModal