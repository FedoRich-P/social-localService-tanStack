import {z} from 'zod'

export const PostSchema = z.object({
  id: z.string(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.number()
})

export const PostList = z.array(PostSchema)


export type Post = z.infer<typeof PostSchema>
export type PostList = z.infer<typeof PostList>
export const FetchPostListSchema = z.object({
  list: PostList
})


// export type Post = {
//   /**
//    * Идентификатор поста
//    */
//   id: string,
//   text: string,
//   authorId: string,
//   createdAt: number
// }
//
// export type PostList = Post[]