import React from 'react';
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
export default function Home() {
  const githubUser='IngridFCosta';
  const [comunidades,setComunidades]=React.useState([{
    id:'12272676716767636',
    title:'Eu odeio acordar cedo',
    image:'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link:'https://www.pexels.com/pt-br/'  
}]);
  
  //console.log('Nosso teste',comunidades);
  const pessoasFavoritas=['juunegreiros','omariosouto','peas','rafaballerini','marcobrunodev','felipefialho']
  return( 
  <>
  <AlurakutMenu/>
  <MainGrid>
    <div className="profileArea" style={{gridArea:'profileArea'}}>
      <ProfileSideBar githubUser={githubUser}/>
    </div>
    <div className="welcomeArea"  style={{gridArea:'welcomeArea'}}>
      <Box>
        <h1 className="title">
          Bem vinda,{githubUser}
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
              id:new Date().toISOString(),
              title:dadosDoForm.get('title'),
              image:dadosDoForm.get('image'),
              link:dadosDoForm.get('link'),
            }
            const comunidadesAtualizadas=[...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);

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
    <ProfileRelationsBoxWrapper>
    <ul>
     {comunidades.map((itemAtual)=>{
       return (
         <li key={itemAtual.id}>
         <a href={`/users/${itemAtual.title}`}>
           <img src={itemAtual.image}></img>
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
     {pessoasFavoritas.map((itemAtual)=>{
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
