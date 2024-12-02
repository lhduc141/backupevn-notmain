import { RoleDto } from './role.dto';

export type RoleCompactDto = Pick<RoleDto, 'roleId' | 'code' | 'name'>;
