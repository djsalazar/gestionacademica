import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { User } from '../../users/entities/user.entity';

export enum WorkflowStatus {
  PENDING = 'pendiente',
  APPROVED = 'aprobado',
  REJECTED = 'rechazado',
  CHANGES_REQUESTED = 'solicitando_cambios',
}

@Entity('workflows')
export class Workflow extends BaseEntity {
  @ApiProperty({ description: 'Current workflow stage' })
  @Column({ length: 50 })
  stage: string;

  @ApiProperty({ description: 'Workflow status', enum: WorkflowStatus })
  @Column({ 
    type: 'enum', 
    enum: WorkflowStatus, 
    default: WorkflowStatus.PENDING 
  })
  status: WorkflowStatus;

  @ApiProperty({ description: 'Comments or feedback' })
  @Column({ type: 'text', nullable: true })
  comments: string;

  @ApiProperty({ description: 'Workflow configuration' })
  @Column({ name: 'workflow_config', type: 'jsonb', nullable: true })
  workflowConfig: Record<string, any>;

  @ApiProperty({ description: 'Approval history' })
  @Column({ name: 'approval_history', type: 'jsonb', default: [] })
  approvalHistory: Record<string, any>[];

  @ApiProperty({ description: 'Request date' })
  @Column({ name: 'request_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @ApiProperty({ description: 'Decision date' })
  @Column({ name: 'decision_date', nullable: true })
  decisionDate: Date;

  @ApiProperty({ description: 'Office document number for reference' })
  @Column({ name: 'office_number', nullable: true, length: 50 })
  officeNumber: string;

  // Relationships
  @ManyToOne(() => Activity, activity => activity.workflows)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ name: 'activity_id' })
  activityId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'approver_id' })
  approver: User;

  @Column({ name: 'approver_id' })
  approverId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @Column({ name: 'requester_id' })
  requesterId: string;
}