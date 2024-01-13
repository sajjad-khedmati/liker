import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="w-screen h-screen flex justify-center items-center">
			<section className="flex flex-col items-center">
				<div className="flex flex-col items-center gap-2 mb-4">
					<div className="w-32 h-32 flex items-center justify-center">
						<Image src="/logo.png" width={120} height={120} alt="linker logo" />
					</div>
					<div className="text-center">
						<h1 className="text-2xl font-semibold">LINKER</h1>
						<p className="text-sm text-gray-700">
							Introduce yourself to others in the most professional way
						</p>
					</div>
				</div>
				{children}
			</section>
		</main>
	);
};
export default AuthLayout;
