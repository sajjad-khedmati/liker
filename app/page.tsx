import { currentUser } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import CreateNewLink from "./_components/forms/create-link";
import PopulatedCard from "./_components/populated-card";

import ScrollContainer from "react-indiana-drag-scroll";
import MostPopulated from "./_components/modules/most-populated";

export default async function Home() {
	const user = await currentUser();
	console.log(user);

	return (
		<main className="flex-1 flex flex-col">
			<section>
				<Image
					src={"/hero.svg"}
					alt="hero image"
					width={200}
					height={100}
					className="mx-auto my-4"
				/>

				<div className="text-center md:text-start mb-4">
					<h1 className="font-semibold text-3xl">Linker.io Platform</h1>
					<p className="text-sm text-gray-600">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas saepe
						molestias nisi!
					</p>
				</div>

				<CreateNewLink />
			</section>

			<section className="flex-1 mt-6 rounded-xl flex flex-col gap-2">
				<div className="flex justify-between gap-x-4 flex-wrap items-center">
					<h2 className="font-medium text-sm">Most populated people</h2>
					<Link
						href={"/explore"}
						className="text-blue-600 text-sm font-medium hover:underline underline-offset-1"
					>
						explore
					</Link>
				</div>
				<MostPopulated />
			</section>
		</main>
	);
}
