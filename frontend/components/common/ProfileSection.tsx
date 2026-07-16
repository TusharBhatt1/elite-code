"use client";

import { useState, useEffect } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/server-actions/delete-cookie";

export function ProfileSection() {
	const router = useRouter();
	const [user, setUser] = useState<{ name?: string; role?: string } | null>(
		null,
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Load user data from localStorage on mount
		try {
			const storedUser = localStorage.getItem("user");
			if (storedUser) {
				const userData = JSON.parse(storedUser);
				setUser(userData);
			}
		} catch (error) {
			console.error("Failed to parse user data:", error);
		}

		// Listen for storage changes (e.g., from other tabs or after redirect)
		const handleStorageChange = () => {
			try {
				const storedUser = localStorage.getItem("user");
				if (storedUser) {
					const userData = JSON.parse(storedUser);
					setUser(userData);
				} else {
					setUser(null);
				}
			} catch (error) {
				console.error("Failed to parse user data:", error);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const handleLogout = async () => {
		localStorage.removeItem("user");
		setUser(null);
		await logout();
	};

	if (!user?.name) {
		return null
	}

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 px-3 py-1 rounded hover:bg-muted transition-colors"
			>
				<div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white text-xs font-semibold">
					{user.name?.[0]?.toUpperCase() || "U"}
				</div>
				<div className="hidden sm:block text-left">
					<div className="text-sm font-medium leading-none">{user.name}</div>
					<div className="text-xs text-muted-foreground capitalize">
						{user.role || "user"}
					</div>
				</div>
				<ChevronDown className="h-4 w-4 hidden sm:block" />
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 rounded-md border bg-background shadow-lg z-50">
					<div className="px-4 py-3 border-b">
						<p className="font-medium text-sm">{user.name}</p>
						<p className="text-xs text-muted-foreground capitalize">
							{user.role || "user"}
						</p>
					</div>
					<button
						onClick={handleLogout}
						className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2 text-red-600 hover:text-red-700"
					>
						<LogOut className="h-4 w-4" />
						Logout
					</button>
				</div>
			)}
		</div>
	);
}
