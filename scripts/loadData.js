import { v1 as uuidv1 } from "uuid";
require("dotenv").config();
const AWS = require("aws-sdk");

const seedData = [
	{
		id: uuidv1(),
		dateTime: new Date().toISOString(),
		likes: [
			{ id: 1, name: "Tame Impala" },
			{ id: 2, name: "Max Lawrence" }
		]
	},
	{
		id: uuidv1(),
		dateTime: new Date().toISOString(),
		likes: [
			{ id: 3, name: "Pinkish Blu" },
			{ id: 4, name: "Sam Windley" },
			{ id: 5, name: "Saint Lane" },
			{ id: 6, name: "Coldplay" }
		]
	},
	{
		id: uuidv1(),
		dateTime: new Date().toISOString(),
		likes: [
			{ id: 1, name: "Tame Impala" },
			{ id: 2, name: "Max Lawrence" },
			{ id: 3, name: "Pinkish Blu" },
			{ id: 4, name: "Sam Windley" },
			{ id: 5, name: "Saint Lane" },
			{ id: 6, name: "Coldplay" }
		]
	}
];

AWS.config.update({
	region: process.env.REGION,
	endpoint: process.env.DB_ENDPOINT
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing playlists into DynamoDB. Please wait.");

const allPlaylists = JSON.parse(seedData);

allPlaylists.forEach(playlist => {
	const params = {
		TableName: "Playlist",
		Item: {
			id: playlist.id,
			dateTime: playlist.dateTime,
			likes: playlist.likes
		}
	};

	docClient.put(params, (err, data) => {
		if (err) {
			console.error(
				"Unable to add playlist",
				playlist.id,
				". Error JSON:",
				JSON.stringify(err, null, 2)
			);
		} else {
			console.log("PutItem succeeded:", playlist.id);
		}
	});
});
