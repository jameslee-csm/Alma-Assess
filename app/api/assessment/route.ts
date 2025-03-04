import { NextRequest, NextResponse } from "next/server";

// Mock database - in a real app, you'd use a proper database
export interface FormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  website: string;
  visaCategories: {
    "O-1": boolean;
    "EB-1A": boolean;
    "EB-2-NIW": boolean;
    unknown: boolean;
  };
  helpText?: string;
  submittedAt?: string;
  status?: "Pending" | "Reached Out";
}

// In-memory storage for form submissions
let submissions: FormData[] = [
  {
    id: "1",
    firstName: "Jorge",
    lastName: "Ruiz",
    email: "jorge.ruiz@example.com",
    country: "Mexico",
    website: "https://www.jorge-ruiz.com",
    visaCategories: {
      "O-1": true,
      "EB-1A": false,
      "EB-2-NIW": false,
      unknown: false,
    },
    helpText:
      "I am a software engineer and I want to work in the United States.",
    submittedAt: "2024-02-02T14:45:00Z",
    status: "Pending",
  },
  {
    id: "2",
    firstName: "Bahar",
    lastName: "Zamir",
    email: "bahar.zamir@example.com",
    country: "Mexico",
    website: "https://www.bahar-zamir.com",
    visaCategories: {
      "O-1": true,
      "EB-1A": false,
      "EB-2-NIW": false,
      unknown: false,
    },
    helpText:
      "I am a software engineer and I want to work in the United States.",
    submittedAt: "2024-02-02T14:45:00Z",
    status: "Reached Out",
  },
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new record with generated ID
    const newSubmission: FormData = {
      id: submissions.length,
      ...formData,
      status: "Pending", // default value is Pending
      submittedAt: new Date().toISOString(),
    };

    // Save to our mock database
    submissions.push(newSubmission);

    return NextResponse.json(
      { success: true, id: newSubmission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve submissions (for demo/testing purposes)
export async function GET() {
  return NextResponse.json({ submissions });
}
