"use client";
// current user
import { Home, Settings2, User, User2Icon } from "lucide-react";

// Components
import Image from "next/image";
import MobileSheet from "./mobile-sheet";

// Shadcn-ui
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";

// get size of window hook
import { useWindowSize } from "@uidotdev/usehooks";
import Link from "next/link";

const Navbar = () => {
	const session = useSession();

	console.log(session);

	const { width } = useWindowSize();
	return (
		<nav
			className="sticky top-0 left-0 right-0 py-1 shadow-xl shadow-gray-100/70
        flex justify-between items-center gap-4"
		>
			{/* logo */}
			<div className="w-12 h-12 flex items-center gap-2">
				<Image src={"/logo.svg"} alt="logo" width={25} height={25} />
				<h1 className="hidden md:block">Linker</h1>
			</div>

			{/* show this section (navbar items) when screen is greater than 768px on the middle of navbar */}
			{width && width > 768 && (
				<ul className="flex items-center gap-8">
					<li
						className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 ease-out cursor-pointer
					flex items-center gap-2"
					>
						<Home className="w-4 h-4" />
						<Link href={"/"}>Home</Link>
					</li>
					<li
						className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 ease-out cursor-pointer
					flex items-center gap-2"
					>
						<User2Icon className="w-4 h-4" />
						<Link href={"/profile"}>Profile</Link>
					</li>
					<li
						className="text-sm font-medium text-gray-600 hover:text-black transition-all duration-300 ease-out cursor-pointer
					flex items-center gap-2"
					>
						<Settings2 className="w-4 h-4" />
						<Link href={"/manage"}>Manage</Link>
					</li>
				</ul>
			)}

			{/* user button - if not loggedIn user show Register button else 
                show avatar with user account management 
            */}
			{session.isSignedIn ? (
				<UserButton afterSignOutUrl="/" />
			) : (
				<SignInButton afterSignInUrl="/" mode="modal" afterSignUpUrl="/">
					<Button
						size={"sm"}
						className="flex items-center gap-1 rounded-xl shadow-xl shadow-blue-100/60 px-4"
					>
						<User />
						<span>Register</span>
					</Button>
				</SignInButton>
			)}

			{/* in mobile devices show sheet component trigger */}
			{width && width <= 768 && <MobileSheet />}
		</nav>
	);
};

export default Navbar;
