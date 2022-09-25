import {useContext, useState} from 'react'
import {UserContext} from '../../pages/_app';

const useTootPost = () => {
    const [isLiking,
        setLiking] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const tootPost = async(posterId : string, postId : string, nb : number) => {
        try {

            if (user.toots < 1 || user
                ?.toots === 0 || user
                    ?.toots < nb) {
                alert('You dont have enough toots!')
                return
            }
            if (!user || !user
                ?._id) {
                alert('Are you even logged in mate?')
                return;
            }
            if (!postId || !posterId) {
                return
            }
            setLiking(true)
            const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/like-post?posterId=${posterId}&nb=${nb}&userId=${user
                ?._id}&postId=${postId} `)
            const res = await req.json()
            if (!res
                ?.user)  return
                
            const newUser = {
                ...user,
                toots: res.user.toots,
                tootsGiven: res.user.tootsGiven
            }

            localStorage.setItem('LocalUser', JSON.stringify(newUser))
            setUser(newUser)
            setLiking(false)

        } catch (e) {
            setLiking(false)

            console.log('e: ', e);

        }
    }
    return {tootPost, isLiking}
}

export default useTootPost