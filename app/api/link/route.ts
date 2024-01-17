import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		console.log("success");

		return Response.json({
			error: false,
			message: "hello api",
		});
		// TODO: get link list
	} catch (error) {
		return Response.json(
			{
				error: true,
				message: "Internal Server Error",
				description: "an error was accourded when we try to get links",
			},
			{
				status: 500,
			},
		);
	}
}
