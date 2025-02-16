import { Container, Brand, Menu, Search, Content, NewNote}  from "./styles"
import { Header } from "../../Components/Header"
import { ButtonText } from "../../Components/ButtonText"
import { FiPlus } from 'react-icons/fi'
import { Input } from "../../Components/input"
import { Note } from "../../Components/Note"
import { Section } from "../../Components/Section/index"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function Home(){
const [search, setSearch] = useState("")
const [tags, setTags] = useState([]);
const [tagsSelected, setTagsSelected] = useState([]);
const [notes, setNotes] = useState([])


const navigate = useNavigate()

function handleDetails(id){
  navigate(`/details/${id}`)
}

function handleTagsSelected(tagName){
    if(tagName==="all"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName)

    if(alreadySelected){
    const newTagsSelected = tagsSelected.filter(tag => tag !== tagName)
    setTagsSelected(newTagsSelected)
    } else {
      setTagsSelected(prevState=>[...prevState, tagName])
    }

}


useEffect(()=>{
  async function fetchTags(){
     const response = await api.get("/tags");
     setTags(response.data)
  }
  fetchTags()

}, []);

useEffect(()=>{
  async function fetchNotes(){
     const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
     setNotes(response.data);
  }
  fetchNotes()

}, [tagsSelected, search]);


return(
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header></Header>

      <Menu>
      <li>
      <ButtonText
      title = "Todos"
      onClick={()=>handleTagsSelected("all")}
      isActive={tagsSelected.length===0}
      ></ButtonText>

      </li>
      {
       tags && tags.map(tag=>(
        <li key={tag.id}>
          <ButtonText
          title = {tag.name}
          onClick={()=>handleTagsSelected(tag.name)}
          isActive={tagsSelected.includes(tag.name)}
          ></ButtonText>
        </li>
       ))
      }
      

      
      </Menu>

      <Search>
      <Input 
      placeholder="Pesquisar pelo título"
      onChange={e=>setSearch(e.target.value)}
      />
      </Search>

      <Content>
      <Section title="Minhas Notas"/>
      {
        notes.map(note => (
        <Note 
          key={String(note.id)}
          data={note}
          onClick={()=>handleDetails(note.id)}
          />
        ))
      }
      </Content>
      <NewNote to="/new">
      
      <FiPlus/>
      Criar Nota
      
      </NewNote>
    </Container>

)


}