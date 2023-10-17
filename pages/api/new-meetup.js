import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://Varun:momAbha2003@cluster0.639oisc.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db(); //to get hold of the above database

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup inserted'});
  }
}
export default handler;
