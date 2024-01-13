import mongoose from "mongoose";
let isConnected = false;

export const mongodb_connection = async () => {
	mongoose.set("strictQuery", true);
	if (!process.env.MONGODB_URL) throw new Error("mongodb url was not found");
	if (isConnected) return;

	try {
		await mongoose.connect(process.env.MONGODB_URL);
		isConnected = true;
	} catch (error) {
		throw new Error("connected to database was faild");
	}
};
