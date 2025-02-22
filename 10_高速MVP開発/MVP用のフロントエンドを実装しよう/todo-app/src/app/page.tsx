import Link from 'next/link'
const Home = () => {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<p className="text-2xl font-bold text-indigo-500">Hello World!</p>
			<Link href={'/users'} className="text-blue-500 hover:underline">
				see users
			</Link>
		</div>
	)
}

export default Home
