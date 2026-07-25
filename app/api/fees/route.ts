import { NextResponse } from "next/server";
import { getFeeData } from "@/services/fees";

export async function GET() {
  const result = await getFeeData();
  return NextResponse.json(result);
}
