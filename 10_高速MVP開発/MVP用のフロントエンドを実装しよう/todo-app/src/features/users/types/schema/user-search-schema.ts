import { z } from "zod"

export const userSearchSchema = z.object({
	query: z
		.string()
		.max(255, { message: "query must be less than 255 characters" })
		.optional(),
})

export type UserSearchSchemaType = z.infer<typeof userSearchSchema>
