import User from "@/libs/models/user.model";
import { mongodb_connection } from "@/libs/utils/database";
import { NextRequest } from "next/server";

export async function GET(
	req: NextRequest,
	{
		params: { userId },
	}: {
		params: { userId: string };
	},
) {
	try {
		await mongodb_connection();

		const result = await User.aggregate([
			{
				$match: {
					user_id: userId,
				},
			},
			{
				$lookup: {
					from: "links",
					localField: "link",
					foreignField: "_id",
					as: "link",
				},
			},
			{
				$unwind: {
					path: "$link",
					preserveNullAndEmptyArrays: false,
				},
			},
		]);

		if (result.length === 0) {
			return Response.json({
				error: true,
				message: "authorization faild!",
				description:
					"user not loggedIn , please make sure you are currectly loggedIn to the linker and try again ",
			});
		}

		return Response.json(
			{
				error: false,
				message: "Success",
				data: result,
			},
			{
				status: 201,
			},
		);
	} catch (error: any) {
		return Response.json(
			{
				error: true,
				message: "Internal Server Error",
				description: error
					? error?.message
					: "an error was accourded when we try to get link",
			},
			{
				status: 500,
			},
		);
	}
}
