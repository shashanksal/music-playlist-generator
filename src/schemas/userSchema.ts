const artistSchema = require("./artistSchema");
const userSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
		likes: { type: "array", items: artistSchema }
	},
	required: ["id"]
};
export default userSchema;
