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

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2c3e50;">🛒 New Enquiry Received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Product Id:</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${sid}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Product Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${sname}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Name</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${name}</td>
        </tr>
       
         <tr>
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Contact</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${contact}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${email}</td>
        </tr>
        <tr>
       
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Quantity</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${quantity}</td>
        </tr>
       
        
          <td style="padding: 8px; border: 1px solid #eee;"><strong>Remark</strong></td>
          <td style="padding: 8px; border: 1px solid #eee;">${remark}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #888; font-size: 14px;">This is an automated email generated from your order system.</p>
    </div>
  `;
    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      cc: process.env.EMAIL_USER,
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
