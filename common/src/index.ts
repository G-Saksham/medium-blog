import z from 'zod'

export const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(8, {message: 'Min 8 letters are required!'})
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export const blogUpdateSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    published: z.boolean().optional()
})

export type SignupSchema = z.infer<typeof signupSchema>
export type SigninSchema = z.infer<typeof signinSchema>
export type BlogSchema = z.infer<typeof blogSchema>
export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>

