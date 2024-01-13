import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="w-screen h-screen">
			<p>liker application</p>
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
