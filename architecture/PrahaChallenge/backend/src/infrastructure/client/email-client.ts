import {
  EmailAddressConfig,
  EmailTemplateConfig,
  IEmailClient,
  InShortOfTeamMemberNotificationParameter,
} from '../../domain/email/email-client';
import prisma from './prisma-client';

export class EmailClient implements IEmailClient {
  public async send<T>(
    emailTemplateConfig: EmailTemplateConfig<T>,
    emailAddressConfig: EmailAddressConfig,
  ): Promise<void> {
    const emailTemplateCode = await prisma.emailTemplate
      .findFirstOrThrow({
        where: {
          emailTemplaceType: emailTemplateConfig.type,
        },
      })
      .then(({ emailTemplateCode }) => emailTemplateCode);

    if (
      emailTemplateConfig.parameter instanceof
      InShortOfTeamMemberNotificationParameter
    ) {
      await this.sendMail<InShortOfTeamMemberNotificationParameter>(
        emailTemplateCode,
        emailTemplateConfig.parameter,
        emailAddressConfig,
      );
      return;
    }
    throw new Error(`
      unexpected emailTemplateConfig.parameter type: ${JSON.stringify(
        emailTemplateConfig.parameter,
      )}
    `);
  }

  private async sendMail<T>(
    mailTemplateCode: string,
    parameter: T,
    emailAddressConfig: EmailAddressConfig,
  ) {
    // 本来はメール送信処理を実装する
    console.log(
      `メール送信処理を実装する。mailTemplateCode: ${mailTemplateCode}, parameter: ${JSON.stringify(
        parameter,
      )}, emailAddressConfig: ${JSON.stringify(emailAddressConfig)}`,
    );
  }
}
