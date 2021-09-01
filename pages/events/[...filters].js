import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import EventButton from '../../components/UI/EventButton';
import ResultsTitle from '../../components/events/ResultsTitle';
import { getFilteredEvents } from '../../util/dummy-data';

const FilteredEventsPage = () => {
  const router = useRouter();
  const { filters } = router.query;

  if (!filters || filters.length === 0) {
    return <p className="center">Loading...</p>;
  }

  let [year, month] = filters;
  year = Number(year);
  month = Number(month);

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <div className="center">
        <p>Invalid Filter. Please adjust your values!</p>
        <EventButton link="/events">Show All Events</EventButton>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    <div className="center">
      <p>No events found for the chosen filters!</p>
      <EventButton href="/events">Show All Events</EventButton>
    </div>;
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
