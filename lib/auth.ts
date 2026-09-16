import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const key = () => new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-secret-change-before-deploy");
export type Session = { userId: string; restaurantId: string };
export async function createSession(session: Session) {
  const token = await new SignJWT(session).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(key());
  (await cookies()).set("mf_session", token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get("mf_session")?.value;
  if (!token) return null;
  try { return (await jwtVerify(token, key())).payload as unknown as Session; } catch { return null; }
}
export async function requireRestaurant(restaurantId: string) {
  const session = await getSession();
  if (!session || session.restaurantId !== restaurantId) throw new Error("Unauthorized");
  return session;
}
