import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import { httpGetEventById, httpGetFeaturedEvents } from '../../util/helpers';

const EventDetailsPage = ({ event }) => {
  return (
    <>
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
