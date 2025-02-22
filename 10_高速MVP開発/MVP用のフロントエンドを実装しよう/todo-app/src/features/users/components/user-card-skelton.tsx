import { tv } from 'tailwind-variants'
import { Card } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

const userSkeltonStyle = tv({
	slots: {
		base: 'flex flex-col items-center space-y-1.5 w-full',
		userAccountNameSkelton: 'h-16',
		userNameSkelton: 'h-28',
		userEmailSkelton: 'h-[60px]',
	},
	compoundSlots: [
		{
			slots: ['userAccountNameSkelton', 'userNameSkelton', 'userEmailSkelton'],
			class: 'w-[340px] rounded-xl',
		},
	],
})

export const UserCardSkelton = () => {
	const { base, userAccountNameSkelton, userNameSkelton, userEmailSkelton } =
		userSkeltonStyle()

	return (
		<Card className={base()}>
			<Skeleton className={userAccountNameSkelton()} />
			<Skeleton className={userNameSkelton()} />
			<Skeleton className={userEmailSkelton()} />
		</Card>
	)
}
