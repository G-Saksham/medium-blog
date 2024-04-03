import { Avatar } from "./BlogCard"
import { Link } from "react-router-dom"

export const Appbar =({type}: {type: "blogs" | "publish"}) => {
    // const token = localStorage.getItem("auth").split(" ")[1] || ""
    
    
    const name = localStorage.getItem("userName") || "Anonymus"

    return <div className="flex justify-between px-16 border-b">
        <Link to="/blogs">
            <div className="flex flex-col text-3xl font-bold pl-16 p-2 m-2">Medium</div>
        </Link>
        <div className="flex justify-between p-6">
            {type === "blogs" ? <div>
                <Link className="flex px-4 hover:underline" to="/publish">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </div>
                    <div>
                        Write
                    </div>
                </Link>
                </div> : null
            }
            <div className="flex flex-col pl-4 text-sm">
                <Avatar name={name}/>
            </div>
            <div className="flex flex-col text-md px-2">
                {`Hi, ${name}`}
            </div>
        </div>
    </div>
}