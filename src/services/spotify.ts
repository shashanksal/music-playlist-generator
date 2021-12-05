import pino from "pino";
import SpotifyWebApi from "spotify-web-api-node";
const logger = pino();
require("dotenv").config();

const updatePlaylist = async playlist => {
	logger.debug("Invoked updatePlaylist");
	const spotifyApi = new SpotifyWebApi({
		accessToken: process.env.SPOTIFY_TOKEN
	});
	try {
		const currentPlaylist = await getCurrentPlaylist(playlist.id);
		const result = await spotifyApi.addTracksToPlaylist(currentPlaylist.id, [...playlist.likes]);
		return result;
	} catch (error) {
		logger.error("Failed to add update the playlist");
		throw new Error("Failed to add update the playlist");
	}
};

const getCurrentPlaylist = async id => {
	const spotifyApi = new SpotifyWebApi({
		accessToken: process.env.SPOTIFY_TOKEN
	});
	try {
		return await spotifyApi.getPlaylist(id);
	} catch (error) {
		logger.error("Failed to get the playlist");
		throw new Error("Failed to get the playlist");
	}
};

export { updatePlaylist };
