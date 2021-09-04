import { useRef } from 'react';
import classes from './NewsletterRegistration.module.css';

const NewsletterRegistration = () => {
  const emailInputRef = useRef();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;

    if (!email || !email.includes('@')) return;

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    console.log('registered :>> ', data);

    emailInputRef.current.value = '';
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={handleRegistration}>
        <div className={classes.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
