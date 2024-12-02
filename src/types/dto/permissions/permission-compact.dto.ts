import { PermissionDto } from './permission.dto';

export type PermissionCompactDto = Pick<PermissionDto, 'name' | 'code' | 'permissionId'>;
