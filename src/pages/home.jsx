import React, { useEffect, useState } from 'react'
import appwriteService, { Service } from '../appWrite/config'
import {Container, Postcard} from '../components'
import { useSelector } from 'react-redux'
function Home() {
    const [posts,setPosts] = useState([])
    const userStatus = useSelector((state)=>state.auth.status)
    useEffect(()=>{
        appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
    },[])
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow w-full py-8 flex items-center justify-center">
                {posts.length === 0 || !userStatus ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Log in to see posts
                        </h1>
                    </div>
                ) : (
                    <Container>
                        <div className="flex flex-wrap">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <Postcard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                )}
            </div>
        </div>
    );
}

export default Home
