import { OptionCompactDto } from '../options';
import { OrganizationUnitCompactDto } from '../organization-units';
import { PermissionCompactDto } from '../permissions';
import { RoleCompactDto } from '../roles';
import { UserCompactDto } from '../users';

export type UserGroupDto = {
  /** Mã nhóm người dùng */
  userGroupId: number;

  /** Mã quản lý */
  code?: string;

  /** Tên nhóm người dùng */
  name: string;

  /** Mô tả */
  description?: string;

  /** Có phải hệ thống hay không */
  isSystem: boolean;

  /** ID đơn vị tổ chức */
  organizationUnitId: number;

  /** Người tạo */
  createdBy?: number;

  /** Người cập nhật */
  updatedBy?: number;

  /** Người xóa */
  deletedBy?: number;

  /** Ngày tạo */
  createdAt: string;

  /** Ngày cập nhật */
  updatedAt: string;

  /** Đơn vị tổ chức */
  organizationUnit?: OrganizationUnitCompactDto;

  /** Danh sách quyền */
  permissions?: PermissionCompactDto[];

  /** Số lượng người dùng */
  countUsers?: number;

  /** Danh sách người dùng */
  users?: UserCompactDto[];

  /** Danh sách vai trò */
  roles?: RoleCompactDto[];

  /**ID phân loại nhóm người dùng */
  userGroupClassifyId: number;

  /**Phân loại nhóm người dùng */
  userGroupClassify: OptionCompactDto;

  /** Số lượng người dùng */
  countPermissions?: number;
};
