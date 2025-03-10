import { SignUp } from "@clerk/nextjs"

const SignUpPage = () => {
	return (
		<div className="w-full mt-24 flex justify-center items-center">
			<SignUp fallbackRedirectUrl={"/"} />
		</div>
	)
}

export default SignUpPage
