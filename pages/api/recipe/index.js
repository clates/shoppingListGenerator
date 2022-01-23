import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const documentClient = new AWS.DynamoDB.DocumentClient();

const scanTable = async (tableName) => {
  console.log("Starting to scan table");
  const params = {
    TableName: tableName,
  };

  const scanResults = [];
  let items;
  do {
    items = await documentClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  console.log("Completed the table scan:", scanResults);
  return scanResults;
};

export default async function recipeHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;
  switch (method) {
    case "GET":
      const params = {
        TableName: "recipe",
        KeyConditionExpression: "rid = :mypk",
        ExpressionAttributeValues: {
          ":mypk": `${id}`,
        },
      };

      // Get data from your database
      const results = await scanTable("recipe");
      res.status(200).json({ results: results });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
