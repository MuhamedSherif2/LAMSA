
"use client";

import Loading from "@/components/ui/loading";
import type { Banner } from "@/types/banner.types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    useGetAllBannersQuery,
    useDeleteBannerMutation,
} from "@/store/slices/bannerSlice";

interface TableBannerProps {
    onEdit: (banner: Banner) => void;
}

function TableBanner({ onEdit }: TableBannerProps) {
    const {
        isLoading,
        isError,
        data,
        error,
    } = useGetAllBannersQuery();

    const [deleteBanner, { isLoading: isDeleting }] =
        useDeleteBannerMutation();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        console.error(error);

        return (
            <p className="rounded-lg border border-destructive p-4 text-destructive">
                Failed to load banners.
            </p>
        );
    }

    const banners = data?.data ?? [];

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this banner?"
        );

        if (!confirmed) return;

        try {
            await deleteBanner(id).unwrap();
            alert("Banner deleted successfully.");
        } catch (error) {
            console.error("Failed to delete banner:", error);
            alert("Failed to delete banner.");
        }
    };

    if (banners.length === 0) {
        return (
            <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="font-medium text-foreground">
                    No banners found
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Create your first banner using the form above.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {banners.map((banner) => (
                        <TableRow key={banner._id}>
                            <TableCell>
                                <span className="text-sm text-muted-foreground">
                                    Banner image
                                </span>
                            </TableCell>

                            <TableCell className="font-medium text-foreground">
                                {banner.title}
                            </TableCell>

                            <TableCell className="max-w-48 truncate text-muted-foreground">
                                {banner.link || "—"}
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(banner)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        disabled={isDeleting}
                                        onClick={() => handleDelete(banner._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableBanner;
