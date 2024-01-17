"use server";

import Link from "@/libs/models/link.model";
import User from "@/libs/models/user.model";
import { mongodb_connection } from "@/libs/utils/database";
import { currentUser } from "@clerk/nextjs";

interface ValuesInterface {
	link: string;
}

const createLink = async (values: ValuesInterface) => {
	const user = await currentUser();
	if (!user) {
		return {
			error: true,
			message: "authorization faild",
			description:
				"please make sure you are loggedIn first , then try to create link",
		};
	}

	const username =
		user && user?.username
			? user.username
			: user?.firstName &&
			  user?.lastName &&
			  user?.firstName?.concat(user?.lastName);

	const { link } = values;
	const user_id = user.id;

	try {
		await mongodb_connection();

		// check the clerk user stored on the mongodb
		const userExist = await User.find({ user_id });
		if (!userExist) {
			return {
				error: true,
				message: "user dosnt exist in linker databases",
				description:
					"if you are loggedIn with google account but get this error , please contact with linker.support",
			};
		}

		// check the link title is unique
		const linkExist = await Link.findOne({ title: link });

		if (linkExist) {
			return {
				error: true,
				message: "Conflicted Link",
				description:
					"this link has already exist, please pick a diffrent link for your account",
			};
		}

		// created link
		const createdLink = await Link.create({
			user: user_id,
			title: link,
		});

		if (!createdLink) {
			return {
				error: true,
				message: "created link was failed",
				description:
					"we got an error when try to assigned a link to you , please try again",
			};
		}

		// update the user model with link
		await User.findOneAndUpdate({ user_id }, { link: createdLink._id });
		return {
			error: false,
			message: `congratulations ${username}`,
			description:
				" your link is actived now , you can start manage and customized your link on the profile",
		};
	} catch (error: any) {
		if (error) {
			return {
				error: true,
				message: "Internal Server Error!",
				description: error?.message,
			};
		}
	}
};

export default createLink;
