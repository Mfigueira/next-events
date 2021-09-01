import EventButton from '../UI/EventButton';
import classes from './ResultsTitle.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <EventButton link="/events">Show all events</EventButton>
    </section>
  );
}

export default ResultsTitle;
