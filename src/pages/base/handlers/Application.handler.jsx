import { 
    getApplications,
    deleteApplication,
    postApplication
} from '../api/Application.api';

const handlerListApplications = async ({ token }) => {
    const applications = await getApplications({ token });
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

const ApplicationHandler = ({ token }) => ({
    handlerListApplications: () => handlerListApplications({ token }),
    handlerDeleteApplication: ({ id }) => handlerDeleteApplication({ token, id }),
    handlerPostApplication: ({ formData }) => handlerPostApplication({ token, formData }),
});

export default ApplicationHandler;