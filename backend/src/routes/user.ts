import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt'
import { signinSchema, signupSchema } from '@shaks674/medium-blog-app';

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables: {
    userId: string
    prisma: any
  }
}>()

user.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma)
  await next()
})

user.post('/signup', async (c) => {
  try{
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const parsedBody = signupSchema.safeParse(body)

    if(!parsedBody.success) {
      c.status(403)
      return c.json({error: "Wrong Inputs"});
    }

    const user = await prisma.user.create({
      data: parsedBody.data
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET)
    return c.json({
      auth: `Bearer ${token}`
    })
  } catch (error) {
    c.status(403)
    return c.json(error)
  }
})

user.post('/signin', async (c) => {
  const prisma = c.get("prisma")
  const paylaod = await c.req.json();
  const parseBody = signinSchema.safeParse(paylaod)

  if (!parseBody.success) {
    return c.json({
      error: 'Check your Inputs, and Please try again.'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parseBody.data.email,
      password: parseBody.data.password
    }
  })

  if(!user) {
    c.status(403);
    return c.json({error: 'user not found'})
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    auth: `Bearer ${token}`,
  })
})

export default user;