"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { User } from "@/types/user.types"
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service"
import { Button } from "@/components/ui/button";

interface IProps { }

function UserTable({ }: IProps) {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setselectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            console.log(response.data);
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    if (loading) {
        return <p>Loading categories...</p>;
    }

    const handleDelete = async (id: string) => {
        try {
            await userService.deleteUser(id);

            setUsers((prev) =>
                prev.filter((userID) => userID._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (user: User) => {
        setselectedUser(user);
    };
    return (
        <div className="rounded-lg border">
            <Table className="max-w-full">

                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone-Number</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>IsVerified</TableHead>
                        <TableHead>IsDeleted</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                        <TableHead>Update</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {users.map((user) => (
                        <TableRow key={user._id}>

                            <TableCell>
                                {user._id}
                            </TableCell>

                            <TableCell>
                                {user.name}
                            </TableCell>

                            <TableCell>
                                {user.email}
                            </TableCell>

                            <TableCell>
                                {user.phoneNumber}
                            </TableCell>

                            <TableCell>
                                {user.role}
                            </TableCell>

                            <TableCell>
                                {user.isVerified}
                            </TableCell>

                            <TableCell>
                                {user.isDeleted}
                            </TableCell>

                            <TableCell>
                                {user.createdAt}
                            </TableCell>

                            <TableCell>
                                {user.updatedAt}
                            </TableCell>

                            <TableCell>
                                <Button type="button" onClick={() => handleUpdate(user)}>
                                    Update
                                </Button>
                            </TableCell>

                            <TableCell>
                                <Button type="button" variant="destructive" onClick={() => handleDelete(user._id)}  >
                                    Delete
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}

                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell>
                            number of users:
                        </TableCell>
                        <TableCell>
                            {users.length}
                        </TableCell>
                    </TableRow>
                </TableFooter>

            </Table>
        </div>
    );
}

export default UserTable;
