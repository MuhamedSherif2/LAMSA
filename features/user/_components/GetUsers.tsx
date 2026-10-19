import UserTable from "./UserTable";

interface IProps { }

function GetUsers({ }: IProps) {
    return (
        <section className="">
            <UserTable />
        </section>
    );
}

export default GetUsers;