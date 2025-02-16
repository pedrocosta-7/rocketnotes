import { Container } from "./styles";

export function ButtonText({ title, isActive = false, onClick}){
return(
    <Container 
     type="button"
     $isActive={isActive}
     onClick={onClick}>
       {title}
    </Container>
)
}


/*
$isActive={$isActive.toString()}
*/