import Link from 'next/link';
import classes from './EventButton.module.css';

const Button = ({ link, onClick, children }) => {
  return link ? (
    <Link href={link}>
      <a className={classes.btn}>{children}</a>
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
