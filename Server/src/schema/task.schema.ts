/** @format */

import { object, string } from 'yup';

const payload = {
  body: object({
    title: string().required('Title is required'),
    body: string()
      .required('Body is required')
      .min(20, 'Body is too short - should be 120 chars minimum.'),
  }),
};

const params = {
  params: object({
    taskId: string().required('TaskId is required'),
  }),
};

export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...params,
  ...payload,
});

export const deleteTaskSchema = object({
  ...params,
});
