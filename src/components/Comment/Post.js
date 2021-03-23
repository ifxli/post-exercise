import Typography from '@material-ui/core/Typography';

export const Post = ({ post, className }) => {
  return (
    <div className={className}>
      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <Typography gutterBottom>
        {post.body}
      </Typography>
    </div>
  );
}
