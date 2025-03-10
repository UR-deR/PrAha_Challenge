import { MoveLeft } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

const UserDetailLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="py-2 px-4">
			<Link href={"/users"}>
				<MoveLeft />
			</Link>
			{children}
		</div>
	)
}

export default UserDetailLayout
