import Image from "next/image";
import Link from "next/link";

const page = () => {
	return (
		<main className="w-full flex-1 my-4 grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-x-12 gap-y-8">
			<div className="w-full h-full flex justify-center items-center lg:order-2 relative">
				<Image src={"/404.svg"} fill alt="404 page was not found" />
			</div>
			<div className="text-center lg:text-start">
				<span className="font-bold text-6xl lg:text-7xl text-blue-600">
					Whoops!{" "}
				</span>
				<h2 className="text-xl lg:text-6xl lg:leading-snug font-semibold mt-4">
					This page got lost in conversation.
				</h2>
				<p className="text-gray-700 lg:text-2xl">
					Not to worry. you can head over to our <br />
					<Link href={"/"} className="text-blue-600">
						homePage
					</Link>
				</p>
			</div>
		</main>
	);
};

export default page;
