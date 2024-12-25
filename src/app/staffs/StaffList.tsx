'use client'

import { Staff } from "@/api/staffs";
import Link from "next/link";

export const StaffList = ({ staffs }: { staffs: Staff[] }) => {
  console.log("StaffList");
  return (
    <>
      <h2>Staff List</h2>

      {staffs.map((staff) => (
        <Link href={`/staffs/${staff.staff_id}`} key={staff.staff_id}>
          <p>{JSON.stringify(staff)}</p>
        </Link>
      ))}
    </>
  );
}
