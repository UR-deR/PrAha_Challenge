import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import type { ReactNode } from 'react'
import { NuqsProvider } from '~/components/providers/nuqs-provider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'AI Interview',
	description: 'AI Interview for Claves',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="ja">
			<head>
				<script src="https://unpkg.com/react-scan/dist/auto.global.js" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NuqsProvider>
					<main className="min-h-dvh">{children}</main>
				</NuqsProvider>
			</body>
		</html>
	)
}

export default RootLayout
