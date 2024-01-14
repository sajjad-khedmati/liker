"use client";
// Icons
import { Compass, DoorClosedIcon, Home, Menu, Settings2 } from "lucide-react";

// Components - shadcn
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@clerk/nextjs";
import { useRef } from "react";

// tailwindcss styles
const sheetItemStyles = `text-gray-600 flex items-center gap-2 justify-center flex-col scale-90 
hover:bg-gray-100/60 hover:text-black px-2 py-4 rounded-xl transition-all duration-300 ease-out hover:scale-100`;

const MobileSheet = () => {
	const session = useSession();
	const closeRef = useRef<HTMLButtonElement>(null);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={"icon"} variant={"outline"}>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent className="flex flex-col pt-12">
				<SheetHeader>
					<div className="w-full flex items-center scal justify-center md:justify-start">
						<div className="w-14 h-14">
							<Image src={"/logo.svg"} alt="logo" width={80} height={80} />
						</div>
					</div>
					<SheetTitle className="text-center md:text-start">
						Linker.io
					</SheetTitle>
					<SheetDescription className="text-center md:text-start">
						create a link to share your personal information etc, for better
						connection to others.
					</SheetDescription>
				</SheetHeader>

				<div className="my-6 flex flex-col gap-2">
					<Link
						href={"/"}
						className={sheetItemStyles}
						onClick={() => closeRef && closeRef.current?.click()}
					>
						<Home className="w-8 h-8" />
						<span className="text-sm font-medium">home page</span>
					</Link>

					{session.isSignedIn && (
						<Link
							href={"/explore"}
							className={sheetItemStyles}
							onClick={() => closeRef && closeRef.current?.click()}
						>
							<Compass className="w-8 h-8" />
							<span className="text-sm font-medium">explore</span>
						</Link>
					)}
					<Link
						href={"/manage"}
						className={sheetItemStyles}
						onClick={() => closeRef && closeRef.current?.click()}
					>
						<Settings2 className="w-8 h-8" />
						<span className="text-sm font-medium">manage your link</span>
					</Link>
				</div>

				<SheetFooter>
					<SheetClose asChild>
						<Button ref={closeRef}>
							<DoorClosedIcon className="mr-2 w-5 h-5" />
							<span>Close Sheet</span>
						</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSheet;
