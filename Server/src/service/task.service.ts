/** @format */

import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Task, { TaskDocument } from '../model/task.model';

export function createTask(input: DocumentDefinition<TaskDocument>) {
  return Task.create(input);
}

export function findTask(query: FilterQuery<TaskDocument>, options: QueryOptions = { lean: true }) {
  return Task.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions
) {
  return Task.findOneAndUpdate(query, update, options);
}

export function deleteTask(query: FilterQuery<TaskDocument>) {
  return Task.deleteOne(query);
}
export function findTaskByUserId(userId: FilterQuery<TaskDocument>) {
  return Task.find(userId);
}
