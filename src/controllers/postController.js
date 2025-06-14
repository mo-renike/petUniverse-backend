import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createPost = async (req, res) =>{
    const {title, content, authorId} = req.body

    try {
        const post = await prisma.post.create(
            {
                data: {
                    title,
                    content, 
                    authorId,
                }
            }

        );
        res.status(201).json(post)
    } catch (error) {
        console.log("Error creating post: ", error);
        
        res.status(501).send("Could not create post :( , try recreating post or hold on for a while...:) ")
    }
}

export const getPosts = async(req, res)=>{
    try {
        const posts = await prisma.post.findMany(
            {
                include:{
                    comments: true
                }
            }
        );
        res.status(200).json(posts)
    } catch (error) {
        console.log("error creating posts: ", error);
        
     res.status(501).send("Failed to fetch posts, refresh or call the frontend developer, not me :)")
    }
}