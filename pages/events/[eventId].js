import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event) return <p>No event found!</p>;

  return (
    <>
      <EventSummary />
    </>
  );
};

export default EventDetailsPage;
