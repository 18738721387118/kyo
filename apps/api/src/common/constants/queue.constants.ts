export const MAIL_QUEUE_NAME = 'mail'

export const MailJobs = {
  SEND_CONFIRMATION_EMAIL: 'send-confirmation-email',
  SEND_PASSWORD_RESET_EMAIL: 'send-password-reset-email',
  SEND_TWO_FACTOR_TOKEN_EMAIL: 'send-two-factor-token-email',
} as const
