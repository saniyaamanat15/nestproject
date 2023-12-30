// src/todos/entities/images.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({
  name: 'images',
})
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Todo, (user) => user.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Todo;

  @Column()
  path: string;

  @Column({ default: true })
  is_active: boolean;
}

// export { Images }; // Add this line to export the Images class
