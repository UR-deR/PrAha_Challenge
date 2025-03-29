type FetchArgs = Parameters<typeof fetch>
type Fetcher = <T>(url: FetchArgs[0], args?: FetchArgs[1]) => Promise<T>

export const fetcher: Fetcher = async (url, args) => {
	const response = await fetch(url, args)	
	const json = await response.json()
	return json
}
