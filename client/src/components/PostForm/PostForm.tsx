import { FC } from 'react';
import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Post.ts';
import { queryClient } from '../../api/queryClient.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostResponse, CreatePostSchema } from './type.ts';

export interface IPostFormProps {
}

export const PostForm: FC<IPostFormProps> = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostResponse>({
    resolver: zodResolver(CreatePostSchema),
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  }, queryClient);


  return (
    <form onSubmit={handleSubmit(({ text }) => createPostMutation.mutate(text))} className="post-form">
      <FormField label="Текст поста" errorMessage={errors.text?.message}>
        <textarea className="post-form__input"
                  {...register('text')}
        />
      </FormField>
      <Button type="submit" title="Опубликовать" isLoading={createPostMutation.isPending} />
    </form>
  );
};
