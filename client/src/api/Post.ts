import axios from 'axios';
import { z } from 'zod';
import { FetchPostListSchema, Post } from '../types/Post.ts';
import { useEffect, useState } from 'react';


export function fetchPostList(): Promise<FetchPostListResponse> {
  return axios.get('/api/posts').then(response => FetchPostListSchema.parse(response.data));
}

export function usePostList() {
  const [state, setState] = useState<RequestState>({ status: 'idle' });

  useEffect(() => {
    if (state.status === 'pending') {
      fetchPostList()
        .then(data => setState({ status: 'success', data: data.list }))
        .catch((error) => {
          setState({ status: 'error', error });
        });
    }
  }, [state]);

  useEffect(() => {
    setState({ status: 'pending' });
  }, [])

  const reFetch = () => {
    setState({ status: 'pending' });
  }

  return { state, reFetch };
}

export function createPost(text: string) {
  return axios.post(`/api/posts`, { text }).then(response => response);
}


// types

type FetchPostListResponse = z.infer<typeof FetchPostListSchema>

type IdleRequestState = {
  status: 'idle';
};
type LoadingRequestState = {
  status: 'pending';
};
type SuccessRequestState = {
  status: 'success';
  data: Post[];
};
type ErrorRequestState = {
  status: 'error';
  error: Error;
};

type RequestState = IdleRequestState | LoadingRequestState | ErrorRequestState | SuccessRequestState;