import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotifyDonorDto } from '@app/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {};
  
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN')
    }
  })

  async notifyDonorByEmail({ email, amount, campaignTitle }: NotifyDonorDto) {

    this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: 'Donate Sphere Notification',
      text: `We wanted to take a moment to express our deepest gratitude for your generous donation of ${amount} to our campaign, ${campaignTitle}. Your support means the world to us and brings us one step closer to achieving our goals.`
    })
  }
}
