export const revalidate = 3600;

export default async function Page({ params }: {
  params: {
    pkg: string
  }
}) {

  console.log(params);

  return (
      <div>
        {JSON.stringify(params)}
      </div>
  );
}
