import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { Area } from '../../areas/entities/area.entity';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ description: 'User full name' })
  @Column({ name: 'full_name', length: 100 })
  fullName: string;

  @ApiProperty({ description: 'User email address' })
  @Column({ length: 100, unique: true })
  email: string;

  @ApiProperty({ description: 'User position/job title' })
  @Column({ length: 100 })
  position: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @ApiProperty({ description: 'User status', enum: UserStatus })
  @Column({ 
    type: 'enum', 
    enum: UserStatus, 
    default: UserStatus.ACTIVE 
  })
  status: UserStatus;

  @ApiProperty({ description: 'Last login timestamp' })
  @Column({ name: 'last_login', nullable: true })
  lastLogin: Date;

  @ApiProperty({ description: 'User profile image URL' })
  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @ApiProperty({ description: 'User notification preferences' })
  @Column({ name: 'notification_preferences', type: 'jsonb', default: {} })
  notificationPreferences: Record<string, any>;

  @ApiProperty({ description: 'User accessible units', type: [String] })
  @Column({ name: 'accessible_units', type: 'jsonb', default: [] })
  accessibleUnits: string[];

  // Relationships
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({ name: 'role_id' })
  roleId: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @Column({ name: 'area_id' })
  areaId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: User;

  @Column({ name: 'supervisor_id', nullable: true })
  supervisorId: string;

  @OneToMany(() => User, user => user.supervisor)
  subordinates: User[];
}