import AWS from 'aws-sdk';
import { getSession } from "next-auth/react"

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

export default async function userHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'GET':
      const params = {
        TableName: 'next-auth',
        KeyConditionExpression: "pk = :mypk",
        ExpressionAttributeValues: {
          ":mypk": `USER#${id}`
        }
      }

      // Get data from your database
      docClient.query(params, (err, data) => {
        if (err) {
          res.status(500).json({ err: err })
        } else {
          res.status(200).json(data.Items.filter(x => x.type === "USER").map(x => ({ image: x.image, name: x.name }))[0]);
        }
      })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}