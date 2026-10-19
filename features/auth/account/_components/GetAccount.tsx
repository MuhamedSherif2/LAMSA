"use client";

import {
    Mail,
    Phone,
    UserRound,
    ShieldCheck,
    CircleUserRound,
    LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Loading from "@/components/ui/loading";
import { useGetProfileQuery } from "@/store/slices/userSlice";
import { cookieHelper, TOKEN_KEY } from "@/lib/cookies";
import { Button } from "@/components/ui/button";

function GetAccount() {
    const router = useRouter();
    const { data, isLoading, isError } = useGetProfileQuery();

    const handleLogout = () => {
        cookieHelper.remove(TOKEN_KEY);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("lamsa_user");

        window.dispatchEvent(new Event("lamsa-user-updated"));

        router.replace("/");
    };

    if (isLoading) return <Loading />;

    if (isError || !data?.data) {
        return (
            <section className="flex min-h-[50vh] items-center justify-center px-4">
                <p className="rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
                    Failed to load profile data. Please try again.
                </p>
            </section>
        );
    }

    const user = data.data;

    const details = [
        {
            label: "Full Name",
            value: user.name || "Not provided",
            icon: UserRound,
        },
        {
            label: "Email Address",
            value: user.email || "Not provided",
            icon: Mail,
        },
        {
            label: "Phone Number",
            value: user.phoneNumber || "Not provided",
            icon: Phone,
        },
        {
            label: "Account Role",
            value: user.role || "Customer",
            icon: ShieldCheck,
        },
    ];

    return (
        <section className="min-h-[70vh] bg-background px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto max-w-5xl">
                {/* Page Header */}
                <div className="mb-10">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                        Your Personal Space
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        My Account
                    </h1>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
                        Manage your personal information and keep your account details
                        up to date.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    {/* Profile Banner */}
                    <div className="h-28 bg-accent/10 sm:h-36" />

                    <div className="px-5 pb-8 sm:px-8 sm:pb-10">
                        {/* User Header */}
                        <div className="-mt-12 mb-8 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-background text-accent shadow-sm sm:size-28">
                                    <CircleUserRound
                                        className="size-12 sm:size-14"
                                        strokeWidth={1.3}
                                    />
                                </div>

                                <div className="min-w-0 pb-1">
                                    <h2 className="truncate text-xl font-bold text-foreground sm:text-2xl">
                                        {user.name}
                                    </h2>

                                    <p className="mt-1 truncate text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <span className="w-fit rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold capitalize tracking-wide text-accent">
                                {user.role || "Customer"}
                            </span>
                        </div>

                        {/* Section Heading */}
                        <div className="mb-6 border-b border-border pb-5">
                            <h3 className="text-lg font-semibold text-foreground">
                                Personal Information
                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Your account details at a glance.
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {details.map(({ label, value, icon: Icon }) => (
                                <div
                                    key={label}
                                    className="group flex min-w-0 items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-colors duration-200 hover:border-accent/40 sm:p-5"
                                >
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                                        <Icon className="size-5" strokeWidth={1.7} />
                                    </div>

                                    <div className="min-w-0 flex-1 pt-0.5">
                                        <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            {label}
                                        </p>

                                        <p className="break-words text-sm font-semibold text-foreground sm:text-base">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Account Notice */}
                        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-muted/50 p-4">
                            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" />

                            <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                                Your personal information is associated with your account.
                                Keep your contact details up to date for a better shopping
                                experience.
                            </p>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-8 flex justify-end border-t border-border pt-6">
                            <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                onClick={handleLogout}
                                className="rounded-xl px-6 font-semibold shadow-sm transition-all hover:shadow-md"
                            >
                                <LogOut className="size-4" />
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GetAccount;