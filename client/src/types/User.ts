import {z} from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
})

export type User = z.infer<typeof UserSchema>


export const UserAuthSchema = z.object({
  username: z.string(),
  password: z.string()
})

export type UserAuth = z.infer<typeof UserAuthSchema>
// export type User = {
//   id: string,
//   username: string,
// }