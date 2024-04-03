import { Appbar } from "../components/Appbar"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { BlogSchema } from "@shaks674/medium-blog-app"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<BlogSchema>({
        title: "",
        content: ""
    })

    const postData = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,
                data,
                {
                    headers: {
                        Authorization: localStorage.getItem("auth"),
                        "Content-Type": "application/json"
                    }
                }
            )
            localStorage.setItem("blogId", response.data.id);
            navigate(`/blog/${response.data.id}`);
        }
        catch(e) {
            alert(e)
        }
    }

    return <div>
        <Appbar type='publish'/>
        <div className="grid justify-center p-6">
            <div className="max-w-full w-screen p-8 pt-2">
            <div className="text-2xl font-semibold flex flex-col justify-center m-6 mt-0">
                Write a blog post...
            </div>
            <textarea rows={1} className="font-bold block p-2 w-full text-3xl text-black bg-gray-100 rounded-lg" 
                        placeholder="Title..."
                        onChange={(e) => {
                            setData({...data,
                            title: e.target.value})
                        }}
                        required >
            </textarea>
            <textarea rows={12} className="my-4 p-2 block w-full rounded-lg text-md text-black bg-gray-100" 
                    placeholder="Write an article..."
                    onChange={(e) => {
                        setData({...data,
                        content: e.target.value})
                    }} 
                    required >
            </textarea>
            <div className="flex justify-end">
                <button type="submit" 
                    className="m-2 px-10 py-2.5 text-md font-medium text-white bg-black rounded-full hover:bg-gray-900"
                    onClick={postData}    
                > Publish blog 
                </button>
            </div>
            </div>
        </div>
    </div>
}