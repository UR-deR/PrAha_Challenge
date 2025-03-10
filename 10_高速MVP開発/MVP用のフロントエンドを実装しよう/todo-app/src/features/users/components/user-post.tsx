import { Separator } from "@radix-ui/react-separator"
import type { InferResponseType } from "hono"
import { tv } from "tailwind-variants"
import type { client } from "~/lib/rpc"

const userPostStyle = tv({
	base: "border rounded-md p-2",
	slots: {
		title: "font-bold text-lg",
		separator: "",
	},
	compoundSlots: [{ slots: ["base", "separator"], class: "my-2" }],
})

type UserPostProps = Record<
	"post",
	InferResponseType<
		(typeof client.api.users)[":userId"]["posts"]["$get"]
	>["posts"][number]
>

export const UserPost = ({ post }: UserPostProps) => {
	const { base, title, separator } = userPostStyle()

	return (
		<div className={base()}>
			<h2 className={title()}>{post.title}</h2>
			<Separator className={separator()} />
			<p>{post.body}</p>
		</div>
	)
}
