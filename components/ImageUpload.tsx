import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

interface ImageUploadProps {
    onChange: (base64: string) => void,
    label: string,
    value?: string
    disabled?: boolean
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, label, disabled, value }) => {
    const [base64, setBase64] = useState(value)

    const handleChange = useCallback((base64: string) => {
        onChange(base64)
    }, [onChange])

    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader()

        reader.onload = (event: any) => {
            setBase64(event.target.result)
            handleChange(event.target.result)
        }

        reader.readAsDataURL(file)
    }, [handleChange])

    const { getInputProps, getRootProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    })
    return (
        <div {...getRootProps({
            className: 'w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer'
        })}>
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="relative flex items-center justify-center gap-2 border-solid">
                        <Image src={base64} height={100} width={100} alt="Uploaded Image" /> <span className="absolute top-0 right-[40%] hover:bg-gray-100 text-white hover:text-black rounded-[50%] h-5 w-5 flex justify-center items-center transition" onClick={(e) => {
                            e.stopPropagation()
                            setBase64('')
                            handleChange('')
                        }}>X</span>
                    </div>
                ) : (
                    <p className="text-white">{label}</p>
                )
            }
        </div>
    )
}
export default ImageUpload