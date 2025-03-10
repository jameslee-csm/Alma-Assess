import { NextRequest, NextResponse } from "next/server";

type SubmissionStatus = "Pending" | "Reached Out";

export interface ISubmission {
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
  status?: SubmissionStatus;
  resume?: {
    name: string;
    type: string;
    size: number;
  };
}

// In-memory storage for form submissions
const submissions: ISubmission[] = [
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
    // Parse FormData instead of JSON
    const formData = await request.formData();
    const errors: ValidationError[] = [];

    // Extract form fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const country = formData.get("country") as string;
    const website = formData.get("website") as string;
    const helpText = formData.get("helpText") as string;
    const resumeFile = formData.get("resume") as File | null;

    // Parse visa categories from FormData
    const visaCategories = {
      "O-1": formData.get("visaCategories[O-1]") === "true",
      "EB-1A": formData.get("visaCategories[EB-1A]") === "true",
      "EB-2-NIW": formData.get("visaCategories[EB-2-NIW]") === "true",
      unknown: formData.get("visaCategories[unknown]") === "true",
    };

    // Validate required fields with detailed error messages
    if (!firstName || firstName.trim() === "") {
      errors.push({ field: "firstName", message: "First name is required" });
    } else if (firstName.length < 2) {
      errors.push({
        field: "firstName",
        message: "First name must be at least 2 characters",
      });
    } else if (firstName.length > 50) {
      errors.push({
        field: "firstName",
        message: "First name must not exceed 50 characters",
      });
    }

    if (!lastName || lastName.trim() === "") {
      errors.push({ field: "lastName", message: "Last name is required" });
    } else if (lastName.length < 2) {
      errors.push({
        field: "lastName",
        message: "Last name must be at least 2 characters",
      });
    } else if (lastName.length > 50) {
      errors.push({
        field: "lastName",
        message: "Last name must not exceed 50 characters",
      });
    }

    if (!email || email.trim() === "") {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!EMAIL_REGEX.test(email)) {
      errors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (!country || country.trim() === "") {
      errors.push({
        field: "country",
        message: "Country of citizenship is required",
      });
    }

    if (!website || website.trim() === "") {
      errors.push({ field: "website", message: "Website is required" });
    } else if (!URL_REGEX.test(website)) {
      errors.push({ field: "website", message: "Please enter a valid URL" });
    }

    // Validate optional fields if provided
    if (website && !URL_REGEX.test(website)) {
      errors.push({ field: "website", message: "Please enter a valid URL" });
    }

    // Validate at least one visa category is selected if they didn't select "unknown"
    const hasSelectedCategory = Object.values(visaCategories).some(
      (value) => value === true
    );
    if (!hasSelectedCategory) {
      errors.push({
        field: "visaCategories",
        message: 'Please select at least one visa category or "I don\'t know"',
      });
    }

    // Check help text length if provided
    if (helpText && helpText.length > 1000) {
      errors.push({
        field: "helpText",
        message: "Help text must not exceed 1000 characters",
      });
    }

    // Validate resume file if provided
    if (resumeFile) {
      const validFileTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // Check file type
      if (!validFileTypes.includes(resumeFile.type)) {
        errors.push({
          field: "resume",
          message: "Resume must be a PDF, DOC, or DOCX file",
        });
      }

      // Check file size (limit to 5MB)
      const fileSizeInMB = resumeFile.size / (1024 * 1024);
      if (fileSizeInMB > 5) {
        errors.push({
          field: "resume",
          message: "Resume file size must not exceed 5MB",
        });
      }
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Process valid submission
    // In a real application, you would save the file to storage (S3, etc.)
    // For this example, we'll just store file metadata
    let resumeData;
    if (resumeFile) {
      resumeData = {
        name: resumeFile.name,
        type: resumeFile.type,
        size: resumeFile.size,
        // In a real app, you would upload the file to storage and store the URL
        // url: 'https://your-storage-bucket.com/path/to/file'
      };

      // Example of how you might read the file content if needed
      // const fileContent = await resumeFile.arrayBuffer();
      // Then upload this content to your storage solution
    }

    // Create new record with generated ID
    const newSubmission = {
      id: String(submissions.length),
      firstName,
      lastName,
      email,
      country,
      website,
      visaCategories,
      helpText,
      resume: resumeData,
      status: "Pending" as SubmissionStatus,
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
