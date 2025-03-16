import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import type { ReactNode } from "react"
import { NuqsProvider } from "~/components/providers/nuqs-provider"
import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs"
import { jaJP } from "@clerk/localizations"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "sample",
	description: "sample",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<ClerkProvider localization={jaJP}>
			<html lang="ja">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<header className="fixed top-0 left-0 w-full z-50 h-16 bg-neutral-100 flex items-center">
						<SignedOut>
							<div className="h-fit ml-4 bg-blue-500 w-fit p-2 rounded-md text-white text-sm font-semibold">
								<SignInButton />
							</div>
						</SignedOut>
						<SignedIn>
							<div className="h-fit ml-4 w-fit">
								<UserButton />
							</div>
						</SignedIn>
					</header>
					<NuqsProvider>
						<main className="min-h-dvh">{children}</main>
					</NuqsProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
