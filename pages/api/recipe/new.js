import AWS from 'aws-sdk';
import { getSession } from "next-auth/react"

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

export default async function newRecipe(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  const session = await getSession({ req })

  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    // res.status(401)
  }

  const s3 = new AWS.S3({
    params: {
      Bucket: "lates-recipies",
      MaxKeys: 60,
      // Prefix: session.id
    }
  });

  switch (method) {
    case 'POST':
      // Update or create data in your database
      console.log("Attempting to write to 'zon DB")
      console.log(req.body);
      // const body = JSON.parse(req.body)
      // console.log(body);


      s3.putObject({
        Key: `user's ${req.name}`,
        Body: JSON.stringify(req.body),
        'ContentType': 'application/json',
        // ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          // On Error
          console.log("s3 error:", err)
        } else {
          // On Success
          console.log("s3 success:", data)
        }
      })

      //     fetch('/api/videos/upload', {
      //       method: 'POST',
      //       headers: {
      //         "Content-Type": "application/json"
      //       },
      //       body: JSON.stringify({ userId: userId, videoUrl: `https://latesvideouploads.s3.us-east-2.amazonaws.com/${userId}/${videoType}`, videoType: videoType })
      //     })
      //       .then(res => res.json())
      //       .then(data => {
      //         console.log("Response from server:", data)
      //       }).catch(err => {
      //         console.log("Error from server:", err)
      //       })
      //   }
      // }
      // )
      res.status(200).end(`Added`)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}