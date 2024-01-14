"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import MobileSheet from "./mobile-sheet";

const Navbar = () => {
	const session = useSession();
	console.log(session);

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

			{/* user button - if not loggedIn user show Register button else 
                show avatar with user account management 
            */}
			{session.isSignedIn ? (
				<UserButton afterSignOutUrl="/" />
			) : (
				<SignInButton afterSignInUrl="/" mode="modal" afterSignUpUrl="/">
					<Button
						variant={"outline"}
						className="flex items-center gap-1 rounded-xl"
					>
						<User />
						<span>Register</span>
					</Button>
				</SignInButton>
			)}

			{/* in mobile devices show sheet component trigger */}
			<MobileSheet />
		</nav>
	);
};

export default Navbar;
