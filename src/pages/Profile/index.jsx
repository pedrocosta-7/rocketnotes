import { Avatar, Container } from "./styles";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { Input } from "../../Components/input";
import { Button } from "../../Components/Button";
import { Form } from "./styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth"
import { api } from "../../services/api"
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from "react-router-dom";

export function Profile(){
    const { user, updateProfile} = useAuth()

     const [name, setName] = useState(user.name)
     const [email, setEmail] = useState(user.email)
     const [passwordOld, setPasswordOld] = useState("")
     const [passwordNew, setPasswordNew] = useState("")

     const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
     console.log(user)
     console.log(typeof(user))


     const [avatar, setAvatar] = useState(avatarUrl)
     const [avatarFile, setAvatarFile] = useState(null)


     async function handleUpdate(){
      const updated = {
        name,
        email,
        password: passwordNew,
        old_password: passwordOld
      }
      const userUpdated = Object.assign(user, updated)
      

     await updateProfile({user: userUpdated, avatarFile})
     }

     function handleChangeAvatar(event){
      const file = event.target.files[0];

      setAvatarFile(file)

      const imagePreview = URL.createObjectURL(file)

      setAvatar(imagePreview)

     }

     return(
        <Container>
        <header>
        <Link to="/" replace><FiArrowLeft/></Link>
        </header>
        <Avatar>
        <img 
        src={avatar}
        alt="Foto do usuario"/>
        <label htmlFor="avatar">
            <FiCamera/>
                <input
                  id="avatar"
                  type="file"
                  onChange={handleChangeAvatar}
                />
        </label>
        </Avatar>
        <Form>
        <Input 
        icon={FiUser}
        type="text"
        value={name}
        onChange={e=>setName(e.target.value)}/>
        <Input 
        icon={FiMail} 
        type="text" 
        value={email}
        onChange={e=>setEmail(e.target.value)}/>
        <Input 
        icon={FiLock}
        type="password"
        placeholder="Senha Atual"
        onChange={e=>setPasswordOld(e.target.value)}/>
        <Input 
        icon={FiLock} 
        type="password" 
        placeholder="Nova senha"
        onChange={e=>setPasswordNew(e.target.value)}/>
        <Button title="Salvar" onClick={handleUpdate}/>
        </Form>
        </Container>
     )
}