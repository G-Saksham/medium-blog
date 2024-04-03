import { InfoCard } from "../components/InfoCard"
import { Quotes } from "../components/Quotes"

export const Signin = () => {
    return <div className="grid grid-cols-2">
        <div className="">
            <InfoCard type={"signin"}/>
        </div>
        <div className="invisible md:visible">
        <Quotes/>
        </div>
    </div>
}