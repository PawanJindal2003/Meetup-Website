import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";
function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="description"
          content={props.meetupData.description}
        ></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>
    </Fragment>
  );
}

export async function getStaticPaths() {
  //it pregenrates dynamic segment values(all the meetupids in this case)

  const client = await MongoClient.connect(
    "mongodb+srv://Varun:momAbha2003@cluster0.639oisc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db(); //to get hold of the above database

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupID = context.params.meetupID;
  const client = await MongoClient.connect(
    "mongodb+srv://Varun:momAbha2003@cluster0.639oisc.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db(); //to get hold of the above database

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupID),
  });

  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
