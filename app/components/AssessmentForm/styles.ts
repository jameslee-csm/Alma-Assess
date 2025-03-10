import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.header`
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  overflow: hidden;
  padding: 2rem 20rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`;

export const FormSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

interface FormDescriptionProps {
  variant?: "h1" | "h2";
}

export const FormDescription = styled.p<FormDescriptionProps>`
  color: #333;
  text-align: center;
  margin: 10px auto;
  font-size: 1.2rem;
  font-weight: 600;

  ${(props) =>
    props.variant === "h1" &&
    `
    font-size: 1.6rem;
    font-weight: 600;
  `}
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  color: #333;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 120px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #000;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  border: 1px solid #888888;
  cursor: pointer;

  &:checked {
    accent-color: #your-theme-color;
  }
`;

export const FileUploadContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const FileLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;

  .file-name {
    font-style: italic;
    margin-left: 8px;
    font-weight: normal;
  }
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  &:hover {
    background-color: #f0f0f0;
  }
`;
