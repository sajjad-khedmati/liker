import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

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
			<html lang="en">
				<body className={poppins.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
