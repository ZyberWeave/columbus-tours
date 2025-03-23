import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Contact form submission:", data);
    // TODO: Send an email or save to DB here

    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing form:", error);
    return NextResponse.json({ error: "Form submission failed" }, { status: 500 });
  }
}
