import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import StyledComponentsRegistry from "./registry";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leads Management",
  description: "Manage and track leads effectively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
