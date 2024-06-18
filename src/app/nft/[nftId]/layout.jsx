
export default async function SummarySingleRoute({
  params,
  children,
}) {
  return (
    <div>
        {children}
        {params.id}
    </div>
  );
}