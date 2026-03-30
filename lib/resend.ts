import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendReportEmail(
  email: string,
  reportId: string
): Promise<void> {
  const reportUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/report/${reportId}`

  await resend.emails.send({
    from: 'Scam Verifier <reports@yourdomain.com>',
    to: email,
    subject: 'Your Legitimacy Report is ready',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Your Legitimacy Report</title>
</head>
<body style="background:#0a0a0a;color:#f0ece4;font-family:'DM Sans',system-ui,sans-serif;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:48px 24px;">
    <tr>
      <td>
        <p style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#4a4640;margin-bottom:32px;">
          SCAM VERIFIER
        </p>

        <h1 style="font-size:24px;font-weight:400;color:#f0ece4;margin-bottom:16px;line-height:1.3;">
          Your Legitimacy Report is ready.
        </h1>

        <p style="font-size:15px;color:#8a8580;line-height:1.6;margin-bottom:32px;">
          The analysis of your submitted opportunity has been completed. Your full report — including the verdict, red flags, green flags, and recommended next steps — is available at the link below.
        </p>

        <a href="${reportUrl}"
           style="display:inline-block;background:#c8b89a;color:#0a0a0a;font-size:14px;font-weight:500;padding:14px 28px;border-radius:8px;text-decoration:none;letter-spacing:0.02em;">
          View Your Report
        </a>

        <p style="font-size:13px;color:#4a4640;margin-top:32px;line-height:1.6;">
          This report is permanently accessible at:
          <br>
          <a href="${reportUrl}" style="color:#6b5f4e;">${reportUrl}</a>
        </p>

        <hr style="border:none;border-top:1px solid #242424;margin:40px 0;">

        <p style="font-size:12px;color:#4a4640;line-height:1.6;">
          You received this email because you purchased a Legitimacy Report at Scam Verifier. No account was created. This email will not be used for any other purpose.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
