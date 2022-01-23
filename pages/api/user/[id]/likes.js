import AWS from "aws-sdk";
import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

export default async function likesHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  const session = await getSession({ req });

  if (session) {
  } else {
    // Not Signed in
    res.status(401);
  }

  switch (method) {
    case "GET":
      const params = {
        TableName: "userLikes",
        KeyConditionExpression: "uid = :mypk",
        ExpressionAttributeValues: {
          ":mypk": `${id}`,
        },
      };

      // Get data from your database
      docClient.query(params, (err, data) => {
        if (err) {
          res.status(500).json({ err: err });
        } else {
          res.status(200).json(data.Items);
        }
      });
      break;
    case "POST":
      //Update the like status
      console.log("POST:", req.body);

      const document = {
        rid: req.body.recipe,
        uid: session.user.id,
      };
      if (req.body.like) {
        console.log("Putting a like");
        docClient.put(
          { Item: document, TableName: "userLikes" },
          (err, data) => {
            if (err) {
              // On Error
              console.log("Like update error:", err);
            }
          }
        );
        // console.log("req.body.recipe")
        docClient.update(
          {
            Key: { rid: req.body.recipe },
            TableName: "recipe",
            ExpressionAttributeValues: { ":inc": 1 },
            UpdateExpression: "ADD likes :inc",
            // AttributeUpdates: "ADD likes"
          },
          (err, data) => {
            if (err) {
              // On Error
              console.log("Like update error:", err);
            }
          }
        );
      } else {
        console.log("Deleting a like");
        docClient.delete(
          {
            Key: document,
            TableName: "userLikes",
          },
          (err, data) => {
            if (err) {
              // On Error
              console.log("dynamo error:", err);
            }
          }
        );
      }

      res.status(200).end("updated like");
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
