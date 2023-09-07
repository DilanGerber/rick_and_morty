import Card from "./Card"
import { useSelector, useDispatch } from "react-redux"
import { filterCards, orderCards } from "../redux/actions"
import { useState } from "react"

const Favorites = () => {

    const [aux, setAux] = useState(false)

    const dispatch = useDispatch()

    const handlerOrder = (event) => {
        dispatch(orderCards(event.target.value))
        setAux(true)
    }

    const handlerFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    const myFavorites = useSelector(state => state.myFavorites)

    return (
        <div>
            <select onChange={handlerOrder}>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>

            <select onChange={handlerFilter}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">unknown</option>
                <option value="allCharacters">All Characters</option>
            </select>
        {
            myFavorites?.map(fav =>  {
                return (
                    <Card
                        key = {fav.id}
                        id={fav.id}
                        name={fav.name}
                        species={fav.species}
                        gender={fav.gender}
                        image={fav.image}
                    />
                )
            })
        }
        </div>
    )
}
// import { connect } from 'react-redux'

// const mapStateToProps = (state) => {
//     return {
//         myFavorites: state.myFavorites
//     }
// }

// export default connect(
//     mapStateToProps,
//     null
// )(Favorites)

export default Favorites

// ({id, name, species, gender, image})