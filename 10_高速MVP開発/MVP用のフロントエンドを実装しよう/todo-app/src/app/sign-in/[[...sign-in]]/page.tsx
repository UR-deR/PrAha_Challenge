import { SignIn } from "@clerk/nextjs"

const SignInPage = () => {
	return (
		<div className="w-full mt-24 flex justify-center items-center">
			<SignIn fallbackRedirectUrl={"/"} />
		</div>
	)
}

export default SignInPage
