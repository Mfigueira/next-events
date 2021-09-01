import { useRouter } from 'next/router';
import { getAllEvents } from '../../util/dummy-data';
import EventsSearch from '../../components/events/EventsSearch';
import EventList from '../../components/events/EventList';

const AllEventsPage = () => {
  const router = useRouter();
  const events = getAllEvents();

  const filterEvents = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  return (
    <>
      <EventsSearch onFilterEvents={filterEvents} />
      <EventList events={events} />
    </>
  );
};

export default AllEventsPage;
