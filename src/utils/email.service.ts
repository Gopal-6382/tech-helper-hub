import { Resend } from "resend";

export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendIssueReportEmail(data: {
    category: string;
    title: string;
    description: string;
    rating?: number;
    pageUrl?: string;
    userEmail: string;
  }) {
    const { data: result, error } = await this.resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.SUPPORT_EMAIL!,
      replyTo: data.userEmail,

      subject: `[Issue Report] ${data.category}: ${data.title}`,

      html: `
        <h2>New Issue Report</h2>

        <p><strong>Category:</strong> ${data.category}</p>

        <p><strong>Title:</strong> ${data.title}</p>

        <p><strong>Rating:</strong> ${
          data.rating ?? "Not provided"
        }</p>

        <p><strong>User:</strong> ${data.userEmail}</p>

        <p><strong>Page:</strong> ${
          data.pageUrl ?? "Not provided"
        }</p>

        <h3>Description</h3>
        <p>${data.description}</p>
      `,
    });

    if (error) {
      throw new Error(`Failed to send issue report email: ${error.message}`);
    }

    return result;
  }
}