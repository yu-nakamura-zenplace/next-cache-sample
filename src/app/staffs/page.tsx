import { staffsCache } from "@/cache/staffsCache";
import { StaffList } from "./StaffList";

export default async function Page() {
  const staffs = await staffsCache.getStaffs();

  return (
    <div>
      <h1>Staffs</h1>
      <StaffList staffs={staffs} />
    </div>
  );
}