import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./lib/providers";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "elitecode - Coding Challenges",
	description: "Master coding skills with curated challenges and real-time feedback",
	keywords: ["coding", "challenges", "programming", "practice"],
	authors: [{ name: "elitecode" }],
	openGraph: {
		title: "elitecode - Coding Challenges",
		description: "Master coding skills with curated challenges and real-time feedback",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${roboto.variable} h-full antialiased`}
			style={{ fontFamily: 'var(--font-roboto)' }}
		>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<Providers>
					<Toaster richColors position="bottom-right" />
					{children}
				</Providers>
			</body>
		</html>
	);
}
