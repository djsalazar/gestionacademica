import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { User } from '../../users/entities/user.entity';
import { Attendance } from './attendance.entity';

export enum Gender {
  MALE = 'masculino',
  FEMALE = 'femenino',
  NOT_SPECIFIED = 'no_especificado',
}

export enum ConfirmationStatus {
  CONFIRMED = 'confirmado',
  PENDING = 'pendiente',
  REJECTED = 'rechazado',
}

@Entity('participants')
export class Participant extends BaseEntity {
  @ApiProperty({ description: 'External participant name (for non-users)' })
  @Column({ nullable: true, length: 100 })
  name: string;

  @ApiProperty({ description: 'External participant email (for non-users)' })
  @Column({ nullable: true, length: 100 })
  email: string;

  @ApiProperty({ description: 'Participant gender', enum: Gender })
  @Column({ 
    type: 'enum', 
    enum: Gender, 
    default: Gender.NOT_SPECIFIED 
  })
  gender: Gender;

  @ApiProperty({ description: 'Confirmation status', enum: ConfirmationStatus })
  @Column({ 
    type: 'enum', 
    enum: ConfirmationStatus, 
    default: ConfirmationStatus.PENDING 
  })
  confirmation: ConfirmationStatus;

  @ApiProperty({ description: 'Registration date' })
  @Column({ name: 'registration_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @ApiProperty({ description: 'Comments about the participant' })
  @Column({ type: 'text', nullable: true })
  comments: string;

  // Relationships
  @ManyToOne(() => Activity, activity => activity.participants)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ name: 'activity_id' })
  activityId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', nullable: true })
  userId: string;

  @OneToMany(() => Attendance, attendance => attendance.participant)
  attendances: Attendance[];
}