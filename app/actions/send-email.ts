"use server";

import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the form data type
type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export async function sendContactEmail(formData: FormData) {
  try {
    // Extract form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Validate form data
    if (!firstName || !lastName || !email || !message) {
      return { success: false, message: "All fields are required" };
    }

    if (!email.includes("@")) {
      return { success: false, message: "Please enter a valid email address" };
    }

    // Send email using Resend's testing configuration
    const { data, error } = await resend.emails.send({
      from: "BLOCK3 Contact <onboarding@resend.dev>", // Use Resend's default testing address
      to: "maulanaroyyan33@gmail.com", // Send to your verified email during testing
      reply_to: email, // Set reply-to as the sender's email for easy responses
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
    Name: ${firstName} ${lastName}
    Email: ${email}
    
    Message:
    ${message}
    
    --- This is a contact form submission from the BLOCK3 website ---
  `,
      // You can also use HTML for a nicer email
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
      </div>
      
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px;">
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h3 style="color: #555;">Message:</h3>
        <p style="line-height: 1.5;">${message.replace(/\n/g, "<br>")}</p>
      </div>
      
      <div style="font-size: 12px; color: #777; border-top: 1px solid #eaeaea; padding-top: 10px; margin-top: 20px;">
        <p>This message was sent from the contact form on the BLOCK3 website.</p>
      </div>
    </div>
  `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to send message. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Error in sendContactEmail:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
