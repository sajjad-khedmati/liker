import Image from "next/image";
import Link from "next/link";

const page = () => {
	return (
		<main className="w-full flex-1 my-4 grid grid-cols-1 lg:flex lg:items-center justify-between gap-x-12 gap-y-8">
			<div
				className="w-[300px] h-[300px] min-w-max lg:w-[600px] lg:h-[600px] flex justify-center items-center mx-auto 
			lg:order-2 relative"
			>
				<Image src={"/404.svg"} fill alt="404 page was not found" />
			</div>
			<div className="text-center lg:text-start lg:flex-1">
				<span className="font-bold text-6xl lg:text-4xl text-blue-600">
					Whoops!{" "}
				</span>
				<h2 className="text-xl lg:text-6xl lg:leading-tight font-semibold mt-1 mb-4 lg:mb-2">
					This page got lost in conversation.
				</h2>

				<Link
					href={"/"}
					className="bg-blue-600 text-blue-50 hover:bg-blue-600/90 
					w-max px-4 py-2 rounded-xl transition-all duration-300"
				>
					back to home
				</Link>
			</div>
		</main>
	);
};

export default page;
