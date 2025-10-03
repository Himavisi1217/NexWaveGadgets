
"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfilePage() {
	const { user, loading, logout } = useAuth();
	const isAuthenticated = !!user;
	const router = useRouter();


	const [editing, setEditing] = useState(false);
	const [profileData, setProfileData] = useState({
		name: user?.name || "",
		email: user?.email || "",
	});

	useEffect(() => {
		if (!loading && !isAuthenticated) {
			router.replace("/login");
		}
	}, [loading, isAuthenticated, router]);

	const handleEdit = () => setEditing(true);
	const handleCancel = () => setEditing(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleSave = async () => {
		if (!user?.id) return;
		await updateDoc(doc(db, "users", user.id), {
			displayName: profileData.name,
			email: profileData.email,
		});
		setEditing(false);
	};

	const handleLogout = () => {
		logout();
		router.replace("/login");
	};

	if (loading) {
		return (
			<div className="min-h-screen grid place-items-center bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
				<div className="animate-pulse text-center">
					<div className="h-24 w-24 rounded-full bg-white/10 mx-auto mb-6" />
					<p className="text-purple-200">Loading your profile…</p>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) return null; // redirecting

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
			<Navbar />
			<div className="container mx-auto py-16 flex flex-col items-center">
				<div className="bg-background/80 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-blue-500">
					<img src="/placeholder-user.jpg" alt="Avatar" className="mx-auto mb-6 w-24 h-24 rounded-full shadow-lg border-4 border-purple-500" />
					{editing ? (
						<>
							<input
								type="text"
								name="name"
								value={profileData.name}
								onChange={handleChange}
								className="mb-2 px-4 py-2 rounded w-full text-black"
								placeholder="Full Name"
							/>
							<input
								type="email"
								name="email"
								value={profileData.email}
								onChange={handleChange}
								className="mb-4 px-4 py-2 rounded w-full text-black"
								placeholder="Email"
							/>
							<Button className="mb-2 w-full bg-blue-500 text-white" onClick={handleSave}>Save</Button>
							<Button className="w-full" variant="secondary" onClick={handleCancel}>Cancel</Button>
						</>
					) : (
						<>
							<h1 className="text-3xl font-extrabold mb-2 text-blue-400 drop-shadow-lg">{user?.name}</h1>
							<div className="mb-2 text-muted-foreground">{user?.email}</div>
							<div className="mb-4 text-sm text-purple-300">Role: {user?.role}</div>
							<Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-md hover:scale-105 transition-transform mb-4" onClick={handleEdit}>Edit Profile</Button>
							<Button variant="destructive" className="w-full" onClick={handleLogout}>Log Out</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}