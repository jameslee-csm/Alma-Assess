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

interface ValidationError {
  field: string;
  message: string;
}

// Email regex pattern
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// URL regex pattern (basic validation)
const URL_REGEX = /^(https?:\/\/)?([\w\d-]+\.)+[\w-]+(\/[\w\d-./?=%&]*)?$/;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const errors: ValidationError[] = [];

    // Validate required fields with detailed error messages
    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.push({ field: "firstName", message: "First name is required" });
    } else if (formData.firstName.length < 2) {
      errors.push({
        field: "firstName",
        message: "First name must be at least 2 characters",
      });
    } else if (formData.firstName.length > 50) {
      errors.push({
        field: "firstName",
        message: "First name must not exceed 50 characters",
      });
    }

    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.push({ field: "lastName", message: "Last name is required" });
    } else if (formData.lastName.length < 2) {
      errors.push({
        field: "lastName",
        message: "Last name must be at least 2 characters",
      });
    } else if (formData.lastName.length > 50) {
      errors.push({
        field: "lastName",
        message: "Last name must not exceed 50 characters",
      });
    }

    if (!formData.email || formData.email.trim() === "") {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (!formData.country || formData.country.trim() === "") {
      errors.push({
        field: "country",
        message: "Country of citizenship is required",
      });
    }

    if (!formData.website || formData.website.trim() === "") {
      errors.push({ field: "website", message: "Website is required" });
    } else if (!URL_REGEX.test(formData.website)) {
      errors.push({ field: "website", message: "Please enter a valid URL" });
    }

    // Validate optional fields if provided
    if (formData.website && !URL_REGEX.test(formData.website)) {
      errors.push({ field: "website", message: "Please enter a valid URL" });
    }

    // Validate at least one visa category is selected if they didn't select "unknown"
    if (formData.visaCategories) {
      const hasSelectedCategory = Object.values(formData.visaCategories).some(
        (value) => value === true
      );
      if (!hasSelectedCategory) {
        errors.push({
          field: "visaCategories",
          message:
            'Please select at least one visa category or "I don\'t know"',
        });
      }
    }

    // Check help text length if provided
    if (formData.helpText && formData.helpText.length > 1000) {
      errors.push({
        field: "helpText",
        message: "Help text must not exceed 1000 characters",
      });
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Process valid submission
    // Create new record with generated ID
    const newSubmission = {
      id: submissions.length,
      ...formData,
      status: "Pending",
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
