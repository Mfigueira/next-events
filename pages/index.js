import EventList from '../components/events/EventList';
import { httpGetFeaturedEvents } from '../util/helpers';

const HomePage = ({ featuredEvents }) => {
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
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
