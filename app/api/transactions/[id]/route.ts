import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

const schema=z.object({type:z.enum(["INCOME","EXPENSE"]).optional(),category:z.string().min(1).max(80).optional(),needsReview:z.boolean().optional(),notes:z.string().max(500).optional()});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const session=await getSession();if(!session)return NextResponse.json({error:"Unauthorized"},{status:401});try{const input=schema.parse(await request.json());const {id}=await params;const result=await getDb().transaction.updateMany({where:{id,restaurantId:session.restaurantId},data:input});if(!result.count)return NextResponse.json({error:"Not found"},{status:404});await getDb().auditLog.create({data:{restaurantId:session.restaurantId,userId:session.userId,action:"transaction.updated",details:{transactionId:id,fields:Object.keys(input)}}});return NextResponse.json({ok:true})}catch{return NextResponse.json({error:"Invalid update"},{status:400})}}
