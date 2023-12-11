import { Router } from 'express';

import {
  addMemoryController,
  deleteMemoryController,
  getMemoriesController,
  getMemoryController,
  updateMemoryController,
} from '../../controllers/memories.controller.js';

// import { authRequired } from '../../middlewares/validateToken.js';

const memoriesRouter: Router = Router();

memoriesRouter
  .get(`/memories`, getMemoriesController)
  .get(`/memories/:id`, getMemoryController)
  .post(`/memories`, addMemoryController)
  .put(`/memories/:id`, updateMemoryController)
  .delete(`/memories/:id`, deleteMemoryController);

//  .put(`/memories/:id`, authRequired, updateMemoryController)
export default memoriesRouter;
