import { fetchPostList } from '../../api/Post.ts';
import { Loader } from '../Loader';
import { PostListView } from './PostListView.tsx';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient.ts';

export const FetchPostListView = () => {

  // const { state, reFetch } = usePostList();

 const postListQuery = useQuery({
      queryFn: () => fetchPostList(),
      queryKey: ['posts'],
    },
    queryClient,
  );

  switch (postListQuery.status) {
    case 'pending': {
      return <Loader />;
    }
    case 'success': {
      return <PostListView postList={postListQuery.data.list} />;
    }
    case 'error': {
      return (
        <div>
          <h2>Some Error</h2>
          <button onClick={() => postListQuery.refetch()}>Повторить запрос</button>
        </div>
      );
    }
  }
};