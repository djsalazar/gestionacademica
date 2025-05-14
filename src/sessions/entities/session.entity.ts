import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { User } from '../../users/entities/user.entity';
import { Attendance } from '../../participants/entities/attendance.entity';

export enum SessionModality {
  PRESENTIAL = 'presencial',
  VIRTUAL = 'virtual',
  HYBRID = 'hibrida',
}

export enum SessionStatus {
  SCHEDULED = 'programada',
  COMPLETED = 'completada',
  CANCELED = 'cancelada',
}

@Entity('sessions')
export class Session extends BaseEntity {
  @ApiProperty({ description: 'Session title' })
  @Column({ name: 'session_title', length: 200 })
  sessionTitle: string;

  @ApiProperty({ description: 'Session date' })
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty({ description: 'Start time' })
  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @ApiProperty({ description: 'End time' })
  @Column({ name: 'end_time', type: 'time' })
  endTime: string;

  @ApiProperty({ description: 'Session modality', enum: SessionModality })
  @Column({ 
    type: 'enum', 
    enum: SessionModality, 
    default: SessionModality.PRESENTIAL 
  })
  modality: SessionModality;

  @ApiProperty({ description: 'Physical location (for presential or hybrid)' })
  @Column({ nullable: true, length: 200 })
  location: string;

  @ApiProperty({ description: 'Virtual meeting ID' })
  @Column({ name: 'meeting_id', nullable: true, length: 100 })
  meetingId: string;

  @ApiProperty({ description: 'Virtual meeting link' })
  @Column({ name: 'virtual_link', nullable: true, length: 255 })
  virtualLink: string;

  @ApiProperty({ description: 'Presential hours' })
  @Column({ name: 'presential_hours', type: 'decimal', precision: 4, scale: 2, default: 0 })
  presentialHours: number;

  @ApiProperty({ description: 'Virtual hours' })
  @Column({ name: 'virtual_hours', type: 'decimal', precision: 4, scale: 2, default: 0 })
  virtualHours: number;

  @ApiProperty({ description: 'Session status', enum: SessionStatus })
  @Column({ 
    type: 'enum', 
    enum: SessionStatus, 
    default: SessionStatus.SCHEDULED 
  })
  status: SessionStatus;

  @ApiProperty({ description: 'Comments about the session' })
  @Column({ type: 'text', nullable: true })
  comments: string;

  // Relationships
  @ManyToOne(() => Activity, activity => activity.sessions)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ name: 'activity_id' })
  activityId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @Column({ name: 'teacher_id', nullable: true })
  teacherId: string;

  @OneToMany(() => Attendance, attendance => attendance.session)
  attendances: Attendance[];
}