import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { createSession } from "@/lib/auth";

const schema=z.object({email:z.string().email(),password:z.string().min(8)});
export async function POST(request:Request){try{const input=schema.parse(await request.json());const user=await getDb().user.findUnique({where:{email:input.email.toLowerCase()},include:{memberships:true}});if(!user||!await compare(input.password,user.passwordHash)||!user.memberships[0])return NextResponse.json({error:"Invalid email or password"},{status:401});await createSession({userId:user.id,restaurantId:user.memberships[0].restaurantId});return NextResponse.json({ok:true})}catch{return NextResponse.json({error:"Invalid request"},{status:400})}}
