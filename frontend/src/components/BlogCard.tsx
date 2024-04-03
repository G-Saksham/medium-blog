import { Link } from "react-router-dom"

type BlogCardProps = {
    authorName: string,
    title: string,
    content: string,
    publishedOn: string,
    id: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedOn,
    id
}: BlogCardProps ) => {
    return <Link to={`/blog/${id}`}
        onClick={()=> {localStorage.setItem("blogId",id)}}
    >
        <div className="border-b-2 w-screen max-w-full cursor-pointer">
            <div className="flex p-1">
                <div className="p-2 flex justify-center">
                    <Avatar name={authorName} />
                </div>
                <div className="p-2 font-semibold">
                    {authorName} |
                    <span className=" px-2 font-light text-sm text-gray-500">{publishedOn}</span>
                </div>
            </div>
            <div className="p-2 pb-0 font-bold text-2xl">
                {title}
            </div>
            {content.length > 120 ? 
                <div className="p-2 py-0 font-medium text-lg">
                    {content.slice(0,120) + "..."}
                </div> : 
                <div className="p-2 py-0 font-medium text-lg">
                    {content}
                </div> 
            }
            <div className="p-2 pt-0 font-thin text-gray-500">
                {`${Math.ceil(content.length/100)} minutes read`}
            </div>
        </div>
    </Link>
}

export function Avatar( {name}: {name: string}) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-500 rounded-full">
        <span className="font-thin text-white">
            {name[0]}
        </span>
    </div>    
}