import AWS from 'aws-sdk';
import { getSession } from "next-auth/react"

AWS.config.update({
  accessKeyId: process.env.NEXT_AUTH_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AUTH_AWS_SECRET_KEY,
  region: process.env.NEXT_AUTH_AWS_REGION,
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

/**
 * 
  const [recipeName, setRecipeName] = useState("Dad's Chicken Noodle Soup");
  const [notes, setNotes] = useState(`
  Pan Fry the garlic and onions until brown
  In the same pan add chicken, cook until chicken is white on all sides.
  Add to pot
  `);
  const [recipe, setRecipe] = useState([
    {
      sectionName: "Stock from scratch",
      ingredients: [
        { qty: "1", name: "Whole chicken" },
        { qty: "2", name: "Carrots" },
        { qty: "3", name: "Celery Stalks" },
        { qty: "2", name: "Onion" },
        { qty: "1", name: "Garlic - Head" },
        { qty: "1", name: "Turnip" },
        { qty: "1/4 bunch", name: "Thyme" },
        { qty: "2", name: "Bay Leaves" },
        { qty: "1 Tsp", name: "Whole black peppercorns" },
      ],
    },
    {
      sectionName: "Main",
      ingredients: [
        { qty: "2 Tbs", name: "Extra-virgin olive oil" },
        { qty: "1", name: "Onion" },
        { qty: "3 cloves", name: "Garlic" },
        { qty: "2", name: "Carrots" },
        { qty: "2", name: "Celery ribs" },
        { qty: "4 sprigs", name: "Thyme" },
        { qty: "1", name: "Bay Leaves" },
        { qty: "2 qts", name: "Chicken Stock" },
        { qty: "8 oz", name: "Egg Noodle" },
        { qty: "To taste", name: "Salt" },
        { qty: "To taste", name: "Pepper" },
        { qty: "1 handful", name: "Parsley" },
      ],
    },
  ]);
 */

const getSampleData = (id) => {
  switch (id) {
    case '1':
      return {
        "name": "Dad's Chicken Noodle Soup",
        "recipe": [
          {
            "sectionName": "Stock from scratch",
            "ingredients": [
              {
                "qty": "1",
                "name": "Whole chicken"
              },
              {
                "qty": "2",
                "name": "Carrots"
              },
              {
                "qty": "3",
                "name": "Celery Stalks"
              },
              {
                "qty": "2",
                "name": "Onion"
              },
              {
                "qty": "1",
                "name": "Garlic - Head"
              },
              {
                "qty": "1",
                "name": "Turnip"
              },
              {
                "qty": "1/4 bunch",
                "name": "Thyme"
              },
              {
                "qty": "2",
                "name": "Bay Leaves"
              },
              {
                "qty": "1 Tsp",
                "name": "Whole black peppercorns"
              }
            ]
          },
          {
            "sectionName": "Main",
            "ingredients": [
              {
                "qty": "2 Tbs",
                "name": "Extra-virgin olive oil"
              },
              {
                "qty": "1",
                "name": "Onion"
              },
              {
                "qty": "3 cloves",
                "name": "Garlic"
              },
              {
                "qty": "2",
                "name": "Carrots"
              },
              {
                "qty": "2",
                "name": "Celery ribs"
              },
              {
                "qty": "4 sprigs",
                "name": "Thyme"
              },
              {
                "qty": "1",
                "name": "Bay Leaves"
              },
              {
                "qty": "2 qts",
                "name": "Chicken Stock"
              },
              {
                "qty": "8 oz",
                "name": "Egg Noodle"
              },
              {
                "qty": "To taste",
                "name": "Salt"
              },
              {
                "qty": "To taste",
                "name": "Pepper"
              },
              {
                "qty": "1 handful",
                "name": "Parsley"
              }
            ]
          }
        ],
        "notes": "Pan Fry the garlic and onions until brown\n  In the same pan add chicken, cook until chicken is white on all sides.\n  Add to pot\n  "
      }
    case '2':
      return {
        "name": "Thai Fried Rice with Pineapple and Chicken",
        "recipe": [
          {
            "sectionName": "Main",
            "ingredients": [
              {
                "qty": "3 Slices",
                "name": "Bacon"
              },
              {
                "qty": "3",
                "name": "Shallots"
              },
              {
                "qty": "4 oz",
                "name": "Chicken Breast"
              },
              {
                "qty": "4 tsp",
                "name": "Curry Powder"
              },
              {
                "qty": "3",
                "name": "Egg yolks"
              },
              {
                "qty": "1 tsp",
                "name": "Vegetable oil"
              },
              {
                "qty": "3 cups",
                "name": "Jasmine rice"
              },
              {
                "qty": "1",
                "name": "red chile pepper"
              },
              {
                "qty": "2 tbsp",
                "name": "cilantro leaves"
              },
              {
                "qty": "1tbsp",
                "name": "soy sauce"
              },
              {
                "qty": "1/2 tsp",
                "name": "sugar"
              },
              {
                "qty": "4 oz",
                "name": "tiger prawns"
              },
              {
                "qty": "1/4 cup",
                "name": "chopped pineapple"
              },
              {
                "qty": "3",
                "name": "green onions"
              },
              {
                "qty": "",
                "name": ""
              }
            ]
          }
        ],
        "notes": "Directions\nInstructions Checklist\n\n    Step 1\n\n    Place bacon in a wok or large skillet; cook and stir over medium-high heat until crisp, about 10 minutes. Remove bacon with a slotted spoon and reserve bacon drippings in the wok. Cook and stir shallots in bacon drippings over medium-high heat until fragrant and light brown, 1 to 2 minutes.\n    Step 2\n\n    Stir chicken into shallots and cook without stirring until browned on one side, 45 seconds to 1 minute; stir. Continue cooking until chicken is browned, about 1 minute. Add 2 teaspoons curry powder; stir until chicken is coated.\n    Step 3\n\n    Make a well in the center of chicken and pour oil into center of the well; add egg yolks. Cook and stir egg yolks until set, 1 to 2 minutes. Add rice and stir, breaking up rice.\n    Step 4\n\n    Mix chile pepper, cilantro, soy sauce, remaining 2 teaspoons curry powder, fish sauce, and sugar into rice mixture; add shrimp and cook until shrimp is cooked through and pink, about 2 minutes. Fold pineapple, green onions, and bacon into rice mixture.\n\n"
      }
  }
}
export default async function recipeHandler(req, res) {
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
    case 'GET':
      // Get data from your database
      s3.listObjects({}, (err, data) => {
        console.log("Listing Objects", err, data);
        if (err) {
          res.status(500).json({ err: err })
        } else {
          res.status(200).json(data);
        }
      })
      // res.status(200).json({ id, recipe: getSampleData(id) })
      break
    case 'POST':
      // // Update or create data in your database

      // console.log("Attempting to write to 'zon DB")


      // s3.putObject({
      //   Key: `${userId}/${videoType}`,
      //   Body: videoBlob,
      //   'ContentType': 'video/mp4',
      //   ACL: 'public-read'
      // }, (err) => {
      //   if (err) {
      //     // On Error
      //     console.log("s3 error:", err)
      //   } else {
      //     // On Success
      //     console.log("s3 success, posting to dynamo")
      //   }
      // })

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
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}