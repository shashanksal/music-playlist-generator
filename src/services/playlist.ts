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
		throw new Error("No playlist to shuffle");
	}
	const shuffledLikes = shuffle(playlist.likes);
	playlist.likes = shuffledLikes;
	return playlist;
};

const removeFromPlaylist = async likes => {
	logger.debug("Invoked removeFromPlaylist");
	if (!likes?.length) {
		logger.error("No playlist to remove");
		throw new Error("No playlist to remove");
	}
	const currentPlaylist = await getCurrentPlaylist(); //get current playlist
	const currentLikes = currentPlaylist.map(playlist => playlist.likes);
	const likesIds = likes.map(like => like.id);
	const filteredLikes = currentLikes.filter(currentLike => !likesIds.includes(currentLike.id));
	return await addRecord(filteredLikes);
};

export { addToPlaylist, getCurrentPlaylist, shufflePlaylist, removeFromPlaylist };
