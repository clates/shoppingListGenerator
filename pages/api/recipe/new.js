import AWS from 'aws-sdk';
import { getSession } from "next-auth/react"
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const docClient = new AWS.DynamoDB.DocumentClient();

export default async function newRecipe(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  const session = await getSession({ req })

  if (session) {
  } else {
    // Not Signed in
    res.status(401)
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: "lates-recipies",
      MaxKeys: 60,
      Prefix: session.id
    }
  });

  switch (method) {
    case 'POST':
      //Recipe format

      /**
       
      {
        rid: uuid,
        name: string,
        recipe:
        notes:
        createdby:
        createdon:
        likes:
      }
       
       */
      const rId = uuidv4()
      const recipedocument = {
        rid: rId,
        createdBy: session.user.id,
        createdOn: Date.now(),
        likes: 0,
        name: req.body.name,
        notes: req.body.notes,
        recipe: JSON.stringify(req.body.recipe),
      }
      docClient.put({ Item: recipedocument, TableName: "recipe" }, (err, data) => {
        if (err) {
          // On Error
          console.log("dynamo error:", err)
        } else {
          // On Success
          console.log("dynamo success:", rId)
        }
      })
      res.status(200).end({ rid: rId })
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}