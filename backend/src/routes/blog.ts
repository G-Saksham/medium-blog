import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { blogSchema, blogUpdateSchema } from "@shaks674/medium-blog-app";

type Bindings = {
  DATABASE_URL: string
  JWT_SECRET: string
}

type Variables = {
  userId: string,
  prisma: any,
  blogId: string
}

const blog = new Hono<{
  Bindings: Bindings,
  Variables: Variables
}>();

blog.use('/*', async (c, next) => {
  try{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    c.set("prisma", prisma)
    const authheader = c.req.header("authorization") || "";
    const [ , token] = authheader.split(" ")
    const response = await verify(token, c.env.JWT_SECRET);
    c.set("userId", response.id)
    await next();
  }
  catch(error) {
    c.status(403)
    return c.json({
      error: 'Unauthorized user request!' 
    })
  }
})

blog.post('/', async (c) => {
  const prisma = c.get("prisma")
  const userId = c.get("userId")
  const body = await c.req.json();
  const parsedBody = blogSchema.safeParse(body);
  if(!parsedBody.success) {
    c.status(403)
    return c.json({msg: `Wrong Inputs`})
  }
  const blog = await prisma.blog.create({
    data: {
      title: parsedBody.data.title,
      content: parsedBody.data.content,
      authorId: userId
    }
  })
  return c.json({
    id: blog.id
  })
})

// not checked yet
blog.put('/', async (c) => {
  try{
    const prisma = c.get("prisma")
    const userId = c.get("userId")
    const blogId = localStorage.getItem("blogId")
    // const blogId = c.get("blogId")
    const body = await c.req.json();
    const parsedBody = blogUpdateSchema.safeParse(body);

    if(!parsedBody.success) {
      c.status(403)
      return c.json({msg: `Wrong Inputs`})
    }

    await prisma.blog.update({
      where: {
        id: blogId,
        authorId: userId
      },
      data: parsedBody
    });

    return c.json({
      msg: `Updated Successfully!`
    })
  } catch (error) {
    c.status(403)
    return c.json(error)
  }
})

// Todo: add pagenation for
blog.get('/bulk', async (c) => {
  const prisma = c.get("prisma");
  const userId = c.get("userId");
  const blogs = await prisma.blog.findMany({
    where: {
      authorId: userId
    }
  })
  return c.json({blogs})
})

blog.get('/:id', async (c) => {
  try {
    const prisma = c.get("prisma");
    const {id} = c.req.param();
    const userId = c.get("userId");
    const blog = await prisma.blog.findUnique({
      where: {
        id,
        authorId: userId
      }
    })
    return c.json(blog)
  } catch (error) {
    c.status(404)
    return c.json(c.error)
  }
})


export default blog;