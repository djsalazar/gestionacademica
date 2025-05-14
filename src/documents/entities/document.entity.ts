import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';
import { Activity } from '../../activities/entities/activity.entity';
import { Session } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';

export enum EntityType {
  ACTIVITY = 'activity',
  SESSION = 'session',
  USER = 'user',
  PARTICIPANT = 'participant',
}

@Entity('documents')
export class Document extends BaseEntity {
  @ApiProperty({ description: 'Entity type this document belongs to', enum: EntityType })
  @Column({ 
    name: 'entity_type',
    type: 'enum', 
    enum: EntityType 
  })
  entityType: EntityType;

  @ApiProperty({ description: 'Entity ID this document belongs to' })
  @Column({ name: 'entity_id' })
  entityId: string;

  @ApiProperty({ description: 'Original file name' })
  @Column({ name: 'original_name', length: 255 })
  originalName: string;

  @ApiProperty({ description: 'System file name (generated)' })
  @Column({ name: 'system_name', length: 255 })
  systemName: string;

  @ApiProperty({ description: 'File MIME type' })
  @Column({ name: 'mime_type', length: 100 })
  mimeType: string;

  @ApiProperty({ description: 'File extension' })
  @Column({ length: 10 })
  extension: string;

  @ApiProperty({ description: 'File size in bytes' })
  @Column({ type: 'integer' })
  size: number;

  @ApiProperty({ description: 'Storage path' })
  @Column({ name: 'storage_path', length: 255 })
  storagePath: string;

  @ApiProperty({ description: 'File verification hash' })
  @Column({ length: 64, nullable: true })
  hash: string;

  @ApiProperty({ description: 'Document version' })
  @Column({ type: 'integer', default: 1 })
  version: number;

  @ApiProperty({ description: 'Is public document' })
  @Column({ name: 'is_public', default: false })
  isPublic: boolean;

  @ApiProperty({ description: 'Document description' })
  @Column({ type: 'text', nullable: true })
  description: string;

  // Relationships
  @ManyToOne(() => Activity, activity => activity.documents, { nullable: true })
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ name: 'activity_id', nullable: true })
  activityId: string;

  @ManyToOne(() => Session, { nullable: true })
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @Column({ name: 'session_id', nullable: true })
  sessionId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uploaded_by' })
  uploadedBy: User;

  @Column({ name: 'uploaded_by' })
  uploadedById: string;

  @Column({ name: 'upload_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;
}