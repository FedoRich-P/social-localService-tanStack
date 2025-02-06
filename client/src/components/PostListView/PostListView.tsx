import { PostView } from '../PostView';
import './PostListView.css';
import { Post } from '../../types/Post.ts';

export const PostListView = ({ postList }: PostListViewProps) => {
  return (
    <ul className="post-list">
      {postList.map((post) => (
        <li key={post.id}
            className="post-list__item">
          <PostView post={post} />
        </li>
      ))}
    </ul>
  );
};

type PostListViewProps = {
  postList: Post[];
}
