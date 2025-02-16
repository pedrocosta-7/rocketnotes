import { createContext, useContext } from "react";
import { useState } from "react";
import { api } from "../services/api";
import { useEffect } from "react";

export const AuthContext = createContext({})

function AuthProvider({children}) {
    const [data, setData] = useState({})
    /* ao fazer o login é armazenado nesse estado o usuario e o token*/

    async function signIn({email, password}){

        try {
           const response = await api.post("/sessions", {email, password});
           
           const {user, token} = response.data

           sessionStorage.setItem("@rocketnotes:user", JSON.stringify(user))
           sessionStorage.setItem("@rocketnotes:token", token)

           api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
           
           setData({user, token})
        } catch(error){
            if(error.response){
                alert(error.response.data.message)
            } else {
                alert("não foi possível entrar")
            }
        }
    }
    function signOut(){
        sessionStorage.removeItem("@rocketnotes:token");
        sessionStorage.removeItem("@rocketnotes:user");

        setData({})     
    }
    async function updateProfile({user, avatarFile}){
    try {

        if(avatarFile) {
            const fileUploadForm = new FormData();

            fileUploadForm.append("avatar", avatarFile);

            const response = await api.patch("/users/avatar", fileUploadForm)

            user.avatar = response.data.avatar
        }
        await api.put("/users", user);
        sessionStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        /* aqui ele pega o objeto user e atualiza o localStorage para os dados atualizados que vao
        passados em formato de objeto, e como o sessionStorage so recebe em string, por isso tem de 
        vir antes o JSON.stringify() */
        setData({user, token: data.token})
        alert("perfil atualizado") } catch(error) {
        if(error.response){
            alert(error.response.data.message)
        } else {
            alert("não foi possível entrar")
        }
    }
    }
    

    useEffect(()=> {
    
    const token = sessionStorage.getItem("@rocketnotes:token")
    const user = sessionStorage.getItem("@rocketnotes:user")

    if(token && user){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    

    setData({
        token,
        user: JSON.parse(user)
    })


    },[])

return (
    <AuthContext.Provider value={{
        signIn,
        signOut,
        updateProfile,
        user:data.user
        }}>
    {children}
    </AuthContext.Provider> 
)
}

function useAuth(){
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }