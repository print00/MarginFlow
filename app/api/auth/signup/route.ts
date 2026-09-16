import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { createSession } from "@/lib/auth";

const schema = z.object({ name:z.string().trim().min(2).max(80), email:z.string().email(), password:z.string().min(8).max(100), restaurantName:z.string().trim().min(2).max(100) });
export async function POST(request:Request){
 try{const input=schema.parse(await request.json());const db=getDb();const existing=await db.user.findUnique({where:{email:input.email.toLowerCase()}});if(existing)return NextResponse.json({error:"Email already registered"},{status:409});
 const result=await db.$transaction(async tx=>{const user=await tx.user.create({data:{name:input.name,email:input.email.toLowerCase(),passwordHash:await hash(input.password,12)}});const restaurant=await tx.restaurant.create({data:{name:input.restaurantName,ownerId:user.id,members:{create:{userId:user.id,role:"OWNER"}}}});return{user,restaurant}});
 await createSession({userId:result.user.id,restaurantId:result.restaurant.id});return NextResponse.json({ok:true},{status:201})}catch{return NextResponse.json({error:"Invalid signup details"},{status:400})}
}
