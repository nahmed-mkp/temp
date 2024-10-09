import { AuthGuard } from './auth.guard';
import { PrivateGuard } from './private.guard';
import { UserLockGuard } from './userLock.guard';

export const guards = [AuthGuard, UserLockGuard];

export { AuthGuard } from './auth.guard';
export { PrivateGuard } from './private.guard';
export { UserLockGuard } from './userLock.guard';


