"use client";

import { useSession } from "@clerk/nextjs";
import ScrollContainer from "react-indiana-drag-scroll";
import PopulatedCard from "../populated-card";

export default function MostPopulated() {
	const session = useSession();

	return (
		<div className="overflow-x-scroll overflow-y-visible flex-1 py-6 hidden-scrollbar px-4">
			<div className="w-max flex gap-4">
				<PopulatedCard user={session && session.session?.user} />
				<PopulatedCard user={session && session.session?.user} />
				<PopulatedCard user={session && session.session?.user} />
				<PopulatedCard user={session && session.session?.user} />
			</div>
		</div>
	);
}
