import { Router } from 'express';

import {
  addMemoryController,
  deleteMemoryController,
  getMemoriesController,
  getMemoryController,
  updateMemoryController,
} from '../../controllers/memories.controller.js';
import { authRequired } from '../../middlewares/validateToken.js';

const memoriesRouter: Router = Router();

memoriesRouter
  .get(`/memories`, authRequired, getMemoriesController)
  .get(`/memories/:id`, authRequired, getMemoryController)
  .post(`/memories`, authRequired, addMemoryController)
  .put(`/memories/:id`, authRequired, updateMemoryController)
  .delete(`/memories/:id`, authRequired, deleteMemoryController);

export default memoriesRouter;
