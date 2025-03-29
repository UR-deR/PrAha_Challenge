import { Separator } from "@radix-ui/react-separator"
import type { InferResponseType } from "hono"
import type { SearchParams } from "nuqs"
import { Suspense, cache } from "react"
import { tv } from "tailwind-variants"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { UserPostSkelton } from "~/features/users/components/user-post-skelton"
import { UserPostsContainer } from "~/features/users/components/user-posts-container"
import { UserPostsSearchForm } from "~/features/users/components/user-posts-search-form"
import { GET_USER_CACHE_KEY } from "~/features/users/constants/cache-key"
import { userSearchParams } from "~/features/users/types/search-params/user-search-params"
import { fetcher } from "~/lib/fetcher"
import { client } from "~/lib/rpc"

const userDetailPageStyle = tv({
	slots: {
		base: "",
		card: "w-[350px]",
		skelton: "h-4 w-[300px]",
		cardContent: "space-y-2",
		cardContentItem: "items-center gap-1",
		userPostsWrapper: "mt-4 flex-col justify-center gap-2",
	},
	compoundSlots: [
		{ slots: ["base", "cardContent"], class: "mt-2" },
		{ slots: ["cardContentItem", "userPostsWrapper"], class: "flex" },
	],
})

const getUser = cache(async (userId: string) => {
	type ResType = InferResponseType<(typeof client.api.users)[":userId"]["$get"]>
	const url = client.api.users[":userId"].$url({
		param: { userId },
	})

	const res = await fetcher<ResType>(url, {
		cache: "force-cache",
		next: { tags: [`${GET_USER_CACHE_KEY}/${userId}`] },
	})

	return res
})

type UserDetailPageProps = {
	params: Promise<Record<"userId", string>>
	searchParams: Promise<SearchParams>
}

const UserDetailPage = async ({
	params,
	searchParams,
}: UserDetailPageProps) => {
	const {
		base,
		card,
		skelton,
		cardContent,
		cardContentItem,
		userPostsWrapper,
	} = userDetailPageStyle()

	await userSearchParams.parse(searchParams)
	const { userId } = await params

	const userPromise = getUser(userId)

	return (
		<div className={base()}>
			<Card className={card()}>
				<CardHeader>
					<Suspense fallback={<Skeleton className={skelton()} />}>
						<CardTitle>
							{userPromise.then(({ user }) => user?.username)}
						</CardTitle>
					</Suspense>
				</CardHeader>
				<Separator />
				<CardContent className={cardContent()}>
					<div className={cardContentItem()}>
						<p>name:</p>
						<Suspense fallback={<Skeleton className={skelton()} />}>
							<p>{userPromise.then(({ user }) => user?.name)}</p>
						</Suspense>
					</div>
					<div className={cardContentItem()}>
						<p>email:</p>
						<Suspense fallback={<Skeleton className={skelton()} />}>
							<p>{userPromise.then(({ user }) => user?.email)}</p>
						</Suspense>
					</div>
				</CardContent>
			</Card>
			<div className={userPostsWrapper()}>
				<UserPostsSearchForm />
				<section>
					<Suspense
						fallback={
							<>
								<UserPostSkelton />
								<UserPostSkelton />
								<UserPostSkelton />
								<UserPostSkelton />
								<UserPostSkelton />
							</>
						}
					>
						<UserPostsContainer userId={userId} />
					</Suspense>
				</section>
			</div>
		</div>
	)
}

export default UserDetailPage
