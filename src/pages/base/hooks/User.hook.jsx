import { useState, useEffect } from 'react';
import _ from "lodash";
import UserHandler from '../handlers/User.handler';
import { range } from '../../../utils/utils';

const UserHook = ({ token }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    // Estados del paginado
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [rangePaginator, setRangePaginator] = useState([]);
    const { handlerListUsers } = UserHandler({ token });
    
    const searchListUsers = async () => {
        const allUsers = await handlerListUsers({ page, size });
        if(!_.isNil(allUsers)){
            setUsers(allUsers?.users);
            setCurrentPage(allUsers?.currentPage);
            setTotalItems(allUsers?.totalItems);
            setTotalPages(allUsers?.totalPages);
            setRangePaginator(range(1, allUsers?.totalPages));
            setIsLoadingUsers(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        document.title = 'Listado de usuarios';
        searchListUsers();
    }, [])

    useEffect(() => {
        if(isLoadingUsers){
            handlerListUsers();
        }
    },[isLoadingUsers, page]);

    return {
        users, loading, totalPages, isLoadingUsers, 
        page, setPage, rangePaginator,
        setIsLoadingUsers, currentPage
    }
}

export default UserHook;