import { staffsCache } from '@/cache/staffsCache';

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const staff = await staffsCache.findById(Number(id));

  return (
    <div>
      <h1>Staff Details</h1>
      <pre>{JSON.stringify(staff, null, 2)}</pre>
    </div>
  );
}