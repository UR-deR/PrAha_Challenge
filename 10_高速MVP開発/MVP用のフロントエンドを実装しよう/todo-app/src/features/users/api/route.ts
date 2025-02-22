import { Hono } from 'hono'
import { filter, pipe } from 'remeda'
import type { Post } from '~/features/users/types/post'
import type { User } from '~/features/users/types/user'
import { fetcher } from '~/lib/fetcher'

const app = new Hono()
	.get('/', async (c) => {
		const { query } = c.req.query()

		const res = await fetcher<User[]>(
			'https://jsonplaceholder.typicode.com/users',
		)

		const filteredUsers = pipe(
			res,
			filter(
				(user) =>
					user.username.toLowerCase().includes(query.toLowerCase()) ||
					user.name.toLowerCase().includes(query.toLowerCase()) ||
					user.email.toLowerCase().includes(query.toLowerCase()),
			),
		)

		return c.json({ userList: filteredUsers }, 200)
	})
	.get('/:userId', async (c) => {
		const { userId } = c.req.param()

		const res = await fetcher<User>(
			`https://jsonplaceholder.typicode.com/users/${userId}`,
		)

		const user = {
			email: res.email,
			name: res.name,
			username: res.username,
		} as const satisfies Pick<User, 'email' | 'name' | 'username'>

		return c.json({ user }, 200)
	})
	.get('/:userId/posts', async (c) => {
		const { userId } = c.req.param()
		const { query } = c.req.query()

		const res = await fetcher<Post[]>(
			`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
		)

		const filteredPosts = pipe(
			res,
			filter(
				(post) =>
					post.title.toLowerCase().includes(query.toLowerCase()) ||
					post.body.toLowerCase().includes(query.toLowerCase()),
			),
		)

		return c.json({ posts: filteredPosts }, 200)
	})

export default app
