import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Images } from './images.entity';

@Entity({
  name: 'users',
})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Images, (image) => image.user, { cascade: true })
  images: Images[];
}
