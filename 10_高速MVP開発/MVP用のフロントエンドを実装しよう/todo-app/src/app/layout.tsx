import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { NuqsProvider } from "~/components/providers/nuqs-provider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "sample",
	description: "sample",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<ClerkProvider>
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
		</ClerkProvider>
	);
};

export default RootLayout;
