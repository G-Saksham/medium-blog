import { MouseEvent } from "react"

export type Button = {
    label: string,
    onPress: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({label, onPress}: Button) => {
    return  <div>    
        <button onClick={onPress} 
            type="button" 
            className = "w-full text-white bg-black font-semibold rounded-lg text-sm px-5 py-2.5 text-center">
                {label}
        </button>
    </div>
}