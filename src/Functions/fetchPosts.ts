export const fetchPosts = async(url : string) => {
    try {
        const req = await fetch(url, {method: 'GET'})
        const res = await req.json()
        res
            ? res
            : null
       
    } catch (e) {
        console.log('Error o1:', e)
    }
}