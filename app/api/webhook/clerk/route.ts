import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { mongodb_connection } from "@/libs/utils/database";
import User from "@/libs/models/user.model";

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Get the ID and type
	const eventType = evt.type;

	if (eventType === "user.created") {
		try {
			await mongodb_connection();

			const {
				username,
				email_addresses,
				first_name,
				last_name,
				image_url,
				id,
			} = payload?.data;

			const res = await User.create({
				user_id: id,
				username: username ? username : first_name + last_name,
				emailAddresses: email_addresses,
				firstname: first_name,
				lastname: last_name,
				image_url: image_url,
			});

			if (!res)
				return Response.json(
					{
						message: "user not created!",
					},
					{
						status: 400,
					},
				);

			return Response.json({
				message: "user succesfully added to db",
			});
		} catch (error) {
			return Response.json(
				{
					message: "Internal server error!",
				},
				{
					status: 500,
				},
			);
		}
	}

	if (eventType === "user.updated") {
		try {
			const { username, email_addresses, first_name, last_name, image_url } =
				payload.data;
			await mongodb_connection();

			User.findOneAndUpdate(
				{
					username: username ? username : first_name + last_name,
				},
				{
					username: username ? username : first_name + last_name,
					emailAddresses: email_addresses,
					firstname: first_name,
					lastname: last_name,
					image_url: image_url,
				},
			)
				.then((res) => {
					return Response.json(
						{
							message: "succefully Updated!",
						},
						{
							status: 201,
						},
					);
				})
				.catch((err) => {
					return Response.json(
						{
							message: "an error was accourded when trying to update user",
						},
						{
							status: 400,
						},
					);
				});
		} catch (error) {
			return Response.json(
				{
					message: "Internal server error",
				},
				{
					status: 500,
				},
			);
		}
	}

	if (eventType === "user.deleted") {
		try {
			const { id } = payload.data;

			await mongodb_connection();

			User.deleteOne({
				user_id: id,
			})
				.then((res) => {
					return Response.json(
						{
							message: "user successfully deleted",
						},
						{
							status: 201,
						},
					);
				})
				.catch((err) => {
					return Response.json(
						{
							message: "user not deleted!",
						},
						{
							status: 400,
						},
					);
				});
		} catch (error) {
			return Response.json(
				{
					message: "Internal server error!",
				},
				{ status: 500 },
			);
		}
	}

	return new Response("", { status: 200 });
}
