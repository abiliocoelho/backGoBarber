import { Router } from 'express';
import multer from 'multer';
const usersRouter = Router();
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

const upload = multer(uploadConfig);
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()
usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'), userAvatarController.update);

export default usersRouter;
