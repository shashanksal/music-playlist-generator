import pino from "pino";
import { v1 as uuidv1 } from "uuid";
const logger = pino();

require("dotenv").config();

const AWS = require("aws-sdk");
const tableName = "Playlist";

const getLastRecord = async () => {
	AWS.config.update({
		region: process.env.REGION,
		endpoint: process.env.DB_ENDPOINT
	});
	const docClient = new AWS.DynamoDB.DocumentClient();
	const params = {
		TableName: tableName,
		Select: "ALL_ATTRIBUTES",
		ScanIndexForward: false,
		Limit: 1
	};

	const scanResults = [];
	let items;

	do {
		items = await docClient.scan(params).promise();
		items.Items.forEach(item => scanResults.push(item));
	} while (typeof items.LastEvaluatedKey != "undefined");
	return scanResults;
};

const addRecord = async likes => {
	AWS.config.update({
		region: process.env.REGION,
		endpoint: process.env.DB_ENDPOINT
	});
	const docClient = new AWS.DynamoDB.DocumentClient();
	const params = {
		TableName: tableName,
		Item: {
			id: uuidv1(),
			dateTime: new Date().toISOString(),
			likes: likes
		}
	};
	await docClient.put(params, (err, data) => {
		if (err) {
			logger.error("Error JSON:", JSON.stringify(err, null, 2));
			throw Error("Unable to add item");
		}
		return data;
	});
};

export { getLastRecord, addRecord };
