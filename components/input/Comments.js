import { useState } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const handleAddComment = (commentData) => {
    // send data to API
  };

  return (
    <section className={classes.comments}>
      <button onClick={handleToggleComments}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={handleAddComment} />}
      {showComments && <CommentList />}
    </section>
  );
};

export default Comments;
