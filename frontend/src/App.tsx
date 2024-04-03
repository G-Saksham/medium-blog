import {Signup} from './routes/Signup.tsx'
import {Signin} from './routes/Signin.tsx'
import {Blogs} from './routes/Blogs.tsx'
import {Blog} from './routes/Blog.tsx'
import { Publish } from './routes/Publish.tsx'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/signup" element ={<Signup/>} />
        <Route path = "/signin" element ={<Signin/>} />
        <Route path = "/blogs" element ={<Blogs/>} />
        <Route path = "/blog/:id" element ={<Blog/>} />
        <Route path = "/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
