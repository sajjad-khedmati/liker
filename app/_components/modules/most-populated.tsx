import { currentUser } from "@clerk/nextjs";
import PopulatedCard from "../populated-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function MostPopulated() {
	const user = await currentUser();

	return (
		<div className="overflow-x-scroll overflow-y-visible flex-1 py-6 hidden-scrollbar px-4">
			<div className="w-max flex gap-4">
				<PopulatedCard user={user && user} />
				<PopulatedCard user={user && user} />
				<PopulatedCard user={user && user} />
				<PopulatedCard user={user && user} />

				<Link
					href={"/explore"}
					className="w-32 h-32 bg-gray-100 rounded-3xl flex flex-col items-center justify-center border border-transparent
					hover:border-gray-200 transition-all duration-300"
				>
					<ArrowRight />
					<span className="font-semibold text-sm">Explore</span>
				</Link>
			</div>
		</div>
	);
}
