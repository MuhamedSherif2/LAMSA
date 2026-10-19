"use client";

import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAdminTestimonialsQuery,
  useDeleteTestimonialMutation,
  useUpdateTestimonialStatusMutation,
} from "@/store/slices/testimonialSlice";

function TableTestimonials() {
  const { data, isLoading, isError, error } =
    useGetAdminTestimonialsQuery();

  const [deleteTestimonial, { isLoading: isDeleting }] =
    useDeleteTestimonialMutation();

  const [updateTestimonialStatus, { isLoading: isUpdating }] =
    useUpdateTestimonialStatusMutation();

  if (isLoading) return <Loading />;

  if (isError) {
    console.error(error);

    return (
      <p className="rounded-lg border border-destructive p-4 text-destructive">
        Failed to load testimonials.
      </p>
    );
  }

  const testimonials = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      await deleteTestimonial(id).unwrap();
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    }
  };

  const handleStatusChange = async (
    id: string,
    isShow: boolean,
  ) => {
    try {
      await updateTestimonialStatus({
        id,
        data: { isShow },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update testimonial status:", error);
    }
  };

  if (testimonials.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        No testimonials found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Feedback</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {testimonials.map((testimonial) => (
            <TableRow key={testimonial._id}>
              <TableCell className="font-medium">
                {testimonial.name}
              </TableCell>

              <TableCell className="max-w-sm whitespace-normal">
                {testimonial.message}
              </TableCell>

              <TableCell>
                <span
                  className={
                    testimonial.isShow
                      ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }
                >
                  {testimonial.isShow ? "Visible" : "Hidden"}
                </span>
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() =>
                      handleStatusChange(
                        testimonial._id,
                        !testimonial.isShow,
                      )
                    }
                  >
                    {testimonial.isShow ? "Hide" : "Show"}
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isDeleting}
                    onClick={() => handleDelete(testimonial._id)}
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

export default TableTestimonials;