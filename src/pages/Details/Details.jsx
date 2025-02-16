import { Container, Links, Content} from "./styles";
import { Header } from "../../Components/Header/index"
import { Button } from "../../Components/Button"
import { Section } from "../../Components/Section";
import { Tag } from "../../Components/tag";
import { ButtonText } from "../../Components/ButtonText";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export function Details(){
  const params = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState(null)

  async function handleDeleteNote(){
    const confirm = window.confirm("deseja realmente deletar esta nota?")
    if(confirm){
      await api.delete(`/notes/${params.id}`)
    navigate(-1)

    }
    
  }

  function handleHome(){
    navigate(-1)
  }

  useEffect(()=>{
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNotes()
     
  },[])
  return(
    <Container>
          <Header/>
{
  data &&
          <main>
          <Content>
          <ButtonText 
          title="Excluir Nota"
          onClick={handleDeleteNote}
          />
          <h1>{data.title}</h1>
          <p>
          {data.description}
          </p>
  {
          data.links &&
          <Section title="Links úteis">
          <Links>
          {
          data.links.map(link=>{
          return <li key={String(link.id)}>
            <a href={link.url} target="_blank">
              {link.url}
            </a>
          </li>
          })


          }

          </Links>
          </Section>
  }
          
    {
          data.tags &&
          <Section title="Marcadores">
          { 
            data.tags.map(tag=>{
              return <Tag
               key={String(tag.id)}
               title={tag.name}
               />
            })}
          

          </Section>
    }
          <Button 
          onClick={handleHome}
          title="Voltar"
          />
          </Content>
          </main>
}
    </Container>
  )
}