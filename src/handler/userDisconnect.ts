import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import validator from "@middy/validator";
import httpErrorHandler from "@middy/http-error-handler";
import inputOutputLogger from "@middy/input-output-logger";
import pino from "pino";
import { shufflePlaylist, removeFromPlaylist } from "../services/playlist";
import { updatePlaylist } from "../services/spotify";
const logger = pino();

// Trigger this function after a user disconnects from the infrastructure
const userSchema = require("../schemas/userSchema");
// eslint-disable-next-line no-unused-vars
const userDisconnect = async (user, context) => {
	const userPlaylist = user.likes;
	const newPlaylist = await removeFromPlaylist(userPlaylist);
	const shuffledPlaylist = await shufflePlaylist(newPlaylist);
	const playListUpdateResult = await updatePlaylist(shuffledPlaylist);
	logger.info("Playlist shuffled successfully after user disconnect");
	return playListUpdateResult;
};

const handler = middy(userDisconnect)
	.use(jsonBodyParser())
	.use(
		inputOutputLogger({
			logger: request => {
				const child = logger.child(request.context);
				child.info(request.event ?? request.response);
			}
		})
	)
	.use(validator(userSchema))
	.use(httpErrorHandler());

module.exports = { handler };
