import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function THeaderPro() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default THeaderPro;