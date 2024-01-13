import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		image_url: {
			type: String,
		},
		firstname: {
			type: String,
		},
		lastname: {
			type: String,
		},
		emailAddresses: [
			{
				type: Object,
			},
		],
	},
	{
		timestamps: true,
	},
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
