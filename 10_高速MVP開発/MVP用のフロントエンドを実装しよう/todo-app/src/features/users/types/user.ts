type Address = Record<
	"street" | "suite" | "city" | "zipcode" | "geo",
	string | Record<"lat" | "lng", string>
>

type Company = Record<"name" | "catchPhrase" | "bs", string>

export type User = {
	id: number
	name: string
	username: string
	email: string
	address: Address
	phone: string
	website: string
	company: Company
}
