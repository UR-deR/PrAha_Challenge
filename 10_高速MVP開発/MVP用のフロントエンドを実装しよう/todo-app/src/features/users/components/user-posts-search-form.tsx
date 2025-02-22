import { Search } from 'lucide-react'
import Form from 'next/form'
import { tv } from 'tailwind-variants'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { userSearchParams } from '~/features/users/types/search-params/user-search-params'

const userPostsSearchFormStyle = tv({
	base: 'flex items-center justify-center gap-2 max-w-sm',
	slots: {
		textField: 'w-full',
	},
})

export const UserPostsSearchForm = () => {
	const { base, textField } = userPostsSearchFormStyle()

	const { query } = userSearchParams.all()

	return (
		<Form action="" className={base()}>
			<Input
				type="text"
				name="query"
				placeholder="Search posts"
				defaultValue={query}
				className={textField()}
			/>
			<Button type="submit">
				Search <Search />
			</Button>
		</Form>
	)
}
