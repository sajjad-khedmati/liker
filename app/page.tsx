import Link from "next/link";
import Image from "next/image";
import CreateNewLink from "./_components/forms/create-link";
import MostPopulated from "./_components/modules/most-populated";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
	const user = await currentUser();
	const res = await fetch(`http://localhost:3000/api/link/${user?.id}`);

	const response = await res.json();
	console.log(response);

	return (
		<main className="flex-1 flex flex-col gap-4">
			<section className="grid grid-cols-1 gap-2 md:grid-cols-2 mt-12 mb-4 lg:place-items-center">
				<div className="relative w-52 md:w-80 h-40 md:h-56 lg:h-96 lg:w-[600px] mx-auto md:order-2 flex items-center justify-center">
					<Image src={"/hero.svg"} alt="hero image" fill />
				</div>

				<div className="text-center md:text-start mb-4">
					<h1 className="font-semibold text-3xl md:text-5xl lg:text-7xl md:mb-2">
						Linker.io Platform
					</h1>
					<p className="text-sm text-gray-600 mb-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe
						molestias nisi!
					</p>
					<CreateNewLink />
				</div>
			</section>

			<section className="flex-1 mt-6 md:mt-12 lg:-mt-12 rounded-xl flex flex-col gap-2">
				<div className="flex justify-between gap-x-4 flex-wrap items-center">
					<h2 className="font-medium text-sm">Most populated people</h2>
					<Link
						href={"/explore"}
						className="text-blue-600 text-sm font-medium hover:underline underline-offset-1 block lg:hidden"
					>
						explore
					</Link>
				</div>
				<MostPopulated />
			</section>
		</main>
	);
}
