import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @ApiProperty({ description: 'Role name' })
  @Column({ length: 50, unique: true })
  name: string;

  @ApiProperty({ description: 'Role description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Role permissions' })
  @Column({ type: 'jsonb', default: {} })
  permissions: Record<string, boolean>;

  // Relationships
  @OneToMany(() => User, user => user.role)
  users: User[];

  // Helper methods
  hasPermission(permission: string): boolean {
    return this.permissions && this.permissions[permission] === true;
  }
}

export enum SystemRoles {
  DIRECTOR = 'Director',
  COORDINATOR = 'Coordinador',
  AREA_COORDINATOR = 'Coordinador de Área',
  ACTIVITY_MANAGER = 'Encargado de Actividad',
  GENERAL_USER = 'Usuario General',
}

export const DEFAULT_PERMISSIONS = {
  [SystemRoles.DIRECTOR]: {
    'users:create': true,
    'users:read': true,
    'users:update': true,
    'users:delete': true,
    'roles:create': true,
    'roles:read': true,
    'roles:update': true,
    'roles:delete': true,
    'activities:create': true,
    'activities:read': true,
    'activities:update': true,
    'activities:delete': true,
    'activities:approve': true,
    'reports:generate': true,
    'reports:view': true,
    'dashboard:view': true,
    'settings:manage': true,
  },
  [SystemRoles.COORDINATOR]: {
    'users:read': true,
    'roles:read': true,
    'activities:create': true,
    'activities:read': true,
    'activities:update': true,
    'activities:approve': true,
    'reports:generate': true,
    'reports:view': true,
    'dashboard:view': true,
  },
  [SystemRoles.AREA_COORDINATOR]: {
    'activities:create': true,
    'activities:read': true,
    'activities:update': true,
    'activities:approve': true,
    'reports:view': true,
    'dashboard:view': true,
  },
  [SystemRoles.ACTIVITY_MANAGER]: {
    'activities:create': true,
    'activities:read': true,
    'activities:update': true,
    'reports:view': true,
    'dashboard:view': true,
  },
  [SystemRoles.GENERAL_USER]: {
    'activities:read': true,
    'dashboard:view': true,
  },
};