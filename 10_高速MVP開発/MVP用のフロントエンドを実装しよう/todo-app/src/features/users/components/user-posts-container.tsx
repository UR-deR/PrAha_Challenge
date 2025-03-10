import type { InferResponseType } from "hono"
import qs from "qs"
import { UserPost } from "~/features/users/components/user-post"
import { userSearchParams } from "~/features/users/types/search-params/user-search-params"
import { fetcher } from "~/lib/fetcher"
import { client } from "~/lib/rpc"

type UserPostProps = Record<"userId", string>

const getUserPosts = async (userId: string, query: string) => {
	type ResType = InferResponseType<
		(typeof client.api.users)[":userId"]["posts"]["$get"]
	>
	const url = client.api.users[":userId"].posts.$url({
		param: { userId },
	})

	const params = qs.stringify({ query })
	const requestUrl = `${url}?${params}`

	const posts = await fetcher<ResType>(requestUrl, {
		cache: "force-cache",
	})

	return posts
}

export const UserPostsContainer = async ({ userId }: UserPostProps) => {
	const { query } = userSearchParams.all()
	const { posts } = await getUserPosts(userId, query)

	return posts.map((post) => <UserPost key={post.id} post={post} />)
}
