import pino from "pino";
import { getLastRecord, addRecord } from "../models/playlist";
import { shuffle } from "../utils/playlistUtil";
const logger = pino();

const addToPlaylist = async likes => {
	logger.debug("Invoked addToPlaylist");
	const currentPlaylist = await getCurrentPlaylist();
	return await addRecord([...currentPlaylist, ...likes]);
};

const getCurrentPlaylist = async () => {
	logger.debug("Invoked getCurrentPlaylist");
	const currentPlaylist = await getLastRecord();
	if (!currentPlaylist) {
		return [];
	}
	return currentPlaylist;
};

const shufflePlaylist = playlist => {
	if (!playlist?.length) {
		logger.error("No playlist to shuffle");
	}
	const shuffledLikes = shuffle(playlist.likes);
	playlist.likes = shuffledLikes;
	return playlist;
};

export { addToPlaylist, getCurrentPlaylist, shufflePlaylist };
