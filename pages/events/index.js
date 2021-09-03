import { useRouter } from 'next/router';
import EventsSearch from '../../components/events/EventsSearch';
import EventList from '../../components/events/EventList';
import { httpGetAllEvents } from '../../util/helpers';

const AllEventsPage = ({ allEvents }) => {
  const router = useRouter();

  const filterEvents = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };

  return (
    <>
      <EventsSearch onFilterEvents={filterEvents} />
      <EventList events={allEvents} />
    </>
  );
};

export const getStaticProps = async () => {
  const allEvents = await httpGetAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 60,
  };
};

export default AllEventsPage;
