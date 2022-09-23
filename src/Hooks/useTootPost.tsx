import { useContext, useState } from 'react'
import { UserContext } from '../../pages/_app';

const tootPost = () => {
    const [isLiking,setLiking] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const tootPost = async(posterId:string,postId : string, nb : number) => {
        try {
    
            if (user
                ?.toots == 0 || user
                    ?.toots < nb) {
                alert('You dont have enough toots!')
                return
            }
            if (!user || !user
                ?._id) {
                return;
            }
            setLiking(true)
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/like-post?posterId=${posterId}&nb=${nb}&userId=${user._id}&postId=${postId} `)
    
            const newUser = {
                ...user,
                toots: user.toots - nb,
                tootsGiven: user.tootsGiven + nb
            }
            setUser(newUser)
            localStorage.setItem('LocalUser', JSON.stringify(newUser))
            setLiking(false)

        } catch (e) {
            setLiking(false)

            console.log('e: ', e);
    
        }
    }
    return {tootPost, isLiking}
}

export default tootPost