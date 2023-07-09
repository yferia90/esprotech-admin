import { 
    getGroups,
    getGroup,
    deleteGroup,
    postGroup,
    updateGroup
} from '../api/Group.api';

const handlerListGroup = async ({ token, page, size }) => {
    const groups = await getGroups({ token, page, size });
    return groups?.groups;
}

const handlerGetGroupById = async ({ token, id }) => {
    const group = await getGroup({ token, id });
    return group?.group;
}

const handlerDeleteGroup = async ({ token, id }) => {
    const group = await deleteGroup({ token, id });
    return group?.data?.status;
}

const handlerPostGroup = async ({ token, formData }) => {
    const group = await postGroup({ token, formData });
    return group;
}

const handlerUpdateGroup = async ({ token, formData, id }) => {
    const group = await updateGroup({ token, formData, id });
    return group;
}

const GroupHandler = ({ token }) => ({
    handlerListGroup: ({ page, size }) => handlerListGroup({ token, page, size }),
    handlerDeleteGroup: ({ id }) => handlerDeleteGroup({ token, id }),
    handlerPostGroup: ({ formData }) => handlerPostGroup({ token, formData }),
    handlerGetGroupById: ({ id }) => handlerGetGroupById({ token, id }),
    handlerUpdateGroup: ({ formData, id }) => handlerUpdateGroup({ token, formData, id }),
});

export default GroupHandler;