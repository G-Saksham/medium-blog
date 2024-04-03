import { Avatar } from "./BlogCard"
import { Blog } from "../hooks"

export const ReadBlog = ({blog,publishedOn,quotations}: {blog: Blog, publishedOn: string, quotations:string}) => {
    return <div className="flex flex-cols-1 md:flex-cols-2 justify-around m-10 p-10">
        <div className="grid justify-center max-w-3xl">
            <div className="text-4xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-gray-500 py-4">
                {publishedOn}
            </div>
            <div>
                {blog.content}
            </div>
        </div>
        <div className="max-w-sm hidden md:block">
            <div className="font-semibold">
                Author
            </div>
            <div className="flex flex-cols-2">
                <div className="flex flex-col justify-center p-2">
                    <Avatar name={blog.author.name || "Anonymous"}/>
                </div>
                <div className="grid justify-center p-2">
                    <div className="font-bold text-xl pb-1">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="text-gray-500 pt-1">
                        {quotations}
                    </div>
                </div>
            </div>
        </div>
    </div>
}