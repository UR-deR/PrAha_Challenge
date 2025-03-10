import { tv } from "tailwind-variants"
import { Skeleton } from "~/components/ui/skeleton"

const userPostSkeltonStyle = tv({
	base: "flex flex-col gap-2 border rounded-md p-2 my-2",
	slots: {
		skelton: "w-full",
	},
	variants: {
		height: {
			title: "h-7",
			content: "h-6",
		},
	},
})

export const UserPostSkelton = () => {
	const { base, skelton } = userPostSkeltonStyle()
	return (
		<div className={base()}>
			<Skeleton className={skelton({ height: "title" })} />
			<Skeleton className={skelton({ height: "content" })} />
		</div>
	)
}
