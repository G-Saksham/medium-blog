export type Heading = {
    label: string
}

export const Heading = ({label}: Heading) => {
    return <div className="font-extrabold text-3xl p-1">
        {label}
    </div>
}