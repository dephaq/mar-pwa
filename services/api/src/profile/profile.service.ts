import { Injectable } from '@nestjs/common';
import { ProfileDto, UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  private profile: ProfileDto = {
    name: '',
    age: 0,
    gender: '',
    city: '',
    profession: '',
    contacts: '',
  };

  get(): ProfileDto {
    return this.profile;
  }

  update(dto: UpdateProfileDto): ProfileDto {
    this.profile = { ...this.profile, ...dto };
    return this.profile;
  }
}
