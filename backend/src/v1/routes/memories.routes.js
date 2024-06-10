import { Router } from 'express';

import {
  addMemoryController,
  deleteMemoryController,
  getMemoriesController,
  getMemoryController,
  updateMemoryController,
} from '../../controllers/memories.controller.js';
import { uploadImage } from '../../middlewares/storage.js';
import { authRequired } from '../../middlewares/validateToken.js';

const memoriesRouter = Router();
memoriesRouter
  .get(`/memories`, authRequired, getMemoriesController)
  .get(`/memories/:id`, authRequired, getMemoryController)
  .post(
    `/memories`,
    authRequired,
    uploadImage.array('images'),
    addMemoryController,
  )
  .put(
    `/memories/:id`,
    authRequired,
    uploadImage.array('images'),
    updateMemoryController,
  )
  .delete(`/memories/:id`, authRequired, deleteMemoryController);
export default memoriesRouter;
