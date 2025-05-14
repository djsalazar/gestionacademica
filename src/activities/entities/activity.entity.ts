import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Area } from '../../areas/entities/area.entity';
import { Session } from '../../sessions/entities/session.entity';
import { Participant } from '../../participants/entities/participant.entity';
import { Document } from '../../documents/entities/document.entity';
import { Workflow } from '../../workflow/entities/workflow.entity';

export enum ActivityType {
  ORDINARY = 'ordinaria',
  EXTRAORDINARY = 'extraordinaria',
}

export enum ActivitySource {
  PFJA = 'PFJA',
  EXTRA = 'extra',
}

export enum ActivityStatus {
  DRAFT = 'borrador',
  PENDING = 'pendiente',
  AUTHORIZED = 'autorizada',
  COMPLETED = 'completada',
  CANCELED = 'cancelada',
}

@Entity('activities')
export class Activity extends BaseEntity {
  @ApiProperty({ description: 'Activity title' })
  @Column({ length: 200 })
  title: string;

  @ApiProperty({ description: 'Activity description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Activity objectives' })
  @Column({ type: 'text', nullable: true })
  objectives: string;

  @ApiProperty({ description: 'Reference code' })
  @Column({ name: 'reference_code', length: 20, nullable: true })
  referenceCode: string;

  @ApiProperty({ description: 'Activity type', enum: ActivityType })
  @Column({ 
    name: 'activity_type',
    type: 'enum', 
    enum: ActivityType, 
    default: ActivityType.ORDINARY 
  })
  activityType: ActivityType;

  @ApiProperty({ description: 'Activity source', enum: ActivitySource })
  @Column({ 
    type: 'enum', 
    enum: ActivitySource, 
    default: ActivitySource.PFJA 
  })
  source: ActivitySource;

  @ApiProperty({ description: 'Activity status', enum: ActivityStatus })
  @Column({ 
    type: 'enum', 
    enum: ActivityStatus, 
    default: ActivityStatus.DRAFT 
  })
  status: ActivityStatus;

  @ApiProperty({ description: 'Is multimodal activity' })
  @Column({ name: 'is_multimodal', default: false })
  isMultimodal: boolean;

  @ApiProperty({ description: 'Convocation number' })
  @Column({ name: 'convocation_number', length: 50, nullable: true })
  convocationNumber: string;

  @ApiProperty({ description: 'PFJA number' })
  @Column({ name: 'pfja_number', length: 50, nullable: true })
  pfjaNumber: string;

  @ApiProperty({ description: 'Approval date' })
  @Column({ name: 'approval_date', nullable: true })
  approvalDate: Date;

  // Relationships
  @ManyToOne(() => Area)
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @Column({ name: 'area_id' })
  areaId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ name: 'creator_id' })
  creatorId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'approver_id' })
  approver: User;

  @Column({ name: 'approver_id', nullable: true })
  approverId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'cooperant_id' })
  cooperant: User;

  @Column({ name: 'cooperant_id', nullable: true })
  cooperantId: string;

  @Column({ name: 'specialized_unit_id', nullable: true })
  specializedUnitId: string;

  @OneToMany(() => Session, session => session.activity, { cascade: true })
  sessions: Session[];

  @OneToMany(() => Participant, participant => participant.activity)
  participants: Participant[];

  @OneToMany(() => Document, document => document.activity)
  documents: Document[];

  @OneToMany(() => Workflow, workflow => workflow.activity)
  workflows: Workflow[];
}