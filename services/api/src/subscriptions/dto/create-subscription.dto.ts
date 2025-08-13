import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class SubscriptionKeysDto {
  @ApiProperty()
  @IsString()
  p256dh: string;

  @ApiProperty()
  @IsString()
  auth: string;
}

export class CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  endpoint: string;

  @ApiProperty({ type: SubscriptionKeysDto })
  @IsObject()
  @ValidateNested()
  @Type(() => SubscriptionKeysDto)
  keys: SubscriptionKeysDto;
}

export class SubscriptionDto extends CreateSubscriptionDto {
  @ApiProperty()
  @IsString()
  id: string;
}
