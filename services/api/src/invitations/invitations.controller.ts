import { Body, Controller, Post } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { LaunchInvitationDto, LaunchInvitationResponseDto } from './dto/launch-invitation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('invitations')
@Controller('invitations')
export class InvitationsController {
  constructor(private readonly service: InvitationsService) {}

  @Post('launch')
  launch(@Body() dto: LaunchInvitationDto): LaunchInvitationResponseDto {
    return this.service.launch(dto);
  }
}
