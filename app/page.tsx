import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();

	return <main className=""></main>;
}
