import { useContext, useEffect, useState } from 'react';
import NotificationContext from '../../store/NotificationContext';
import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

const Comments = ({ eventId }) => {
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      (async () => {
        setIsFetchingComments(true);
        try {
          const response = await fetch(`/api/comments/${eventId}`);

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Somenthing went wrong!');
          }

          const data = await response.json();
          setComments(data.comments);
        } catch (error) {
          console.error(error.message || 'Could not get comments.');
        } finally {
          setIsFetchingComments(false);
        }
      })();
    }
  }, [showComments]);

  const handleToggleComments = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const handleAddComment = async (comment) => {
    showNotification({
      title: 'Commenting...',
      message: 'Adding comment to event.',
      status: 'pending',
    });

    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Somenthing went wrong!');
      }

      const data = await response.json();

      setComments((comments) => [...comments, data.comment]);

      showNotification({
        title: 'Success!',
        message: 'Your comment has been registered!',
        status: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Somenthing went wrong!',
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={handleToggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={handleAddComment} />}
      {showComments && isFetchingComments && <p>Loading comments...</p>}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
    </section>
  );
};

export default Comments;
