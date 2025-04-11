import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Here you would typically:
    // 1. Validate the email
    // 2. Add it to your newsletter service (e.g., Mailchimp, SendGrid, etc.)
    // 3. Store it in your database if needed

    // For now, we'll just return a success response
    return NextResponse.json({ message: "Subscribed successfully", email });
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { message: "Failed to subscribe" },
      { status: 500 }
    );
  }
}