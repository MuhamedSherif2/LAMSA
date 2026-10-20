"use client";

import { useState } from "react";
import { useGetAllMessagesQuery, useMarkAsReadMutation, useDeleteMessageMutation, } from "@/store/slices/contactSlice";
import Loading from "@/components/ui/loading";
import IsErrorMessage from "../_ui/IsError";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { CalendarDays, Mail, MailOpen, MessageSquare, Phone, RefreshCw, Trash2, UserRound, } from "lucide-react";

function GetMessage() {
    const { data, isLoading, isError, error, refetch, isFetching, } = useGetAllMessagesQuery();

    const [markAsRead, { isLoading: isMarkingAsRead }] = useMarkAsReadMutation();
    const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
    const [actionError, setActionError] = useState("");
    const messages = data?.data ?? [];
    const unreadCount = messages.filter((message) => !message.isRead).length;

    const handleMarkAsRead = async (id: string) => {
        setActionError("");

        try {
            await markAsRead(id).unwrap();
        } catch {
            setActionError(
                "Unable to mark this message as read. Please try again."
            );
        }
    };

    const handleDeleteMessage = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this message? This action cannot be undone."
        );

        if (!confirmed) return;

        setActionError("");

        try {
            await deleteMessage(id).unwrap();
        } catch {
            setActionError(
                "Unable to delete this message. Please try again."
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-64 items-center justify-center rounded-xl border border-border bg-card">
                <Loading />
            </div>
        );
    }

    if (isError) {
        return <IsErrorMessage error={error} onRetry={() => refetch()} isRetrying={isFetching} />
    }

    return (
        <section className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        Messages overview
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        All customer inquiries in one place.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isFetching}
                    className="w-full sm:w-auto"
                >
                    <RefreshCw
                        className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""
                            }`}
                    />
                    {isFetching ? "Refreshing..." : "Refresh"}
                </Button>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5 transition-colors">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total messages
                        </p>

                        <div className="rounded-lg bg-accent/10 p-2">
                            <MessageSquare className="size-5 text-accent" />
                        </div>
                    </div>

                    <p className="mt-4 text-3xl font-bold tabular-nums">
                        {messages.length}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        All received inquiries
                    </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 transition-colors">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                            Unread messages
                        </p>

                        <div className="rounded-lg bg-accent/10 p-2">
                            <Mail className="size-5 text-accent" />
                        </div>
                    </div>

                    <p className="mt-4 text-3xl font-bold tabular-nums">
                        {unreadCount}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Messages awaiting review
                    </p>
                </div>
            </div>

            {/* Action feedback */}
            {actionError && (
                <div
                    role="alert"
                    className="flex flex-col gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive sm:flex-row sm:items-center sm:justify-between"
                >
                    <p>{actionError}</p>

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setActionError("")}
                    >
                        Dismiss
                    </Button>
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex flex-col gap-2 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div>
                        <h3 className="font-semibold">All messages</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Review the details and manage each message.
                        </p>
                    </div>

                    <Badge variant="secondary" className="w-fit">
                        {messages.length}{" "}
                        {messages.length === 1 ? "message" : "messages"}
                    </Badge>
                </div>

                {messages.length === 0 ? (
                    <div className="flex flex-col items-center px-4 py-16 text-center">
                        <div className="mb-4 rounded-full bg-secondary p-4">
                            <MailOpen className="size-8 text-muted-foreground" />
                        </div>

                        <h3 className="text-lg font-semibold">
                            No messages yet
                        </h3>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                            When customers send a message through your contact
                            form, it will appear here.
                        </p>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="mt-5"
                        >
                            <RefreshCw
                                className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""
                                    }`}
                            />
                            Refresh messages
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead className="min-w-60">
                                        Sender
                                    </TableHead>

                                    <TableHead className="min-w-36">
                                        Subject
                                    </TableHead>

                                    <TableHead className="min-w-64">
                                        Message
                                    </TableHead>

                                    <TableHead className="min-w-36">
                                        Date
                                    </TableHead>

                                    <TableHead>Status</TableHead>

                                    <TableHead className="min-w-28 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {messages.map((message) => (
                                    <TableRow
                                        key={message._id}
                                        className={
                                            !message.isRead
                                                ? "bg-accent/4"
                                                : undefined
                                        }
                                    >
                                        {/* Sender */}
                                        <TableCell>
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                                                    <UserRound className="size-4 text-muted-foreground" />
                                                </div>

                                                <div className="min-w-0 space-y-1.5">
                                                    <p className="font-medium">
                                                        {message.name}
                                                    </p>

                                                    <a
                                                        href={`mailto:${message.email}`}
                                                        className="block break-all text-xs text-muted-foreground transition-colors hover:text-accent"
                                                    >
                                                        {message.email}
                                                    </a>

                                                    {message.phoneNumber && (
                                                        <a
                                                            href={`tel:${message.phoneNumber}`}
                                                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"
                                                        >
                                                            <Phone className="size-3 shrink-0" />
                                                            {message.phoneNumber}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Subject */}
                                        <TableCell>
                                            <span className="font-medium">
                                                {message.subject || "No subject"}
                                            </span>
                                        </TableCell>

                                        {/* Message */}
                                        <TableCell>
                                            <p className="line-clamp-3 max-w-sm whitespace-pre-wrap wrap-break-word text-sm leading-6 text-muted-foreground">
                                                {message.message}
                                            </p>
                                        </TableCell>

                                        {/* Date */}
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CalendarDays className="size-4 shrink-0" />

                                                <span>
                                                    {message.createdAt &&
                                                        !Number.isNaN(
                                                            new Date(message.createdAt).getTime()
                                                        )
                                                        ? new Date(
                                                            message.createdAt
                                                        ).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "—"}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Status */}
                                        <TableCell>
                                            {message.isRead ? (
                                                <Badge variant="secondary">
                                                    Read
                                                </Badge>
                                            ) : (
                                                <Badge className="border border-accent/30 bg-accent/10 text-accent">
                                                    Unread
                                                </Badge>
                                            )}
                                        </TableCell>

                                        {/* Actions */}
                                        <TableCell>
                                            <div className="flex items-center justify-end gap-2">
                                                {!message.isRead && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        title="Mark as read"
                                                        aria-label="Mark message as read"
                                                        disabled={
                                                            isMarkingAsRead || isDeleting
                                                        }
                                                        onClick={() =>
                                                            handleMarkAsRead(message._id)
                                                        }
                                                    >
                                                        <MailOpen className="size-4" />
                                                    </Button>
                                                )}

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    title="Delete message"
                                                    aria-label="Delete message"
                                                    disabled={
                                                        isDeleting || isMarkingAsRead
                                                    }
                                                    onClick={() =>
                                                        handleDeleteMessage(message._id)
                                                    }
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}

                {messages.length > 0 && (
                    <div className="flex flex-col gap-2 border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                        <span>
                            Showing {messages.length}{" "}
                            {messages.length === 1 ? "message" : "messages"}
                        </span>

                        <span>
                            {unreadCount} unread · {messages.length - unreadCount}{" "}
                            read
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}

export default GetMessage;