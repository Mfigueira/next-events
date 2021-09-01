import DateIcon from '../icons/DateIcon';
import AddressIcon from '../icons/AddressIcon';
import Button from '../UI/Button';
import classes from './EventItem.module.css';
import ArrowRightIcon from '../icons/ArrowRightIcon';

const EventItem = ({ event: { title, image, date, location, id } }) => {
  const parsedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const parsedAddress = location.replace(', ', '\n');

  const detailsLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{parsedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{parsedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button href={detailsLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
