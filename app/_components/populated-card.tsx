import { User2Icon } from "lucide-react";
import Image from "next/image";

const PopulatedCard = ({ user }: { user: any }) => {
	return (
		<div
			className="relative w-32 h-32 bg-gradient-to-tl from-blue-300 via-blue-200 to-gray-50 rounded-3xl
				shadow-xl shadow-blue-100 backdrop-filter backdrop-blur-xl hover:from-blue-400 hover:shadow-blue-200
				transition-all duration-300 cursor-pointer ring-2 ring-transparent hover:ring-blue-200 hover:ring-offset-2
				px-4 py-6 flex flex-col justify-between gap-2"
		>
			<div
				className="w-12 h-12 bg-white rounded-full z-50 absolute -top-4 -left-2 flex items-center 
					justify-center flex-col overflow-hidden"
			>
				<span className="w-full h-full">
					<Image
						src={user ? user?.imageUrl : "/avatar.png"}
						alt="user image"
						fill
					/>
				</span>
			</div>

			<h4 className="break-words text-xs text-center font-medium">
				{user && user.username
					? user.username
					: user?.firstName + " " + user?.lastName}
			</h4>

			<p className="text-[11px] flex flex-col justify-center items-center gap-1">
				<span className="text-lg font-bold">211 K</span>
				<span className="flex items-center justify-center gap-1">
					<User2Icon className="w-4 h-4" />
					total views
				</span>
			</p>
		</div>
	);
};

export default PopulatedCard;
