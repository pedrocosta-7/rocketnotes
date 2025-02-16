import { Container, Profile, Logout } from "./styles"
import { RiShutDownLine } from "react-icons/ri"
import {useAuth} from "../../hooks/auth"
import {api} from '../../services/api'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from "react-router-dom"

export function Header(){
    const {signOut, user} = useAuth()
    
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    const navigate = useNavigate()
    
    function handleSignOut(){
    navigate("/")
    signOut()
    }
    return(
        <Container>
            <Profile to="/profile">
             <img
             src={avatarUrl}
             alt="Foto do usuario"
             />
             <div>
                <span>Bem-Vindo</span>
                <strong>{user?.name || "Carregando..."}</strong>
            </div>
            </Profile>
            <Logout>
                <RiShutDownLine onClick={handleSignOut}/>
            </Logout>
        </Container>
    )
}