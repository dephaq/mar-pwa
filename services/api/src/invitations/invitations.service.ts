import { Injectable } from '@nestjs/common';
import { LaunchInvitationDto, LaunchInvitationResponseDto } from './dto/launch-invitation.dto';

@Injectable()
export class InvitationsService {
  launch(dto: LaunchInvitationDto): LaunchInvitationResponseDto {
    // stub: always returns launched count 0
    return { launched: 0 };
  }
}
