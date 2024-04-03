import { ChangeEvent } from "react"

type InputSchema = {
    label: string,
    placeholder?: string,
    type?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({label, placeholder, type, onChange}: InputSchema) => {
    return <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-900">{label}</label>
        <input 
            type={type} 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={placeholder}
            onChange={onChange}
        />
    </div>
}