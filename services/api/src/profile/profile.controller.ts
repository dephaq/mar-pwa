import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  getProfile(): ProfileDto {
    return this.service.get();
  }

  @Put()
  updateProfile(@Body() dto: UpdateProfileDto): ProfileDto {
    return this.service.update(dto);
  }
}
