// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import path from 'path'

const contactSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const getServiceIcon = (service: string) => {
  const icons: { [key: string]: string } = {
    'saas-development': '🚀',
    'web-application': '💻',
    'recording': '🎵',
    'mixing': '🎛️',
    'media': '🎬',
    'consultation': '💡'
  }
  return icons[service] || '📋'
}

const getServiceName = (service: string) => {
  const names: { [key: string]: string } = {
    'saas-development': 'SaaS Platform Development',
    'web-application': 'Custom Web Application',
    'recording': 'Studio Recording',
    'mixing': 'Music Production/Mixing',
    'media': 'Digital Media Services',
    'consultation': 'Technical Consultation'
  }
  return names[service] || service
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, name, email, message } = contactSchema.parse(body)

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const serviceIcon = getServiceIcon(service)
    const serviceName = getServiceName(service)
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    // Path to logo file
    const logoPath = path.join(process.cwd(), 'public', 'images', 'damreclogo_small.png')

    // Styled email template with CID reference
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8f9fa; }
            .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #160F30 0%, #241663 50%, #457aff 100%); padding: 40px 30px; text-align: center; color: white; position: relative; }
            .header::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E"); opacity: 0.3; }
            .header-content { position: relative; z-index: 2; }
            .logo-container { margin-bottom: 20px; }
            .logo { width: 160px; height: 160px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); }
            .header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; background: linear-gradient(45deg, #EAE7AF, #ffffff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
            .header p { opacity: 0.9; font-size: 16px; }
            .content { padding: 40px 30px; }
            .service-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(45deg, #457aff, #241663); color: white; padding: 12px 20px; border-radius: 25px; font-weight: 600; font-size: 14px; margin-bottom: 30px; }
            .info-grid { display: grid; gap: 25px; margin-bottom: 30px; }
            .info-item { background: #f8f9fa; padding: 20px; border-radius: 12px; border-left: 4px solid #457aff; }
            .info-label { font-weight: 600; color: #241663; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .info-value { color: #333; font-size: 16px; line-height: 1.5; }
            .info-value a { color: #457aff; text-decoration: none; }
            .info-value a:hover { text-decoration: underline; }
            .message-box { background: linear-gradient(135deg, #160F30 0%, #241663 100%); color: #EAE7AF; padding: 30px; border-radius: 16px; margin: 30px 0; position: relative; overflow: hidden; }
            .message-box::before { content: '"'; position: absolute; top: 10px; left: 20px; font-size: 60px; opacity: 0.3; color: #457aff; font-family: Georgia, serif; }
            .message-text { position: relative; z-index: 2; font-size: 16px; line-height: 1.6; font-style: italic; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef; }
            .footer-content { color: #666; font-size: 14px; }
            .timestamp { background: #e9ecef; padding: 15px; text-align: center; font-size: 12px; color: #666; font-weight: 500; }
            .cta-button { display: inline-block; font-family: monospace; background: linear-gradient(182deg, #f2f4f9, #9cbcff); color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 800; margin-top: 20px; transition: transform 0.2s; }
            .cta-button:hover { transform: translateY(-2px); }
            @media (max-width: 600px) {
                .container { margin: 10px; border-radius: 8px; }
                .header, .content { padding: 25px 20px; }
                .header h1 { font-size: 24px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-content">
                    <div class="logo-container">
                        <img src="cid:damrec-logo" alt="Damrec Studio & Web Solutions Logo" class="logo" />
                    </div>
                    <h1>New Contact Inquiry</h1>
                    <p>Damrec Studio & Web Solutions</p>
                </div>
            </div>
            
            <div class="content">
                <div class="service-badge">
                    <span>${serviceIcon}</span>
                    ${serviceName}
                </div>
                
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">👤 Contact Name</div>
                        <div class="info-value">${name}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">📧 Email Address</div>
                        <div class="info-value">
                            <a href="mailto:${email}">${email}</a>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">🎯 Service Interest</div>
                        <div class="info-value">${serviceName}</div>
                    </div>
                </div>
                
                <div class="message-box">
                    <div class="message-text">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                </div>
                
                <div style="text-align: center;">
                    <a href="mailto:${email}" class="cta-button">
                        Reply to ${name.split(' ')[0]} →
                    </a>
                </div>
            </div>
            
            <div class="timestamp">
                📅 Received on ${currentDate}
            </div>
            
            <div class="footer">
                <div class="footer-content">
                    <strong>Damrec Studio & Web Solutions</strong><br>
                    SaaS Platform Developer • Professional Recording Studio<br>
                    <span style="color: #457aff;">Thomas Spåre</span> • Jönköping, Sweden<br>
                    <a href="tel:+46702072725" style="color: #241663;">070-207 27 25</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `

    // Send notification email to you with logo attachment
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `🚀 New ${serviceName} Inquiry from ${name}`,
      html: emailTemplate,
      attachments: [
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'damrec-logo' // This must match the cid in the HTML
        }
      ]
    })

    // Send confirmation email to client
    const confirmationTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Segoe UI', sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #160F30, #457aff); padding: 40px 30px; text-align: center; color: white; }
            .header h1 { font-size: 28px; margin-bottom: 10px; }
            .logo-container { margin-bottom: 20px; }
            .logo { width: 160px; height: 160px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); }
            .content { padding: 40px 30px; text-align: center; }
            .checkmark { width: 32px; height: 61px; flex-direction: column; color: ivory; background: linear-gradient(45deg, #28a745, #20c997); border-radius: 10%; display: inline-flex; align-items: center; justify-content: center; font-size: 40px; margin-bottom: 20px; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <img src="cid:damrec-logo-confirm" alt="Damrec Studio & Web Solutions Logo" class="logo" />
                </div>
                <h1>Thank You!</h1>
                <p>Your message has been received</p>
            </div>
            <div class="content">
                <div class="checkmark">✓</div>
                <h2>Message Received Successfully</h2>
                <p>Hi ${name},</p>
                <p>Thank you for reaching out about <strong>${serviceName}</strong>. I've received your inquiry and will get back to you within 24 hours.</p>
                <p>I'm excited to learn more about your project and explore how we can work together!</p>
                <p style="margin-top: 30px;">Best regards,<br><strong>Thomas Spåre</strong><br>Founder, Damrec Studio & Web Solutions</p>
            </div>
            <div class="footer">
                📞 070-207 27 25 • 📍 Jönköping, Sweden<br>
                🎵 Recording Studio • 💻 SaaS Development
            </div>
        </div>
    </body>
    </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: '✅ Thank you for contacting Damrec Studio & Web Solutions',
      html: confirmationTemplate,
      attachments: [
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'damrec-logo-confirm' // Different CID for confirmation email
        }
      ]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}