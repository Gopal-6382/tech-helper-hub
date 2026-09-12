import nodemailer from "nodemailer";

export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendIssueReportEmail(data: {
    category: string;
    title: string;
    description: string;
    rating?: number;
    pageUrl?: string;
    userEmail: string;
  }) {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_USER,
      replyTo: data.userEmail,

      subject: `[Issue Report] ${data.category}: ${data.title}`,

      html: `
        <h2>New Issue Report</h2>

        <p>
          <strong>Category:</strong>
          ${data.category}
        </p>

        <p>
          <strong>Title:</strong>
          ${data.title}
        </p>

        <p>
          <strong>Rating:</strong>
          ${data.rating ?? "Not provided"}
        </p>

        <p>
          <strong>User:</strong>
          ${data.userEmail}
        </p>

        <p>
          <strong>Page:</strong>
          ${data.pageUrl ?? "Not provided"}
        </p>

        <h3>Description</h3>

        <p>
          ${data.description}
        </p>
      `,
    });
  }
  async sendPasswordResetEmail(data: {
    userEmail: string;
    userName: string;
    resetUrl: string;
  }) {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: data.userEmail,
      subject: "Reset your Tech Helper Hub password",
      html: `
      <h2>Password Reset Request</h2>

      <p>Hello ${data.userName},</p>

      <p>
        We received a request to reset your Tech Helper Hub password.
      </p>

      <p>
        Click the link below to reset your password:
      </p>

      <p>
        <a href="${data.resetUrl}">
          Reset Password
        </a>
      </p>

      <p>
        This link will expire in 10 minutes.
      </p>

      <p>
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <p>
        Tech Helper Hub
      </p>
    `,
    });
  }
}
