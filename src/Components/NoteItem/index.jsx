import { FiPlus, FiX } from "react-icons/fi";

import { Container } from "./styles";

export function Noteitem({isNew, value, onClick, ...rest}){
  return(
    <Container isNew={isNew}>
      <input
      value={value}
      readOnly={!isNew}
      type="text"
      {...rest}
      ></input>
      <button className={isNew? 'button-add' : 'button-delete'}
      onClick={onClick}
      type="button"
      >
        {isNew? <FiPlus/> : <FiX/>}
      </button>
    </Container>

  )
}