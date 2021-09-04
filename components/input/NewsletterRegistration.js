import { useContext, useRef } from 'react';
import NotificationContext from '../../store/NotificationContext';
import classes from './NewsletterRegistration.module.css';

const NewsletterRegistration = () => {
  const { showNotification } = useContext(NotificationContext);
  const emailInputRef = useRef();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;

    if (!email || !email.includes('@')) return;

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Somenthing went wrong!');
      }

      showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Somenthing went wrong!',
        status: 'error',
      });
    } finally {
      emailInputRef.current.value = '';
    }
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
