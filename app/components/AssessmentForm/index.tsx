"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
} from "./styles";
import allCountries from "world-countries/countries.json";
import HeaderBackground from "../assets/HeaderBackground.png";
import Logo from "../assets/logo.png";
import Notice from "../assets/notice.png";
import Dice from "../assets/dice.png";
import Heart from "../assets/heart.png";

export default function AssessmentForm() {
  const countries = allCountries.map((country) => country.name.common).sort();
  const router = useRouter();

  const [formData, setFormData] = useState({
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

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
    setSubmitStatus({});

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/assessment/thank-you");
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Failed to submit the form. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });
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
            />

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
                  I don't know
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
