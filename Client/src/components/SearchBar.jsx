import { useState } from "react";

export default function SearchBar({onSearch}) {
   const [id, setId] = useState("")
   const handlerChange = (event) => {
      setId(event.target.value)
   }
   return (
      <div>
         <input type='search' onChange={handlerChange} value={id}/>
         <button onClick={() => onSearch(id)}> Agregar </button>
      </div>
   );
}
