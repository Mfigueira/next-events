export const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(0, i).toLocaleString('en-US', { month: 'long' })
);

export const httpGetAllEvents = async () => {
  let events = [];

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_EVENTS_DB_ROUTE);

    if (!response.ok) throw new Error('Could not fetch events.');

    const data = await response.json();

    events = Object.entries(data).map((event) => {
      const [id, eventData] = event;
      return {
        id,
        ...eventData,
      };
    });
  } catch (error) {
    console.error(error);
  } finally {
    return events;
  }
};

export const httpGetFeaturedEvents = async () => {
  const events = await httpGetAllEvents();
  return events.filter((event) => event.isFeatured);
};

export const httpGetEventById = async (eventId) => {
  const events = await httpGetAllEvents();
  return events.find((event) => event.id === eventId);
};

export const httpGetFilteredEvents = async (dateFilter) => {
  const events = await httpGetAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};

export const httpGetCommentsFromEventById = async (eventId) => {
  const events = await httpGetAllEvents();
  const { comments } = events.find((event) => event.id === eventId);
  return !comments
    ? []
    : Object.keys(comments).map((cId) => ({
        id: cId,
        ...comments[cId],
      }));
};

export const fetcherSWR = (url) => fetch(url).then((res) => res.json());
