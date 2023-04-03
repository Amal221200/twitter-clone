import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from "react"
import Input from "../Input"
import Modal from "../Modal"
import useRegisterModal from "@/hooks/useRegisterModal"
import useLoginModal from "@/hooks/useLoginModal"


const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.post('/api/register', { email, password, username, name })
            toast.success('Account created')
            signIn('credentials', {
                email, password
            })
            registerModal.onClose()
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password, username, name])

    const onToggle = useCallback(() => {
        if (isLoading) return

        registerModal.onClose()
        loginModal.onOpen()
    }, [registerModal, loginModal, isLoading])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input type="email" value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)} disabled={isLoading} />

            <Input type="text" value={name} placeholder="Name" onChange={(event) => setName(event.target.value)} disabled={isLoading} />

            <Input type="text" value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)} disabled={isLoading} />

            <Input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)} disabled={isLoading} />
        </div>
    )

    const footerContent = (
        <footer className="text-neutral-400 text-center mt-4">
            <p>Already have an account? <span className="text-white cursor-pointer hover:underline" onClick={onToggle}> Sign In</span></p>
        </footer>
    )
    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Create an Account" actionLabel="Register" onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent} />
    )
}
export default RegisterModal