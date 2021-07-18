import {SiteClient} from 'datocms-client';
export default async function recebedorDeRequests(request, response){
    if (request.method==='POST'){
        const TOKEN='598c6fd53f41cc55d3609e4950c38f';
        const client =new SiteClient(TOKEN);

    //validar os dados antes de sair cadastrando 
       const registroCriado= await client.items.create({
            itemType:"974684", //ID modelo de comunidades criado pelo Dato
            ...request.body,
            //title:"Comunidade teste",
            //imageUrl:"https://github.com/IngridFCosta.png",
            //link:"https://github.com",
            //creatorSlug:"IngridFCosta"
    
        })

        response.json({
            dados:'Algum dadoshjsjajdj',
            registroCriado: registroCriado,
        })
        return;
} 
response.status(404).json({
    messsage:'Não aparece nada no GET, so no POST'
}) 
}
