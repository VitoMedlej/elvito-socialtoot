import useTootPost from "../../../Hooks/useTootPost";
import { User } from "../../../Types";
import Post from "../../Posts/Post";
import PostSkeleton from "../../Posts/PostSkeleton";

 export interface IPostsSection {
    isLoading: boolean;
    posts: any[];
    user : User ;
    
 }
const PostsSection = ({isLoading  ,posts,user}:IPostsSection) => {
    
const {tootPost, isLiking} = useTootPost()
const arrayUniqueByKey = [...new Map(posts.map((item) =>
    [item['_id'], item])).values()];
    console.log('arrayUniqueByKey: ', arrayUniqueByKey);
    
    return (
        <div>
            {isLoading &&  [1, 2, 3, 4].map(nb => {
                return <PostSkeleton key={nb}/>
            })}
            
            {!isLoading && posts
                ?.length > 0 && arrayUniqueByKey.map((post : any, i : number) => {
                    if (!post._id) return '';
                    return <Post
                        date={post.date}
                        postId={post._id}
                        currentUserId={user
                        ?._id}
                        
                        isLiking={isLiking}
                        posterId={post.userId}
                        onClick={tootPost}
                        userName={post.userName}
                        userImg={post.userImg}
                        postImg={post.postImg}
                        toots={post.toots}
                        text={post
                        ?.text}
                        key={i}/>
                })}
        </div>
    )
}

export default PostsSection