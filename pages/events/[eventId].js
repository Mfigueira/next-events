import Head from 'next/head';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import { httpGetEventById, httpGetFeaturedEvents } from '../../util/helpers';
import Comments from '../../components/input/Comments';

const EventDetailsPage = ({ event }) => {
  return (
    <>
      <Head>
        <title>NextJS {event.title} Details</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export const getStaticPaths = async () => {
  const featuredEvents = await httpGetFeaturedEvents();
  const paths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const { eventId } = context.params;
  const event = await httpGetEventById(eventId);

  if (!event) return { notFound: true };

  return {
    props: {
      event,
    },
    revalidate: 60,
  };
};

export default EventDetailsPage;
