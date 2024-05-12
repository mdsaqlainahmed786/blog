import { PrismaClient } from '@prisma/client/edge'
import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { createBlog, updateBlog } from "@saqlain-ahmed/medium-common-zod"
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {
    try {
        const jwt = c.req.header('Authorization');
        if (!jwt) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        const token = jwt.split(' ')[1];  //[0] = "Bearer", [1] ="jwt"
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }
        c.set('userId', payload.id);
        await next()
    } catch (err) {
        console.error(err)
        return c.json({
            message: "You are not logged in!!!",
            err
        })
    }
})

blogRouter.post('/add', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = createBlog.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: "Invalid credentials"
        })
    }
    const userID = c.get("userId")
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userID,
                postedAt: new Date().toISOString()
            }
        })
        return c.json({
            id: post.id
        })
    } catch (err) {
        console.error(err)
    }
})

blogRouter.put('/edit', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const { success } = updateBlog.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message: "Invalid credentials"
        })
    }
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.get('/get/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const id = await c.req.param("id")
    try {
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            include: {
                author: true // Include the author details
            }
        })
        return c.json({
            post,
        })

    } catch (error) {
        console.error(error)
        c.json({
            err: error
        })
    }
})
blogRouter.get('/getall/blogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
            include: {
                author: true // Include the author details
            }
        });

        return c.json({
            blogs
        });
    } catch (error) {
        console.error(error);
        return c.json({ error: "Internal Server Error" });
    }
});
