import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
	{
		user: { type: String, required: true, unique: true },
		title: { type: String, required: true, unique: true },
	},
	{
		timestamps: true,
	},
);

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);
export default Link;
