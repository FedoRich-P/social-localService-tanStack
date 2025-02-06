import './PostView.css';
import { Post } from '../../types/Post.ts';
import { FetchUserView } from '../UserView';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

export const PostView = ({ post }: PostViewProps) => {
  const {text, createdAt} = post;
  return (
    <div className="post-view">
      {<FetchUserView userId={post.authorId}/>}
      <p className="post-view__text">{text}</p>

      <time className="post-view__time">{formatDate(createdAt)}</time>
    </div>
  );
};

type PostViewProps = {
  post : Post;
}
