import Head from 'next/head';
import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/NewsletterRegistration';
import { httpGetFeaturedEvents } from '../util/helpers';

const HomePage = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <title>NextJS Featured Events</title>
        <meta name="description" content="This is a demo Next JS events app" />
      </Head>

      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </>
  );
};

export const getStaticProps = async () => {
  const featuredEvents = await httpGetFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
};

export default HomePage;
