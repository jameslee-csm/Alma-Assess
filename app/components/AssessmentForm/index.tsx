"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Container,
  Header,
  // Logo,
  Title,
  FormSection,
  FormDescription,
  Input,
  Select,
  TextArea,
  SubmitButton,
  RadioGroup,
  RadioLabel,
  Checkbox,
  FileUploadContainer,
  FileInput,
  FileLabel,
} from "./styles";
import allCountries from "world-countries/countries.json";
import HeaderBackground from "../assets/HeaderBackground.png";
import Logo from "../assets/logo.png";
import Notice from "../assets/notice.png";
import Dice from "../assets/dice.png";
import Heart from "../assets/heart.png";
import { ValidationError } from "next/dist/compiled/amphtml-validator";

export default function AssessmentForm() {
  const countries = allCountries.map((country) => country.name.common).sort();

  // Define initial form state
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    website: "",
    visaCategories: {
      "O-1": false,
      "EB-1A": false,
      "EB-2-NIW": false,
      unknown: false,
    },
    helpText: "",
    resume: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [resumeFileName, setResumeFileName] = useState<string>("");

  // Add resetForm function
  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        visaCategories: {
          ...prev.visaCategories,
          [value]: checkbox.checked,
        },
      }));
    } else if (type === "file") {
      // Handle file input
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        setFormData((prev) => ({
          ...prev,
          resume: file,
        }));
        setResumeFileName(file.name);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();

      // Add all text fields
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("website", formData.website);
      formDataToSend.append("helpText", formData.helpText);

      // Add visa categories
      Object.entries(formData.visaCategories).forEach(([key, value]) => {
        formDataToSend.append(`visaCategories[${key}]`, String(value));
      });

      // Add resume file if it exists
      if (formData.resume) {
        formDataToSend.append("resume", formData.resume);
      }

      const response = await fetch("/api/assessment", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          // Handle structured validation errors
          const errorMessage = data.errors
            .map((err: ValidationError) => `${err.field}: ${err.message}`)
            .join("\n");
          setSubmitStatus({
            success: false,
            message: `Please correct the following errors:\n${errorMessage}`,
          });
        } else {
          setSubmitStatus({
            success: false,
            message: data.error || "Something went wrong. Please try again.",
          });
        }
      } else {
        setSubmitStatus({
          success: true,
          message: "Your assessment request has been submitted successfully!",
        });
        // Reset form after successful submission
        resetForm();
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message:
          "Connection error. Please check your internet connection and try again.",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header>
        <Image
          src={HeaderBackground}
          alt="Header background"
          className="header-background"
          fill
          style={{ objectFit: "cover", zIndex: -1 }}
          priority
        />
        <Image src={Logo} alt="Logo" />
        <Title>
          Get An Assessment
          <br />
          Of Your Immigration Case
        </Title>
      </Header>
      <Container>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              margin: "20px 0px",
            }}
          >
            <Image src={Notice} alt="notice" />
          </div>
          <FormSection>
            <FormDescription variant="h1">
              Want to understand your visa options?
            </FormDescription>
            <FormDescription variant="h2">
              Submit the form below and our team of experienced attorneys will
              review your information and send a preliminary assessment of your
              case based on your goals.
            </FormDescription>

            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Country of Citizenship</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="LinkedIn / Personal Website URL"
              required
            />

            <FileUploadContainer>
              <FileLabel htmlFor="resume">
                Upload your resume (PDF, DOC, or DOCX)
                {resumeFileName && (
                  <span className="file-name"> - {resumeFileName}</span>
                )}
              </FileLabel>
              <FileInput
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </FileUploadContainer>

            <FormSection>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  margin: "20px 0px",
                }}
              >
                <Image src={Dice} alt="dice" />
              </div>
              <FormDescription variant="h1">
                Visa categories of interest? (Select all that apply)
              </FormDescription>
              <RadioGroup>
                <RadioLabel>
                  <Checkbox
                    type="checkbox"
                    name="visa[]"
                    value="O-1"
                    checked={formData.visaCategories["O-1"]}
                    onChange={handleChange}
                  />{" "}
                  O-1
                </RadioLabel>
                <RadioLabel>
                  <Checkbox
                    type="checkbox"
                    name="visa[]"
                    value="EB-1A"
                    checked={formData.visaCategories["EB-1A"]}
                    onChange={handleChange}
                  />{" "}
                  EB-1A
                </RadioLabel>
                <RadioLabel>
                  <Checkbox
                    type="checkbox"
                    name="visa[]"
                    value="EB-2-NIW"
                    checked={formData.visaCategories["EB-2-NIW"]}
                    onChange={handleChange}
                  />{" "}
                  EB-2 NIW
                </RadioLabel>
                <RadioLabel>
                  <Checkbox
                    type="checkbox"
                    name="visa[]"
                    value="unknown"
                    checked={formData.visaCategories["unknown"]}
                    onChange={handleChange}
                  />{" "}
                  I don&apos;t know
                </RadioLabel>
              </RadioGroup>
            </FormSection>

            <FormSection>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  margin: "20px 0px",
                }}
              >
                <Image src={Heart} alt="heart" />
              </div>
              <FormDescription variant="h1">
                How can we help you?
              </FormDescription>
              <TextArea
                name="helpText"
                value={formData.helpText}
                onChange={handleChange}
                placeholder="What is your current immigration status? Are you looking to change status? What are your goals?"
              />
            </FormSection>

            {submitStatus.message && (
              <div
                style={{
                  margin: "20px 0",
                  padding: "10px",
                  borderRadius: "4px",
                  backgroundColor: submitStatus.success ? "#e6ffe6" : "#ffe6e6",
                  color: submitStatus.success ? "#006600" : "#cc0000",
                  textAlign: "center",
                }}
              >
                {submitStatus.message}
              </div>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </SubmitButton>
          </FormSection>
        </form>
      </Container>
    </>
  );
}
