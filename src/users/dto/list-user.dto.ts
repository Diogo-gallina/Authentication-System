import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class ListUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Id, cannot be null.' })
  @IsUUID('all', { message: 'Id needs to be in the pattern uuid.' })
  id: string;
}
