import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const userSearchParams = createSearchParamsCache({
	query: parseAsString.withDefault(""),
})
