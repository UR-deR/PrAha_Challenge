import { Separator } from '@radix-ui/react-separator'
import type { InferResponseType } from 'hono'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { tv } from 'tailwind-variants'
import { Button } from '~/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card'
import type { client } from '~/lib/rpc'

const userListCardStyle = tv({
	base: 'w-[350px]',
	slots: {
		content: 'space-y-2',
		footer: 'flex items-center',
		link: 'w-full',
	},
	compoundSlots: [{ slots: ['content', 'footer'], class: 'mt-2' }],
})

type UserListCardProps = Record<
	'user',
	InferResponseType<typeof client.api.users.$get>['userList'][number]
>

export const UserListCard = ({ user }: UserListCardProps) => {
	const { base, content, footer, link } = userListCardStyle()

	return (
		<Card key={user.id} className={base()}>
			<CardHeader>
				<CardTitle>{user.username}</CardTitle>
			</CardHeader>
			<Separator />
			<CardContent className={content()}>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p>{user.phone}</p>
			</CardContent>
			<CardFooter className={footer()}>
				<Link href={`/users/${user.id}`} className={link()}>
					<Button className="w-full">
						<Check /> View Profile
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
