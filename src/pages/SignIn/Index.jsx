import { Container, Form } from "./styles"
import { Input } from "../../Components/input"
import { FiMail, FiLock } from 'react-icons/fi'
import { Button } from "../../Components/Button"
import { ButtonText } from "../../Components/ButtonText"
import { Background } from "./styles"
import { Link } from "react-router-dom"
import { api } from '../../services/api'
import  { useAuth } from "../../hooks/auth"
import { useState } from "react"

export function SignIn(){
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  
  const { signIn } = useAuth()
  
  function handleSignIn(){
    signIn({email, password})
  }

    return(
        <Container>
          <Form>
            <h1>Rocket Notes</h1>
            <p>Aplicação para salvar e gerenciar seus links úteis.</p>
            <h2>Faça seu login</h2>
            <Input
              icon={FiMail}
              placeholder="E-mail" 
              type="text"
              onChange = {e=> setEmail(e.target.value)}/>
            <Input 
              icon={FiLock} 
              placeholder="Senha" 
              type="password"
              onChange={e=> setPassword(e.target.value)}/>
            <Button title="Entrar" onClick={handleSignIn}/>
            <Link to="/register"><ButtonText title="Criar conta"/></Link>
           </Form>
           <Background/>
        </Container>
    )
}