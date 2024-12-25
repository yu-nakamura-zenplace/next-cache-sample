import { staffsCache } from "@/cache/staffsCache";
import Link from "next/link";

export default async function Page() {
  const staffs = await staffsCache.getStaffs();
  console.log("koko");

  return (
    <div>
      <h1>Home</h1>
      
      <Link href="/staffs">Staffs</Link>

      {staffs.map((staff) => (
        <Link href={`/staffs/${staff.staff_id}`} key={staff.staff_id}>
          <p>{JSON.stringify(staff)}</p>
        </Link>
      ))}
    </div>
  );
}