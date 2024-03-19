import axios from "axios"
import { useState } from "react"
import Image from "next/image"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material"
import logoPokemon from "../../public/logoPokemon.png"

const options = [
  { value: "Pikachu", label: "Pikachu" },
  { value: "Gabite", label: "Gabite" },
  { value: "Raichu", label: "Raichu" },
  { value: "Bulbasaur", label: "Bulbasaur" },
  { value: "Charmander", label: "Charmander" },
  { value: "Charizard", label: "Charizard" },
  { value: "Butterfree", label: "Butterfree" },
  { value: "Gengar", label: "Gengar" },
  { value: "Zorua", label: "Zorua" },
  { value: "Mewtwo", label: "Mewtwo" }
]

export type PokemonType = {
  name: string;
  types: string[];
  image: string;
  weaknesses: string[];
}

export default function Home() {
  //pegar o valor do input
  //e compar verificar com o nome do pokemon
  //Puxar informacoes do pokemon do banco de dados e comparar no handleClick
  const [selectedPokemon, setSelectedPokemon] = useState(options[0].value)
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null)

  const handleSelect = (event: any) => {
    setSelectedPokemon(event.target.value)
  }
  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/${selectedPokemon}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao buscar os dados do Pokémon. Por favor, tente novamente mais tarde.');
    }
    console.log(selectedPokemon);
  };

  console.log(pokemonData);
  return (
    <section>
      <label className="flex  justify-center">
        <Image src={logoPokemon} alt="logo pokemon" width={200} height={200} />
      </label>
      <div className="flex  justify-center py-12 lg:px-8">
        <select
          value={selectedPokemon}
          onChange={handleSelect}
          className="w-2/4 h-14 border-0 py-1.5 pl-1 pr-20 text-slate-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-7 border rounded"
          aria-expanded="false"
          onClick={handleClick}
        >
          Enviar
        </button>
      </div>
      <div className="flex justify-center py-12 lg:px-8">
        {pokemonData && (
          <div
            className="max-w-2xl"
            style={{
              background: "#ffd130",
              width: "22rem",
              padding: "15px",
              borderRadius: "4%",
              border: "3px solid black"
            }}
          >
            <Card
              sx={{
                maxWidth: 340,
                height: 400,
                alignItems: "center",
                background: "#fff229"
              }}
            >
              <CardActionArea>
                <Typography gutterBottom variant="h5" component="div">
                  Pikachu
                </Typography>
                <CardMedia className="ml-12">
                  <Image
                    src={pokemonData.image}
                    alt={pokemonData?.name}
                    width={200}
                    height={200}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="h6"
                    color={"Black"}
                  >
                    Type
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    color={"Gray"}
                  >
                    {pokemonData?.types + " "}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="h6"
                    color={"Black"}
                  >
                    Weaknesses
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    color={"Gray"}
                  >
                    {pokemonData?.weaknesses + " "}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}