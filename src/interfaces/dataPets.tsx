/**
 ** INTERFACE GENERAL DE DATOS DE LAS MASCOTAS
 */
export interface InterfaceDataPets {
    id: number;
    age: number;
    breed: string;
    description: string;
    deworming: boolean;
    email: string;
    name: string;
    phone: number;
    photo: string;
    sex: string;
    sterilized: boolean;
    type: string;
    vaccinated: boolean;
    weight: number;
    adopted: boolean;
    adoptedPets?: number;
    size?: string;
    dataUserAdopted?: DataUserAdopted;
}
export interface InterfacePetsAvailables {
    id: number;
    name: string;
    type: string;
    sex: string;
    age: number;
    size?: string;
    photo: string;
    weight: number;
    vaccinated: boolean;
    deworming: boolean;
    sterilized: boolean;
    breed: string;
    email: string;
    phone: number;
    adopted: boolean;
    // available: boolean;
    description: string;
    adoptedPets?: number;
    dataUserAdopted?: DataUserAdopted;
}

interface DataUserAdopted {
    cell: string;
    name: string;
    picture: string;
    city: string;
    email: string;
    adoptedPets: number;
}

export interface DataRegistration {
    pets: InterfaceDataPets[];
    updateAdopted: boolean;
}

/**
 ** INTERFACE DE DATOS DE LAS MASCOTAS
 */

export interface DataSearch {
    id: string | null;
    name: string | null;
    breed_group: string | null;
}
export interface DataPets {
    id: string | null;
    name: string | null;
}

export interface Breed {
    id: string;
    name: string;
    url: string;
    detailsCats: DetailsCats;
}

export interface ItemMapSelected {
    id: string;
    url: string;
}

export interface dataUserAdopted {
    cell: string;
    name: string;
    picture: string;
    city: string;
    email: string;
}
export interface CardVisualizationProps {
    dataPets: InterfaceDataPets[];
}

export interface nameSelected {
    name: string;
    email: string;
}
/**
 ** INTERFACE DE ADOPCION DE MASCOTAS
 */

export interface DataAdoptionPet {
    petsAdopted: InterfaceDataPets[];
}


/**
 ** INTERFACE DE DETALLE DE MASCOTAS
 */
export interface DetailsCats {
    weight: Weight;
    id: string;
    name: string;
    cfa_url: string;
    vetstreet_url: string;
    vcahospitals_url: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    indoor: number;
    lap: number;
    alt_names: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    shedding_level: number;
    social_needs: number;
    stranger_friendly: number;
    vocalisation: number;
    experimental: number;
    hairless: number;
    natural: number;
    rare: number;
    rex: number;
    suppressed_tail: number;
    short_legs: number;
    wikipedia_url: string;
    hypoallergenic: number;
    reference_image_id: string;
    breed?: Breed;
}

interface Weight {
    imperial: string;
    metric: string;
}

export interface DetailsDogs {
    id: number;
    name: string;
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    reference_image_id: string;
    description: string;
    weight: Weight;
    height: Weight;
}

export interface DetailsCats {
    weight: Weight;
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    country_code: string;
    description: string;
    life_span: string;
    adaptability: number;
    affection_level: number;
    child_friendly: number;
    grooming: number;
    health_issues: number;
    intelligence: number;
    stranger_friendly: number;
}