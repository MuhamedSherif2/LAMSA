import UserTable from "./UserTable";

interface IProps { }

function GetUsers({ }: IProps) {
    return (
        <section className="space-y-6">

            {/* Form */}
            {/* <CategoryForm
                category={selectedCategory ?? undefined}
                onSuccess={handleFormSuccess}
            /> */}

            {/* Table */}

                <UserTable />
        </section>
    );
}

export default GetUsers;