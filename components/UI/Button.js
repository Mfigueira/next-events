import Link from 'next/link';
import classes from './Button.module.css';

const Button = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className={classes.btn}>{children}</a>
    </Link>
  );
};

export default Button;
