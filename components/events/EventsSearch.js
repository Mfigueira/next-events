import { useRef } from 'react';
import { monthNames } from '../../util/helpers';
import EventButton from '../UI/EventButton';
import classes from './EventsSearch.module.css';

const EventsSearch = ({ onFilterEvents }) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    onFilterEvents(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select ref={yearInputRef} name="year" id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select ref={monthInputRef} name="month" id="month">
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <EventButton>Filter</EventButton>
    </form>
  );
};

export default EventsSearch;
