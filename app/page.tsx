import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main className="">
			<p>liker application</p>
			<UserButton afterSignOutUrl="/" />
		</main>
	);
}
