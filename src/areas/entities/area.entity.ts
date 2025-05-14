import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Activity } from '../../activities/entities/activity.entity';

@Entity('areas')
export class Area extends BaseEntity {
  @ApiProperty({ description: 'Area name' })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({ description: 'Area description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Area code' })
  @Column({ length: 20, nullable: true, unique: true })
  code: string;

  @ApiProperty({ description: 'Area status (active/inactive)' })
  @Column({ default: true })
  active: boolean;

  // Relationships
  @ManyToOne(() => User)
  @JoinColumn({ name: 'coordinator_id' })
  coordinator: User;

  @Column({ name: 'coordinator_id', nullable: true })
  coordinatorId: string;

  @OneToMany(() => User, user => user.area)
  users: User[];

  @OneToMany(() => Activity, activity => activity.area)
  activities: Activity[];

  @ManyToOne(() => Area, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Area;

  @Column({ name: 'parent_id', nullable: true })
  parentId: string;

  @OneToMany(() => Area, area => area.parent)
  children: Area[];
}