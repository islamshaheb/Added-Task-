/** @format */

import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from './controller/session.controller';
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskHandler,
  updateTaskHandler,
} from './controller/task.controller';
import { createUserHandler } from './controller/user.controller';
import { deserializeUser, requiresUser, validateRequest } from './middleware';
import validate from './middleware/validateRequest';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './schema/task.schema';
import { createUserSchema, createUserSessionSchema } from './schema/user.schema';

export default function (app: Express) {
  //app.use(deserializeUser);
  app.get('/', (req: Request, res: Response) => {
    res.send('Hi Im Thik Thak here !');
  });

  // Register user
  app.post('/reg', validate(createUserSchema), createUserHandler);

  // Login
  app.post('/session', validate(createUserSessionSchema), createUserSessionHandler);

  // Logout
  app.delete('/session', requiresUser, invalidateUserSessionHandler);

  // Get the user's sessions
  app.get('/session', requiresUser, getUserSessionsHandler);

  // Create a Task
  app.post('/addtask', [requiresUser, validateRequest(createTaskSchema)], createTaskHandler);

  // Update a Task
  app.put('/task/:taskId', [requiresUser, validateRequest(updateTaskSchema)], updateTaskHandler);

  // Get all Task
  app.get('/task', getTaskHandler);

  // Delete a Task
  app.delete('/task/:taskId', [requiresUser, validateRequest(deleteTaskSchema)], deleteTaskHandler);
}
