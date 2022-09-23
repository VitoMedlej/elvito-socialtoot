const logout = (setUser:any) => {

        localStorage.removeItem('LocalUser')
        setUser(null)
}
export default logout