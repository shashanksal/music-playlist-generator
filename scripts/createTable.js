require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
	region: process.env.REGION,
	endpoint: process.env.DB_ENDPOINT
});

const dynamodb = new AWS.DynamoDB();

const params = {
	TableName: "Playlist",
	KeySchema: [
		{ AttributeName: "id", KeyType: "HASH" }, //Partition key
		{ AttributeName: "dateTime", KeyType: "RANGE" } //Sort key
	],
	AttributeDefinitions: [
		{ AttributeName: "id", AttributeType: "S" },
		{ AttributeName: "dateTime", AttributeType: "S" }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 5,
		WriteCapacityUnits: 5
	}
};

dynamodb.createTable(params, (err, data) => {
	if (err) {
		console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
	}
});
