import {useState} from "react";
import "./search.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions} from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = inputValue => {
        return fetch(
                `${ GEO_API_URL }/cities?namePrefix=${ inputValue }`,
                geoApiOptions
            )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    const handleOneChange = searchData => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            className = "weather__input"
            placeholder = "Search for city"
            debounceTimeout = { 600 }
            value = { search }
            onChange = { handleOneChange }
            loadOptions = { loadOptions }
        />
    )
}

export default Search;