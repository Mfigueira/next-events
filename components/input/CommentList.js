import classes from './CommentList.module.css';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments && comments.length ? (
        comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.username}</address>
            </div>
          </li>
        ))
      ) : (
        <li>No comments yet.</li>
      )}
    </ul>
  );
}

export default CommentList;
