'use server'

import { parseWithZod } from '@conform-to/zod'
import { revalidateTag } from 'next/cache'
import { GET_USER_LIST_CACHE_KEY } from '~/features/users/constants/cache-key'
import { userSearchSchema } from '~/features/users/types/schema/user-search-schema'

export const userSearchAction = async (_: unknown, formData: FormData) => {
	const submission = parseWithZod(formData, { schema: userSearchSchema })

	if (submission.status !== 'success') {
		return submission.reply()
	}

	revalidateTag(GET_USER_LIST_CACHE_KEY)

	return submission.reply()
}
