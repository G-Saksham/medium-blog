import { Appbar } from "../components/Appbar";
import { ReadBlog } from "../components/ReadBlog";
import { useBlog } from "../hooks/index";
import {useParams} from 'react-router-dom/'
import { Skeleton } from "../components/Skeleton";

export const Blog = () => {
    let {id} = useParams()
    const {loading, blog} = useBlog({id: id || ""});
    
    //add skeleton
    if(loading || !blog) {
        return <div>
            <Skeleton/>
        </div>
    }

    return <div className="">
        <Appbar type={"blogs"}/>
        <ReadBlog blog={blog}
            publishedOn={"Posted on August 24, 2023"}
            quotations="Master of mirth, purveyor of puns, and the funniest person in the kingdom."
        />
    </div>
}