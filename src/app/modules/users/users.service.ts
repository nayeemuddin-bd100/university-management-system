import config from "../../../config";
import { IUser } from "./users.interface";
import { User } from "./users.model";
import { generateUserId } from "./users.utils";

const createUser = async (user: IUser): Promise<IUser | null> => {
	//set user id
	const id = await generateUserId();
	user.id = id;

	// set default password
	if (!user.password) {
		user.password = config.default_user_password as string;
	}
	const createUser = await User.create(user);

	if (!createUser) {
		throw new Error("Failed to create user");
	}

	return createUser;
};

export default {
	createUser,
};
