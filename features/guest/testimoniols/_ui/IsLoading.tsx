import Loading from "@/components/ui/loading";

function IsLoading(){
    return(
        <section className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-3 text-center">
          <div className="mx-auto h-3 w-28 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto h-8 w-64 max-w-full animate-pulse rounded-lg bg-muted" />
        </div>
        <Loading />
      </section>
    )
}
export default IsLoading;