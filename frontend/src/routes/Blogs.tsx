import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks/index"
import { Skeleton } from "../components/Skeleton";

export const Blogs = () => {
    const {loading,blogs} = useBlogs();

    if(loading) {
        return <div>
            <Appbar type="blogs"/>
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>
        </div>
    }

    return <div className="grid ">
        <div className="">
            <Appbar type="blogs"/>
        </div>
        <div className="grid justify-center">
            <div className="max-w-4xl">
                {blogs.map(blog => <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name || "Anonymus"}
                    title={blog.title}
                    content={blog.content}
                    publishedOn="March, 2024"
                    />
                )}
            </div>
        </div>
    </div>
}
