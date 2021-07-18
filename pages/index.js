import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from './src/components/MainGrid';
import Box from './src/components/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from './src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from './src/components/ProfileRelations';


function ProfileSideBar(propriedades){
  return(
    <Box as="aside">
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius:'8px'}}></img>
        <hr></hr>
        <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
        @{propriedades.githubUser}</a>
        </p>
        <hr></hr>
        <AlurakutProfileSidebarMenuDefault></AlurakutProfileSidebarMenuDefault>
      </Box>
  )
}
function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
      {propriedades.title}({propriedades.items.length})
      </h2>
    <ul>
      {propriedades.items.slice(0,6).map((item, index)=>{
        return (
          <li key={`key-${index}=${item}`}>
            <a href={`https://github.com/${item.login}`}>
            <img src={ `https://github.com/${item.login}.png`}></img>
            <span>{item.login}</span> 
            </a>
           
          </li>
        )
      })}
     </ul>

    </ProfileRelationsBoxWrapper>
  )
}
export default function Home(props) {
  const githubUser=props.githubUser;
  const [comunidades,setComunidades]=React.useState([{
      
}]);
  
  //console.log('Nosso teste',comunidades);
  const pessoasFavoritas=['juunegreiros','omariosouto','peas','rafaballerini','marcobrunodev','felipefialho']
  //Consumindo a API do github para trazer os seguidores
  const [seguidores, setSeguidores]=React.useState([]);
  //Consumindo a API do github para trazer pessoas seguidas
  const [seguindo, setSeguindo]=React.useState([]);

  React.useEffect(function(){
    //GET
    fetch(`https://api.github.com/users/${githubUser}/followers`)
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function (respostaCompleta) {
          setSeguidores(respostaCompleta);
        })
      
         
  function handleCriaSeguidores(e) {
    e.preventDefault();
    setSeguidores();
  }
  fetch(`https://api.github.com/users/${githubUser}/following?`)
        .then(function (respostaServidor) {
          return respostaServidor.json();
        })
        .then(function (respCompleta) {
          setSeguindo(respCompleta);
        })
   
        function handleSeguindo(e) {
          e.preventDefault();
          setSeguindo();
        }
  //API GraphQL  
  fetch('https://graphql.datocms.com/',{
    method:'POST',
    headers:{
      'Authorization':'0664a5284be626a6dde8e15d5770da',
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body:JSON.stringify({"query":`query{
      allCommunities{
        title
        id
        imageUrl
        link
        creatorSlug
      }
    }`})
  })
  .then((response)=> response.json())
  .then((respostaCompleta)=>{
    const comunidadesVindasDato=respostaCompleta.data.allCommunities;
    setComunidades(comunidadesVindasDato)
    console.log(comunidadesVindasDato)
  })


  },[])

  return( 
  <>
  <AlurakutMenu/>
  <MainGrid>
    <div className="profileArea" style={{gridArea:'profileArea'}}>
      <ProfileSideBar githubUser={githubUser}
      />
    </div>
    <div className="welcomeArea"  style={{gridArea:'welcomeArea'}}>
      <Box>
        <h1 className="title">
          Bem vinda, {githubUser}
        </h1>
        <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
      </Box>

      <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e){
            e.preventDefault();
            const dadosDoForm=new FormData(e.target);
            console.log('Campo:',dadosDoForm.get('title'));
            console.log('Campo:',dadosDoForm.get('image'));
            console.log('Campo:', dadosDoForm.get('link'));

            const comunidade={
              title:dadosDoForm.get('title'),
              imageUrl:dadosDoForm.get('image'),
              link:dadosDoForm.get('link'),
              creatorSlug:githubUser,
            }
            fetch('/api/comunidades',{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify(comunidade)
            })
            .then(async (response)=>{
              const dados=await response.json();
              console.log(dados.registroCriado);
              const comunidade=dados.registroCriado;
              const comunidadesAtualizadas=[...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);

            })
            
          }}>
            <div>
            <input placeholder="Qual vai ser o nome da sua comunidade?"
             name="title" 
             aria-label="Qual vai ser o nome da sua comunidade?"
            type="text">  
            </input>
            </div>
            <div>
            <input placeholder="Coloque uma url para usarmos de capa"
             name="image" 
             aria-label="Coloque uma url para usarmos de capa">   
            </input>
            </div>
            <div>
            <input placeholder="Coloque o link da sua comunidade"
             name="link" 
             aria-label="Coloque o link da sua comunidade">  
            </input>
            </div>
            <button>Criar comunidade</button>
          </form>
          
      </Box>
    </div>
    <div className="profileRelationsArea" style={{gridArea:'profileRelationsArea'}}>
    <ProfileRelationsBox title="Seguidores"  items={seguidores} githubUser={githubUser}
    />
    <ProfileRelationsBox title="Seguindo" items={seguindo} githubUser={githubUser}></ProfileRelationsBox>

    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
    <ul>
     {comunidades.map((itemAtual)=>{
       return (
         <li key={itemAtual.id}>
         <a href={`/users/${itemAtual.id}`}>
           <img src={itemAtual.imageUrl}></img>
           <span>{itemAtual.title}</span> 
           <a href={itemAtual.link}>
           a</a>
         </a> 
      </li>  
       )
     })}
     </ul>
    </ProfileRelationsBoxWrapper>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da Comunidade({pessoasFavoritas.length})
          </h2>
      <ul>
     {pessoasFavoritas.slice(0,6).map((itemAtual)=>{
       return (
         <li key={itemAtual}>
         <a href={`/users/${itemAtual}`}>
           <img src={`https://github.com/${itemAtual}.png`}></img>
           <span>{itemAtual}</span>
         </a> 
      </li>  
       )
     })}
     </ul>
     </ProfileRelationsBoxWrapper>
    </div>
  </MainGrid>
  </>
  )
}
export async function getServerSideProps(context){
  const cookies=nookies.get(context);
  const token=cookies.USER_TOKEN;
  const {isAuthenticated}= await fetch('https://alurakut.vercel.app/api/auth',{
    headers:{
      Authorization:token
    }
  })
  .then((resposta)=> resposta.json())
  console.log('isAuthenticated', isAuthenticated);
  if(!isAuthenticated){
    return {
      redirect:{
        destination:'/login',
        permanent:false,
      }
    }
  }
  const {githubUser}=jwt.decode(token);
  return {
    props:{
      githubUser
    },
  }
}