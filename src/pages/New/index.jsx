import { Textarea } from "../../Components/Textarea";
import { Noteitem } from "../../Components/NoteItem";
import { Section } from "../../Components/Section"
import { Header } from "../../Components/Header";
import { Button } from "../../Components/Button"
import { Input } from "../../Components/input";
import { Container } from "./styles";
import { Form } from "./styles";
import { Link, Links } from "react-router-dom";
import {useState} from 'react'
import { TbUvIndex } from "react-icons/tb";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function New(){
   const [title, setTitle] = useState("")
   const [description, setDescription] = useState ("")

    const [links, setLinks] = useState([])
    const [newLink, setNewLink] = useState ("")

    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState ("")

    const navigate = useNavigate()

    async function handleAddNotes(){
    if(!title){
      return alert("Você não adicionou um titulo")
    }

    if(newLink){
      return alert("Você tem um link não adicionado! adicione ou deixe o campo vazio")
    }

    if(newTag){
      return alert("Você tem uma tag não adicionada! adicione ou deixe o campo vazio")
    }
    await api.post("/notes", {
      title,
      description,
      tags,
      links})

      alert("nota cadastrada")
      navigate("/")
    }

    function handleAddTag(){
      setTags((prevState)=>[...prevState, newTag])

      setNewTag("")
    }

    function handleAddLink(){
      setLinks((prevState)=>[...prevState, newLink])

      setNewLink("")
    }

    function handleRemoveLink(deleted){
      setLinks(prevState => prevState.filter(link=>link !== deleted))
    }

    function handleRemoveTag(deleted){
      setTags(prevState => prevState.filter(tag=>tag !== deleted))
    }


    return(
       <Container>
       <Header/>
       <main>
       <Form>
       <header>
       <h1>Criar Nota</h1>
       <Link to="/" replace>voltar</Link>
       </header>
       <Input
       placeholder="Título"
       onChange={e=>setTitle(e.target.value)     
       }
       ></Input>
       <Textarea
       onChange={e=>setDescription(e.target.value)}
       placeholder="Observações"/>
       <Section title="Links úteis">
      { 
      links.map((link, index)=>(
      <Noteitem 
      key={String(index)}
      value={link}
      onClick={()=>{handleRemoveLink(link)}}
         />
      ))
      
      }
      <Noteitem 
      isNew
      value={newLink}
      onClick={handleAddLink}
      onChange={e=>{setNewLink(e.target.value)}}
      placeholder="Novo link"
      />
       </Section>
       <Section title='Marcadores'>
        <div className="tags">
         {
         tags.map((tag,index)=>(
            <Noteitem
            key={String(index)}
            value={tag}
            onClick={()=>{handleRemoveTag(tag)}}
            />
         ))

         }
           
           <Noteitem
           isNew
           value={newTag}
           onChange={e=>{setNewTag(e.target.value)}}
           onClick={handleAddTag}/>
        </div>

       </Section>
            <Button
            title="Salvar"
            onClick={handleAddNotes}/>
       
       </Form>
       </main>
       </Container>
    )
}