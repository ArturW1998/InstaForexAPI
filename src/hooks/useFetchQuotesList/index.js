import { useEffect, useReducer } from "react";
import { BASE_PATH, QUOTES_LIST, FIELDS_PARAM } from '../../constants/paths';
import dataFetchReducer, { initState } from '../../reducers/dataFetchReducer';
import { fetchInit, fetchFailure, fetchSuccess } from '../../actions';
import { encodeSeparatedFields, sortBySymbol } from "../../utils";

const useFetchQuotesList = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, initState);

    const fetchData = async () => {
        dispatch(fetchInit());

        try {
            const separatedFields = ['symbol', 'description', 'digits'];
            const encodedSeparatedFields = encodeSeparatedFields(separatedFields);

            const result = await fetch(`${BASE_PATH}${QUOTES_LIST}?${FIELDS_PARAM}${encodedSeparatedFields}`);
            const data = await result.json();

            const { quotesList = [] } = data;
            const sortedQuotesList = sortBySymbol(quotesList);

            dispatch(fetchSuccess(sortedQuotesList));
        } catch {
            dispatch(fetchFailure());
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return [state];
};

export default useFetchQuotesList;