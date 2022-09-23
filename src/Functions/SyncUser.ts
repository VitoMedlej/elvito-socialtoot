import {User} from "../Types";

const SyncUser = ({setUser, user} : {setUser:any,user:User | null}) => {
    let LocalUser = localStorage.getItem('LocalUser')
    if (LocalUser && !user) {
        let parsedUser : User | null = JSON.parse(LocalUser);
        setUser(parsedUser)
        return
    }
    if (!LocalUser && user) {
        let stringifyUser = JSON.stringify(user);
        localStorage.setItem('LocalUser', stringifyUser);
        return
    }
}
export default SyncUser