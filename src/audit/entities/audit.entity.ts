import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

export enum AuditAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  REJECT = 'reject',
  REQUEST_CHANGES = 'request_changes',
  CANCEL = 'cancel',
  COMPLETE = 'complete',
}

@Entity('audits')
export class Audit extends BaseEntity {
  @ApiProperty({ description: 'Entity type that was changed' })
  @Column({ name: 'entity_type', length: 50 })
  entityType: string;

  @ApiProperty({ description: 'Entity ID that was changed' })
  @Column({ name: 'entity_id' })
  entityId: string;

  @ApiProperty({ description: 'Action performed', enum: AuditAction })
  @Column({ 
    type: 'enum', 
    enum: AuditAction 
  })
  action: AuditAction;

  @ApiProperty({ description: 'IP address of the user' })
  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string;

  @ApiProperty({ description: 'User agent information' })
  @Column({ name: 'user_agent', length: 255, nullable: true })
  userAgent: string;

  @ApiProperty({ description: 'Previous values before change' })
  @Column({ name: 'previous_values', type: 'jsonb', nullable: true })
  previousValues: Record<string, any>;

  @ApiProperty({ description: 'New values after change' })
  @Column({ name: 'new_values', type: 'jsonb', nullable: true })
  newValues: Record<string, any>;

  @ApiProperty({ description: 'Justification for the change' })
  @Column({ type: 'text', nullable: true })
  justification: string;

  @ApiProperty({ description: 'Office document number for reference' })
  @Column({ name: 'office_number', nullable: true, length: 50 })
  officeNumber: string;

  @ApiProperty({ description: 'Timestamp of the action' })
  @Column({ name: 'action_timestamp', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  actionTimestamp: Date;

  // Relationships
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;
}