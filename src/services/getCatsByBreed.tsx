import axios from "axios";
import {
    limitCount,
    urlApiCat,
    urlCatAllBreeds,
    urlCatBreedsById,
} from "../config/Variables";
import { DataPets } from "../interfaces/dataPets";

export const getCatsByBreed = async (breedSelect: string) => {
  try {
    const response = await axios.get(
      `${urlApiCat}images/search?breed_ids=${breedSelect}&limit=${limitCount}&api_key=${import.meta.env.VITE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log("Error en ApiCats" + error);
  }
};



export const getCatsAllBreed = async ()=>{
  try {
    const response = await axios.get(
      `${urlCatAllBreeds}breeds?api_key=${import.meta.env.VITE_API_KEY}`
    );
      return response.data;
    } catch (error) {
      console.log("Error en ApiCats" + error);
      }
}

// console.log(getCatsAllBreed())

export const getBreedCats = async ()=>{
  try {
    const response = await axios.get(
      `${urlCatAllBreeds}breeds?api_key=${import.meta.env.VITE_API_KEY}`
    )
    const resp = response.data;   
    return resp.map((e: DataPets) =>({
      value: e.id,
      label: e.name
    }));
  } catch(error){
    console.error();
    
  }  
}

export const getDetailsBreedCats = async (id: string)=>{
  try {
    const response = await axios.get(
        `${urlCatBreedsById}/${id}?api_key=${
            import.meta.env.VITE_API_KEY
        }`
    );
    const resp = response.data;   
    return resp;
    
  } catch(error){
    console.error();
    
  }  
}

