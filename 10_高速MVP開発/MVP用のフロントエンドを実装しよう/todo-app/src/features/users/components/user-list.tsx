import type { InferResponseType } from "hono"
import qs from "qs"
import { UserListCard } from "~/features/users/components/user-list-card"
import { GET_USER_LIST_CACHE_KEY } from "~/features/users/constants/cache-key"
import { userSearchParams } from "~/features/users/types/search-params/user-search-params"
import { getDatabase } from "~/lib/drizzle/get-database"
import { users } from "~/lib/drizzle/schema"
import { fetcher } from "~/lib/fetcher"
import { client } from "~/lib/rpc"

const getUsers = async (query: string) => {
	const database = getDatabase();
	const userList = await database.select().from(users);

	return userList
}

export const UserList = async () => {
	const { query } = userSearchParams.all()
	const res = await getUsers(query)

	return res.map((user) => <UserListCard key={user.id} user={user} />)
}
