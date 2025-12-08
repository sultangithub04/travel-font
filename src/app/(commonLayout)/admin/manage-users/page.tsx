/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
};

// ⭐ MOCK USERS DATA
const MOCK_USERS: UserType[] = [
  {
    _id: "u1",
    name: "James Carter",
    email: "james@example.com",
    role: "admin",
    createdAt: "2025-01-20T10:00:00.000Z",
  },
  {
    _id: "u2",
    name: "Sophia Lee",
    email: "sophia@mail.com",
    role: "user",
    createdAt: "2025-02-01T06:50:00.000Z",
  },
  {
    _id: "u3",
    name: "Ariful Islam",
    email: "arif@example.com",
    role: "user",
    createdAt: "2025-02-15T16:25:00.000Z",
  },
];

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);

    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 700);
  };

  const handleRoleChange = (id: string, role: "admin" | "user") => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, role } : user
      )
    );

    toast.success(`User role changed to ${role}`);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user._id !== id));
    toast.success("User deleted successfully");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user._id}>
              <CardContent className="flex justify-between items-center py-4">
                
                {/* LEFT SIDE INFO */}
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-sm">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    Role:
                    <span
                      className={`ml-1 ${
                        user.role === "admin"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2">
                  <Button
                    variant={user.role === "admin" ? "default" : "outline"}
                    onClick={() => handleRoleChange(user._id, "admin")}
                  >
                    Make Admin
                  </Button>

                  <Button
                    variant={user.role === "user" ? "default" : "outline"}
                    onClick={() => handleRoleChange(user._id, "user")}
                  >
                    Make User
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
