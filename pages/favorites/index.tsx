import { Layout } from "@/components/layouts";
import { NoFavorites } from "@/components/ui";
import { Container, Image, Text } from "@nextui-org/react";
import { useState } from "react";

export const FavoritesPage = () => {


  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  

  


  return (
    <Layout title='Pokémons - Favoritos'>

      <NoFavorites />

    </Layout>  
    )
}

export default FavoritesPage;
