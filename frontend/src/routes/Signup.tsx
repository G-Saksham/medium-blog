import { InfoCard } from "../components/InfoCard"
import { Quotes } from "../components/Quotes"

export const Signup = () => {
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
            <InfoCard type={"signup"}/>
        </div>
        <div className="hidden md:block">
        <Quotes/>
        </div>
    </div>
}