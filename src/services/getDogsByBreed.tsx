import axios from "axios";
import { limitCount, urlApiDogs } from "../config/Variables";
import { DataPets, DataSearch } from "../interfaces/dataPets";

export const getDogsByBreed = async (breedSelect: string) => {
    try {
        const response = await axios.get(
            `${urlApiDogs}images/search?breed_ids=${breedSelect}&limit=${limitCount}`
        );
        return response.data;
    } catch (error) {
        console.log("Error en " + error);
    }
};

export const getDogsAllBreeds = async () => {
    try {
        const response = await axios.get(
            `${urlApiDogs}breeds?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const dataTransform = response.data.map((e: DataSearch) => ({
            id: e.id,
            name: e.name,
        }));
        return dataTransform;
    } catch (error) {
        console.log("Error en " + error);
    }
};

export const getDogsBreeds = async () => {
    try {
        const response = await axios.get(
            `${urlApiDogs}breeds?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const dataTransform = response.data.map((e: DataPets) => ({
            value: e.id,
            label: e.name,
        }));
        return dataTransform;
    } catch (error) {
        console.log("Error en " + error);
    }
};
export const getDogsBreedsById = async (id: string) => {
    if (id) {
        try {
            const response = await axios.get(
                `${urlApiDogs}breeds/${id}?api_key=${
                    import.meta.env.VITE_API_KEY
                }`
            );
            return response.data
        } catch (error) {
            console.log("Error en " + error);
        }
    }
};
