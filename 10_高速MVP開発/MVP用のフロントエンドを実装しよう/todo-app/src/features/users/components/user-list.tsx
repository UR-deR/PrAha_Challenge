import type { InferResponseType } from 'hono'
import qs from 'qs'
import { UserListCard } from '~/features/users/components/user-list-card'
import { GET_USER_LIST_CACHE_KEY } from '~/features/users/constants/cache-key'
import { userSearchParams } from '~/features/users/types/search-params/user-search-params'
import { fetcher } from '~/lib/fetcher'
import { client } from '~/lib/rpc'

const getUsers = async (query: string) => {
	const url = client.api.users.$url()
	type ResType = InferResponseType<typeof client.api.users.$get>

	const params = qs.stringify({ query })
	const requestUrl = `${url}?${params}`

	// ローディング状態がわかるよう3秒sleep
	await new Promise((resolve) => setTimeout(resolve, 3000))

	const res = await fetcher<ResType>(requestUrl, {
		cache: 'force-cache',
		next: { tags: [GET_USER_LIST_CACHE_KEY] },
	})

	return res
}

export const UserList = async () => {
	const { query } = userSearchParams.all()
	const res = await getUsers(query)

	return res.userList.map((user) => <UserListCard key={user.id} user={user} />)
}
