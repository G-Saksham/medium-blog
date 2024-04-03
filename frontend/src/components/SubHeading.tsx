import { Link } from 'react-router-dom'

export type Subheading = {
    label: string,
    underline?: string,
    to: string
}

export const SubHeading = ({label, underline, to}: Subheading) => {
    return <div className="text-gray-500 flex justify-center pb-2 text-lg">
        <div className="p-1">
            {label}
            <Link to={to} 
                className="underline p-1"
            >{underline}
            </Link>
        </div>
    </div>
}