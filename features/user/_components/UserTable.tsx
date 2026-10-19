"use client";

import { useGetAllUsersQuery, useDeleteUserMutation } from "@/store/slices/userSlice";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  LoaderCircle,
  RefreshCw,
  Trash2,
  Users,
  ShieldCheck,
  ShieldAlert,
  Mail,
  Phone,
  CalendarDays,
} from "lucide-react";

function UserTable() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = response?.data ?? [];

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully.");
    } catch {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(parsedDate);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card">
        <LoaderCircle className="size-8 animate-spin text-accent" />
        <p className="text-sm text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="size-6 text-destructive" />
        </div>

        <div>
          <h2 className="font-semibold text-foreground">
            Failed to load users
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while fetching the users.
          </p>
        </div>

        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="mr-2 size-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10">
              <Users className="size-5 text-accent" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Users Management
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your store customers and accounts.
              </p>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isFetching}
          onClick={() => refetch()}
          className="w-full sm:w-auto"
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <Users className="size-5 text-accent" />
          </div>

          <p className="mt-3 text-3xl font-semibold text-foreground">
            {users.length}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Verified Users</p>
            <ShieldCheck className="size-5 text-emerald-600" />
          </div>

          <p className="mt-3 text-3xl font-semibold text-foreground">
            {users.filter((user) => user.isVerified).length}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Deleted Accounts</p>
            <ShieldAlert className="size-5 text-destructive" />
          </div>

          <p className="mt-3 text-3xl font-semibold text-foreground">
            {users.filter((user) => user.isDeleted).length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-semibold text-foreground">All Users</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              User account details and activity.
            </p>
          </div>

          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {users.length} users
          </span>
        </div>

        {users.length === 0 ? (
          <div className="flex min-h-56 flex-col items-center justify-center px-4 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <Users className="size-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold text-foreground">
              No users found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              There are no users to display yet.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="whitespace-nowrap">User</TableHead>
                  <TableHead className="whitespace-nowrap">Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Created At
                  </TableHead>
                  <TableHead className="whitespace-nowrap">
                    Updated At
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user._id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* User */}
                    <TableCell className="min-w-52">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-48 truncate font-medium text-foreground">
                            {user.name}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {user._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell className="min-w-56">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Mail className="size-3.5 shrink-0 text-muted-foreground" />
                          <span className="max-w-48 truncate">
                            {user.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="size-3.5 shrink-0" />
                          <span>{user.phoneNumber || "Not provided"}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                          user.role === "admin"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>

                    {/* Verification */}
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.isVerified
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            user.isVerified
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </TableCell>

                    {/* Account Status */}
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.isDeleted
                            ? "bg-destructive/10 text-destructive"
                            : "bg-emerald-500/10 text-emerald-600"
                        }`}
                      >
                        {user.isDeleted ? "Deleted" : "Active"}
                      </span>
                    </TableCell>

                    {/* Dates */}
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="size-3.5" />
                        {formatDate(user.createdAt)}
                      </span>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(user.updatedAt)}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting || user.isDeleted}
                        onClick={() => handleDelete(user._id)}
                        aria-label={`Delete ${user.name}`}
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={7} className="text-sm text-muted-foreground">
                    Total users: {users.length}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    LAMSA Admin
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserTable;