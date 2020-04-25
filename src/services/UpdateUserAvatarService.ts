import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';
import { request } from 'express';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }
    user.avatar = avatarFilename;
    await userRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
