import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Navbar from "./_components/navbar";

const poppins = Poppins({
	weight: ["300", "400", "500", "700", "900"],
	preload: false,
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Linker",
	description: "link users to each other easily with linker.io",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en" className="hidden-scrollbar">
				<body
					className={`${poppins.className} w-full h-screen container overflow-hidden flex flex-col`}
				>
					<header>
						<Navbar />
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
