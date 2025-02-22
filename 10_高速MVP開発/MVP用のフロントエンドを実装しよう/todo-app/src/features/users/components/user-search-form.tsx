'use client'

import { getFormProps, getInputProps } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Loader2, Search } from 'lucide-react'
import { parseAsString, useQueryStates } from 'nuqs'
import { useActionState } from 'react'
import { tv } from 'tailwind-variants'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { userSearchAction } from '~/features/users/actions/user-search-action'
import {
	type UserSearchSchemaType,
	userSearchSchema,
} from '~/features/users/types/schema/user-search-schema'
import { useSafeForm } from '~/hooks/use-safe-form'

const userSearchFormStyle = tv({
	slots: {
		searchForm: 'flex items-center justify-center gap-2 w-full',
		searchInputWrapper: 'relative',
		searchInput: 'w-[200px] md:w-[500px]',
		errMessage: 'mt-1 text-sm text-red-500 absolute left-2',
		searchButton: 'w-[100px] md:w-[200px]',
		loader: 'animate-spin',
	},
})

export const UserSearchForm = () => {
	const {
		searchForm,
		searchInputWrapper,
		searchInput,
		errMessage,
		searchButton,
		loader,
	} = userSearchFormStyle()

	const [queryParams, setQueryParams] = useQueryStates(
		{
			query: parseAsString.withDefault(''),
		},
		{
			history: 'push',
		},
	)

	const [lastResult, action, isPending] = useActionState<
		Awaited<ReturnType<typeof userSearchAction>> | null,
		FormData
	>(async (prev, formData) => {
		const result = await userSearchAction(prev, formData)
		if (result.status === 'success') {
			setQueryParams({ query: formData.get('query') as string })
			return result
		}

		return null
	}, null)

	const [form, fields] = useSafeForm<UserSearchSchemaType>({
		constraint: getZodConstraint(userSearchSchema),
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: userSearchSchema })
		},

		defaultValue: {
			query: queryParams.query,
		},
	})

	return (
		<form {...getFormProps(form)} action={action} className={searchForm()}>
			<div className={searchInputWrapper()}>
				<Input
					{...getInputProps(fields.query, { type: 'text' })}
					// action実行時にkeyがないとコンポーネントを識別できないというエラーがでるためkeyを設定
					key={fields.query.id}
					type="text"
					placeholder="Search users..."
					className={searchInput()}
					defaultValue={
						lastResult?.initialValue?.query
							? lastResult.initialValue.query.toString()
							: ''
					}
					onChange={(e) => {
						setQueryParams({ query: e.target.value })
					}}
					disabled={isPending}
				/>
				<span id={fields.query.errorId} className={errMessage()}>
					{fields.query.errors}
				</span>
			</div>
			<Button type="submit" disabled={isPending} className={searchButton()}>
				{isPending ? (
					<>
						Searching...
						<Loader2 className={loader()} />
					</>
				) : (
					<>
						Search
						<Search />
					</>
				)}
			</Button>
		</form>
	)
}
