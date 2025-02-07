import {z} from 'zod'

export const CreatePostSchema = z.object({
  text: z.string().min(10, 'Длина поста должна быть не менее 10 символов')
})

export type CreatePostResponse = z.infer<typeof CreatePostSchema>