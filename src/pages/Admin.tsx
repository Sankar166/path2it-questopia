
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { getAllUsers, setAdminStatus } from "@/lib/db";
import type { UserProfile } from "@/types/questions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
  }, [loading, isAdmin, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      await setAdminStatus(userId, !currentStatus);
      // Update the local state
      setUsers(
        users.map((u) =>
          u.user_id === userId ? { ...u, is_admin: !currentStatus } : u
        )
      );
      toast({
        title: "Success",
        description: `Admin status ${!currentStatus ? "granted" : "revoked"}`,
      });
    } catch (error) {
      console.error("Error updating admin status:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    }
  };

  if (loading || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-xl text-gray-600">
              Manage users and application settings
            </p>
          </div>

          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">User Management</h2>
                  <Button onClick={fetchUsers} disabled={loadingUsers}>
                    {loadingUsers ? "Loading..." : "Refresh"}
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Display Name</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead className="text-right">Questions Attempted</TableHead>
                        <TableHead className="text-right">Correct Answers</TableHead>
                        <TableHead className="text-right">Success Rate</TableHead>
                        <TableHead className="text-center">Admin Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            {loadingUsers ? "Loading users..." : "No users found"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.display_name}</TableCell>
                            <TableCell className="font-mono text-xs truncate max-w-[120px]">
                              {user.user_id}
                            </TableCell>
                            <TableCell className="text-right">{user.total_questions_attempted}</TableCell>
                            <TableCell className="text-right">{user.correct_answers}</TableCell>
                            <TableCell className="text-right">
                              {user.total_questions_attempted > 0
                                ? `${Math.round((user.correct_answers / user.total_questions_attempted) * 100)}%`
                                : "N/A"}
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={user.is_admin}
                                onCheckedChange={() => handleToggleAdmin(user.user_id, user.is_admin)}
                                aria-label="Toggle admin status"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">Statistics Dashboard</h2>
                <p className="text-gray-500">
                  Detailed statistics will be implemented soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
