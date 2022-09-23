import { FormEvent } from "react"

export const handleSubmit = async(e : FormEvent < HTMLFormElement > | null , url : string, body : {
    name?: string,
    email: string,
    password: string
} | any) => {
    e && e.preventDefault() 
    try {
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const res = await req.json()
        if (res) return res
    } catch (e) {
        console.log('Error:', e)
    }
}