import EventItem from './EventItem';
import classes from './EventList.module.css';

const EventList = ({ events }) => {
  return (
    <div>
      <ul className={classes.list}>
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
