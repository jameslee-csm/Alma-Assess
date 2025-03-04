"use client";

import React from "react";
import { Container, Icon, Message, BackButton } from "./styles";
import Image from "next/image";
import Notice from "../assets/notice.png";

export default function ThankYou() {
  return (
    <Container>
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
      <Message>
        Your information was submitted to our team of immigration attorneys.
        Expect an email from hello@tryalma.ai
      </Message>
      <BackButton onClick={() => (window.location.href = "/assessment")}>
        Go Back to Homepage
      </BackButton>
    </Container>
  );
}
