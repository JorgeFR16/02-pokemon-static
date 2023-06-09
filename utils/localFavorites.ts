import { type } from "os";


const toggleFavorite = ( id: number ) => {
    
    let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]' );

    if ( favorites.includes(id)) {
        favorites = favorites.filter( pokeId => pokeId !== id );
    } else {
        favorites.push( id );
    }

    localStorage.setItem('favorites', JSON.stringify( favorites ));
}

const existInFavorites = ( id: number ): boolean => {

    // Da un problema si no se pone esta linea ya que corre el codigo de los dos lados (servidor y cliente)
    if ( typeof window === 'undefined' ) return false;

    const favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]' );

    return favorites.includes ( id );

}

const pokemons = (): number[] => {

    return JSON.parse( localStorage.getItem('favorites') || '[]' );

}

export default {
    existInFavorites,
    toggleFavorite,
    pokemons,
}