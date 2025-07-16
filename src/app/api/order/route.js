import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const form = await req.formData();

    // Get form fields
    const sid = form.get('sid');
    const sname = form.get('sname');
    const price = form.get('price');
    const quantity = form.get('quantity');
    const options = form.get('options');
    const name = form.get('name');
    const contact = form.get('contact');
    const email = form.get('email');
    const remark = form.get('remark');

    console.log("✅ Received form data:", {
      sid, sname, price, quantity, options, name, contact, email, remark
    });

    // Get uploaded files
    const attachments = [];
    for (const entry of form.entries()) {
      const [key, value] = entry;

      // Skip if not a file
      if (typeof value === 'object' && value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
          contentType: value.type,
        });
      }
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,  // App password required
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email body
    const htmlBody = `
      <h3>New Order Received</h3>
      <p><strong>SID:</strong> ${sid}</p>
      <p><strong>SName:</strong> ${sname}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Options:</strong> ${options}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Remark:</strong> ${remark}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Order Submitted',
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true, message: "Email sent" });

  } catch (err) {
    console.error("❌ Email Error:", err);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
