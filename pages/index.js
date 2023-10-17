import { MongoClient } from "mongodb";
import MeetUpList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highlt active React meetups"></meta>
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
}
// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Varun:momAbha2003@cluster0.639oisc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db(); //to get hold of the above database

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    //always returns an object
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
