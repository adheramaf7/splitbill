'use server';

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const getAuthSession = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  })
  return data
}