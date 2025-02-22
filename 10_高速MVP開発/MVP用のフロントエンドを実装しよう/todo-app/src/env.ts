import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(['development', 'production']),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
})
