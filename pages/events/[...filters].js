import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import EventList from '../../components/events/EventList';
import EventButton from '../../components/UI/EventButton';
import ResultsTitle from '../../components/events/ResultsTitle';
import { fetcherSWR } from '../../util/helpers';

const FilteredEventsPage = () => {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { filters } = router.query;

  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_EVENTS_DB_ROUTE,
    fetcherSWR
  );

  useEffect(() => {
    if (data) {
      const events = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>NextJS Filtered Events</title>
      <meta name="description" content="All Filtered Events" />
    </Head>
  );

  if (!events.length) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  let [year, month] = filters;
  year = Number(year);
  month = Number(month);

  pageHeadData = (
    <Head>
      <title>NextJS Filtered Events</title>
      <meta name="description" content={`All Events for ${month}/${year}`} />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <div className="center">
          <p>Invalid Filter. Please adjust your values!</p>
          <EventButton link="/events">Show All Events</EventButton>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <div className="center">
          <p>No events found for the chosen filters!</p>
          <EventButton link="/events">Show All Events</EventButton>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

/**
 * DIFFERENT APPROACH
 * Filtering in the server, delivering new html SSR with every request
 * @function getServerSideProps
 */
// export const getServerSideProps = async (context) => {
//   const { params } = context;

//   let [year, month] = params.filters;
//   year = Number(year);
//   month = Number(month);

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await httpGetFilteredEvents({
//     year,
//     month,
//   });

//   const date = new Date(year, month - 1);

//   return {
//     props: {
//       filteredEvents,
//       date,
//     },
//   };
// };
