import { Container, Form } from "./styles";
import { Input } from "../../Components/input";
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Button } from "../../Components/Button";
import { ButtonText } from "../../Components/ButtonText";
import { Background } from "./styles";
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from '../../services/api'




export function SignUp(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  
  const navigate = useNavigate()
  
    function handleSignUp(){
    if(!name || !email || !password ){
      return alert(response.data.message)
    }
    api.post("/users", { name, email, password }).then(()=>{
      console.log("sucesso");
      navigate("/")
      alert("usuario cadastrado com sucesso")}).catch(error => {
        if(error.response){
          return alert(error.response.data.message)
        } else {
          return alert ("Não foi possível cadastrar usuário")
        }
      });
 
     

    }

  return(
        <Container>
        <Background/>
          <Form>
            <h1>Rocket Notes</h1>
            <p>Aplicação para salvar e gerenciar seus links úteis.</p>
            <h2>Crie sua conta</h2>

            <Input 
            icon={FiUser}
            placeholder="Nome"
            type="text"
            onChange={e => setName(e.target.value)}/>

            <Input 
            icon={FiMail}
            placeholder="E-mail" 
            type="text"
            onChange={e => setEmail(e.target.value)}
            />

            <Input 
            icon={FiLock}
            placeholder="Senha" 
            type="password"
            onChange={e => setPassword(e.target.value)}/>

            <Button title="Cadastrar" onClick={handleSignUp}/>
            <Link to="/"><ButtonText title="Voltar para o login"/></Link>
           </Form>
        </Container>
    )
  }
