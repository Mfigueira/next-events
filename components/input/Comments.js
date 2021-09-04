import { useEffect, useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      (async () => {
        const res = await fetch(`/api/comments/${eventId}`);
        const data = await res.json();
        setComments(data.comments);
      })();
    }
  }, [showComments]);

  const handleToggleComments = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const handleAddComment = async (comment) => {
    const res = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    setComments((comments) => [...comments, data.comment]);
  };

  return (
    <section className={classes.comments}>
      <button onClick={handleToggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={handleAddComment} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
};

export default Comments;
