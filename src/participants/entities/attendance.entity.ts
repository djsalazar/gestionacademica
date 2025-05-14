import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Session } from '../../sessions/entities/session.entity';
import { Participant } from './participant.entity';

export enum AttendanceStatus {
  PRESENT = 'presente',
  ABSENT = 'ausente',
  JUSTIFIED = 'justificado',
}

@Entity('attendances')
export class Attendance extends BaseEntity {
  @ApiProperty({ description: 'Attendance status', enum: AttendanceStatus })
  @Column({ 
    type: 'enum', 
    enum: AttendanceStatus, 
    default: AttendanceStatus.ABSENT 
  })
  status: AttendanceStatus;

  @ApiProperty({ description: 'Justification for absence' })
  @Column({ type: 'text', nullable: true })
  justification: string;

  @ApiProperty({ description: 'Comments about the attendance' })
  @Column({ type: 'text', nullable: true })
  comments: string;

  @ApiProperty({ description: 'Attendance registration timestamp' })
  @Column({ name: 'registration_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationTime: Date;

  // Relationships
  @ManyToOne(() => Session, session => session.attendances)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'session_id' })
  sessionId: string;

  @ManyToOne(() => Participant, participant => participant.attendances)
  @JoinColumn({ name: 'participant_id' })
  participant: Participant;

  @Column({ name: 'participant_id' })
  participantId: string;
}