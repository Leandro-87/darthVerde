import ForcarAutenticacao from "../component/auth/ForcarAutenticacao"
import Layout from "../component/template/Layout"
import { useEffect , useState } from "react"
import PostBox from '../component/template/PostBox'
import firebase from '../services/firebaseConnection'
import { useRouter } from "next/router"

export default function Perfil(){

  const [posts, setPosts] = useState([])
  const router = useRouter()
  
  useEffect(() => {
    firebase.firestore().collection('posts').onSnapshot((snapshot)=>{
        let lista = [];
        //console.log(snapshot, 'oooooo');
        snapshot.forEach((doc)=>{
            lista.push({
                id: doc.id,
                created: doc.data().created,
                createdFormated: new Date().toLocaleDateString('pt-BR'),
                titulo: doc.data().titulo,
                mensagem: doc.data().mensagem,
                userId: doc.data().userId,
                userName: doc.data().userName,
                userImg: doc.data().userImg
            })
        })
        setPosts(lista)
        //console.log(lista)
    })
},[router])

return (
  <ForcarAutenticacao>
  
    <Layout title='Perfil do usuario'>

          
        {posts.map((post, index)=>{
            return(
                <PostBox mid userImage={post.userImg} userName={post.userName} key={index} post={post} tituloMensagem={post.titulo} mensagem={post.mensagem} url={`/post/${post.id}`}/>

            )
        })}

        

      
      </Layout>
    </ForcarAutenticacao>
  )
}