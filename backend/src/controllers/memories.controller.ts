import { Request, Response } from 'express';

import { convertImage } from '../middlewares/conversion.js';
import { memorySchema } from '../schemas/memory.schema.js';
import {
  addMemory,
  deleteMemory,
  getAllMemories,
  getMemory,
  updateMemory,
} from '../services/memories.service.js';
import { handleHttp } from '../utils/error.handler.js';

export async function getMemoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;
    const { user } = req;

    if (user?.id == null) {
      throw new Error(
        'User and its user id must be declared in request params',
      );
    }

    if (id != null) {
      const mem = await getMemory(id, user.id);
      return res.status(200).json(handleHttp('get', mem));
    } else {
      return res
        .status(400)
        .json(
          handleHttp('get', { params: req.params }, `Id is required as params`),
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json(handleHttp('get', { params: req.params }, error.message));
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'get',
            { params: req.params },
            `Undefined error: ${error as string}`,
          ),
        );
    }
  }
}

export async function getMemoriesController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { user } = req;
    if (user?.id == null) {
      throw new Error(
        'User and its user id must be declared in request params',
      );
    }

    const mems = await getAllMemories(user.id);
    return res.status(200).json(handleHttp('get', mems));
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json(handleHttp('get', { params: req.params }, error.message));
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'get',
            { params: req.params },
            `Undefined error: ${error as string}`,
          ),
        );
    }
  }
}

export async function addMemoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const validMemory = memorySchema.parse(req.body);
    const { user } = req;

    if (user?.id == null) {
      throw new Error(
        'User and its user id must be declared in request params',
      );
    }
    if (Array.isArray(req.files)) {
      req.files.forEach((image: { path: string; filename: string }) => {
        void convertImage(image.path, image.filename);
      });
    }
    const result = await addMemory(validMemory, user.id, req.files);
    return res.status(200).json(handleHttp('add', result));
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json(
          handleHttp(
            'add',
            { params: req.params, body: req.body },
            error.message,
          ),
        );
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'add',
            { params: req.params, body: req.body },
            `Undefined error: ${error as string}`,
          ),
        );
    }
  }
}

export async function updateMemoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;
    const { user } = req;

    if (id != null) {
      const validMemory = memorySchema.parse(req.body);

      if (user?.id == null) {
        throw new Error(
          'User and its user id must be declared in request params',
        );
      }

      const result = await updateMemory(id, validMemory, user.id, req.files);
      return res.status(200).json(handleHttp('update', result));
    } else {
      return res
        .status(400)
        .json(
          handleHttp('get', { params: req.params }, `Id is required as params`),
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json(
          handleHttp(
            'update',
            { params: req.params, body: req.body },
            error.message,
          ),
        );
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'update',
            { params: req.params, body: req.body },
            `Undefined error: ${error as string}`,
          ),
        );
    }
  }
}

export async function deleteMemoryController(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { id } = req.params;
    const { user } = req;

    if (user?.id == null) {
      throw new Error(
        'User and its user id must be declared in request params',
      );
    }
    if (id != null) {
      const result = await deleteMemory(id, user.id);
      return res
        .status(200)
        .json(
          handleHttp('delete', `Deleted memory with name ${result?.title}`),
        );
    } else {
      return res
        .status(400)
        .json(
          handleHttp(
            'delete',
            { params: req.params },
            `Id is required as params`,
          ),
        );
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json(handleHttp('delete', { params: req.params }, error.message));
    } else {
      return res
        .status(500)
        .json(
          handleHttp(
            'delete',
            { params: req.params },
            `Undefined error: ${error as string}`,
          ),
        );
    }
  }
}
