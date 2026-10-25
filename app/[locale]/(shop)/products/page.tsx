import GetProducts from "@/features/guest/product/_component/GetProducts";

interface IProps {

}

function page({ }: IProps) {
    return (
        <section>
            <GetProducts />
        </section>
    )
}
export default page;