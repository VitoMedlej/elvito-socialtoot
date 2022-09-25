export const refreshUser = async(user:any,setUser: any ) => {
    try {
        if (!user
            ?._id) 
            throw 'Invalid refresh user Id'

        const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/refresh-user?userId=${user._id}`)
        const res = await req.json()

        if (res && res._id) {
            localStorage.setItem('LocalUser', JSON.stringify(res));
            setUser(res)
        }
    } catch (e) {
        console.log(e)
    }
}