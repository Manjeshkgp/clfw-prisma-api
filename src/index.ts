import {PrismaClient} from "@prisma/client/edge"

interface Env {
	DATABASE_URL:string
}

const prisma = new PrismaClient()

addEventListener("fetch",(event)=>{
	event.respondWith(handleRequest(event.request))
})

const handleRequest = async (request:Request) => {
	const resp = await fetch("https://www.aajtak.in/rssfeeds?id=home",
	{
		method:"GET",
		headers:{
			'Access-Control-Allow-Headers':"*",
			'Access-Control-Allow-Methods':"GET,POST,DELETE,PATCH",
			'Access-Control-Allow-Origin':"*"
		}
	});
	const data = await resp.text()
	const randomNum = Math.random()
	const addedData = await prisma.justtest.create({
		data:{
			name:`${randomNum}`
		}
	})
	return new Response(JSON.stringify(addedData),{
		status:200,
		headers:{
			'Content-Type':"application/json"
		}
	})
}