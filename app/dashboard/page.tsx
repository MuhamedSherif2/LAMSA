function Page() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Welcome back to Lamsa Store admin panel.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Sales', value: '$12,450' },
                    { label: 'Orders', value: '342' },
                    { label: 'Products', value: '87' },
                    { label: 'Customers', value: '1,240' },
                ].map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-border bg-card p-5"
                    >
                        <p className="text-xs text-muted-foreground">{card.label}</p>
                        <p className="text-2xl font-semibold mt-1">{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page