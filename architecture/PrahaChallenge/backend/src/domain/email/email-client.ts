import { Attendee } from '../attendee/model';
import { TeamName } from '../team-name/model';

export class EmailAddressConfig {
  constructor(
    public readonly fromAddress: string,
    public readonly toAddress: string[],
  ) {}
}

enum EmailTemplateType {
  IN_SHORT_OF_TEAM_MEMBER_NOTIFICATION = 'IN_SHORT_OF_TEAM_MEMBER_NOTIFICATION',
}

export class InShortOfTeamMemberNotificationParameter {
  constructor(
    public readonly teamName: TeamName,
    public readonly inActiveAttendee: Attendee,
    public readonly otherTeamMember: Attendee[],
  ) {}
}

export class EmailTemplateConfig<T> {
  constructor(
    private readonly type: EmailTemplateType,
    private readonly parameter: T,
  ) {}

  public static InShortOfTeamMemberNotification(
    parameter: InShortOfTeamMemberNotificationParameter,
  ): EmailTemplateConfig<InShortOfTeamMemberNotificationParameter> {
    return new EmailTemplateConfig<InShortOfTeamMemberNotificationParameter>(
      EmailTemplateType.IN_SHORT_OF_TEAM_MEMBER_NOTIFICATION,
      parameter,
    );
  }
}

export interface EmailClient {
  send<T>(
    emailTemplateConfig: EmailTemplateConfig<T>,
    emailAddressConfig: EmailAddressConfig,
  ): Promise<void>;
}
