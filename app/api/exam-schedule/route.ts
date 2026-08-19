import { NextResponse } from "next/server";
import { getSchedule } from "@/services/schedule";

export async function GET() {
  const result = await getSchedule();

  return NextResponse.json(result);
}
