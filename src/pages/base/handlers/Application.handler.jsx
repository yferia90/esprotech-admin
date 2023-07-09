import { 
    getApplications,
    deleteApplication,
    postApplication,
    updateApplication,
    getApplication
} from '../api/Application.api';

const handlerListApplications = async ({ token, page, size }) => {
    const applications = await getApplications({ token, page, size });
    return applications?.applications;
}

const handlerDeleteApplication = async ({ token, id }) => {
    const application = await deleteApplication({ token, id });
    return application?.data?.status;
}

const handlerPostApplication = async ({ token, formData }) => {
    const application = await postApplication({ token, formData });
    return application;
}

const handlerGetApplicationById = async ({ token, id }) => {
    const application = await getApplication({ token, id });
    return application?.application;
}

const handlerUpdateApplication = async ({ token, formData, id }) => {
    const application = await updateApplication({ token, formData, id });
    return application;
}

const ApplicationHandler = ({ token }) => ({
    handlerListApplications: ({ page, size }) => handlerListApplications({ token, page, size }),
    handlerDeleteApplication: ({ id }) => handlerDeleteApplication({ token, id }),
    handlerPostApplication: ({ formData }) => handlerPostApplication({ token, formData }),
    handlerGetApplicationById: ({ id }) => handlerGetApplicationById({ token, id }),
    handlerUpdateApplication: ({ formData, id }) => handlerUpdateApplication({ token, formData, id }),
});

export default ApplicationHandler;