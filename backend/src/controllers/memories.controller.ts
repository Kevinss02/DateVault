import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

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

export async function getImageController(
  req: Request,
  res: Response,
): Promise<Response | undefined> {
  try {
    const { id } = req.params;

    const imagePath = `/uploads/${id}`;

    console.log(imagePath);

    if (imagePath.length === 0) {
      return res
        .status(400)
        .json({ message: 'Image path is required as a parameter' });
    }

    const dirname = process.cwd();
    const fullImagePath = path.join(dirname, '/public', imagePath);

    console.log(fullImagePath);

    fs.access(fullImagePath, fs.constants.F_OK, (err) => {
      if (err != null) {
        return res.status(404).json({ message: 'Image not found' });
      } else {
        res.sendFile(fullImagePath, (err) => {
          if (err != null) {
            return res.status(500).json({ message: 'Error sending file' });
          }
        });
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: `Undefined error: ${error as string}` });
    }
  }
}
