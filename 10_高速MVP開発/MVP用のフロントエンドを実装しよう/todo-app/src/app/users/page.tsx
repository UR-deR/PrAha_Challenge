import type { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { tv } from "tailwind-variants"
import { UserCardSkelton } from "~/features/users/components/user-card-skelton"
import { UserList } from "~/features/users/components/user-list"
import { UserSearchForm } from "~/features/users/components/user-search-form"
import { userSearchParams } from "~/features/users/types/search-params/user-search-params"

const userListPageStyle = tv(
	{
		slots: {
			base: "flex flex-col justify-center items-center",
			searchFormSection: "mt-4 mb-2",
			userListBase: "flex my-4",
			userListSection: "grid grid-cols-1  gap-4 mx-auto",
		},
		compoundSlots: [
			{
				slots: ["base", "searchFormSection", "userListBase"],
				class: "w-full",
			},
		],
		variants: {
			size: {
				md: {
					userListSection: "grid-cols-2",
				},
				lg: {
					userListSection: "grid-cols-3",
				},
				xl: {
					userListSection: "grid-cols-4",
				},
			},
		},
	},
	{ responsiveVariants: ["md", "lg", "xl"] },
)

type UserListPageProps = {
	searchParams: Promise<SearchParams>
}

const UserListPage = async ({ searchParams }: UserListPageProps) => {
	await userSearchParams.parse(searchParams)
	const { base, searchFormSection, userListBase, userListSection } =
		userListPageStyle()

	return (
		<div className={base()}>
			<section className={searchFormSection()}>
				<UserSearchForm />
			</section>
			<div className={userListBase()}>
				<section
					className={userListSection({
						size: {
							md: "md",
							lg: "lg",
							xl: "xl",
						},
					})}
				>
					<Suspense
						fallback={Array.from({ length: 8 }).map(() => (
							<UserCardSkelton key={crypto.randomUUID()} />
						))}
					>
						<UserList />
					</Suspense>
				</section>
			</div>
		</div>
	)
}

export default UserListPage
