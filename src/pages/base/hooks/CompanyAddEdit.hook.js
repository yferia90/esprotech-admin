import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyHandler from '../handlers/Company.handler';

const CompanyAddEditHook = ({ token, companies, setCompanies }) => {
    let { id } = useParams();
    const [company, setCompany] = useState([]);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [parent, setParent] = useState('');    
    const [idEdit, setIdEdit] = useState(1);
    const [saving, setSaving] = useState(false);    
    const [isDetailEdit, setDetailEdit] = useState(false);
    const [isAddDetail, setIsAddDetail] = useState(false);
    const [titleForm, setTitleForm] = useState('');
    const [addModal, setAddModal] = useState(true);
    const [newCompany, setNewCompany] = useState(false);    
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [errorAddCompany, setErrorAddCompany] = useState(false);
    const [addCompany, setAddCompany] = useState(false);
    const [warningCompany, setWarningCompany] = useState(false);
    const [requiredFiels] = useState(['name', 'code', 'email']);
    
    const { handlerPostCompany, handlerPutCompany, handlerGetCompanyById } = CompanyHandler({ token });

    const getAndSetDataCompany = async ({ id }) => {
        const { company } = await handlerGetCompanyById({ id });
        setName(company?.name || '');
        setCode(company?.code || '');
        setEmail(company?.email || '');
        setMobile(company?.mobile || '');
        setIdEdit(id);
    }

    const clearFields = () => {
        setName('');
        setCode('');
        setEmail('');
        setMobile('');
        setParent('');
    }

    const searchGetCompany = async () => {
        const { company, usersCompany } = await handlerGetCompanyById({ id });
        setCompany(company);
        setUsers(usersCompany);
    }

    const handlerCancelForm = () => {
        clearFields();
        setNewCompany(false);
    }

    const handlerClickEditCompany = ({ id, isDetail = false }) => {
        setTitleForm('Editar negocio');
        setNewCompany(true);
        setAddModal(false);
        if(isDetail) setDetailEdit(true);
        getAndSetDataCompany({ id });
    }

    const handlerClickAddCompany = ({ addDetail = false }) => {
        setTitleForm('Nuevo negocio');
        if(addDetail) setIsAddDetail(true);
        setAddModal(true);        
        setNewCompany(true);
    }

    const handlerSubmitFinall = () => {
        addModal 
            ? setMessageSuccess("El negocio ya está operativo") 
            : setMessageSuccess("El negocio fue modificado");
        setAddCompany(true);
        setNewCompany(false);
        clearFields();
        setTimeout(() => {
            setAddCompany(false);
        }, 5000);
    }

    const setsModalData = ({ _newCompany }) => {
        let allCompany = [];
        const SETERS = [
            {
                eval: addModal && !isAddDetail,
                fn: () => {
                    allCompany = companies.concat([_newCompany]);
                    setCompanies(allCompany);
                }
            },{
               eval: !addModal && !isDetailEdit && !isAddDetail,
                fn: () => {
                    allCompany = companies.filter(item => item.id !== _newCompany.id);
                    allCompany = allCompany.concat([_newCompany]);
                    setCompanies(allCompany);
                } 
            },
            {
               eval: isDetailEdit,
                fn: () => {
                    setCompany(_newCompany);
                    setDetailEdit(false);
                } 
            },
            {
               eval: isAddDetail,
                fn: () => {
                    setIsAddDetail(false);
                } 
            }
        ];        
        SETERS.forEach(item => {
            if(item.eval) item.fn();
        });
    }

    const handlerSubmitProcessData = ({ _newCompany }) => {
        setSaving(false);
        if (_newCompany === null) {
            setMessageError('Ups, vuelva a intentarlo');
            setErrorAddCompany(true);
            setTimeout(() => {
                setErrorAddCompany(false);
            }, 5000);
            return;
        }
        setsModalData({ _newCompany });
        handlerSubmitFinall();
    }

    const handlerSubmitForm = async () => {
        const payload = { name, code, email, mobile };
        const result = Object.keys(payload).filter(item => payload[item] === '' && requiredFiels.includes(item));
        if (result.length > 0) {
            setWarningCompany(true);
            setTimeout(() => {
                setWarningCompany(false);
            }, 5000);
            return;
        }
        setSaving(true);
        let _newCompany = (addModal || isAddDetail 
                ? await handlerPostCompany({ payload }) 
                : await handlerPutCompany({ payload, id: idEdit }));
        handlerSubmitProcessData({ _newCompany });
    }

    return {
        name, setName, code, setCode,
        email, setEmail, mobile,
        setMobile, parent, setParent,
        errorAddCompany, setErrorAddCompany,
        handlerSubmitForm, addCompany,
        setAddCompany, warningCompany,
        saving, handlerCancelForm,
        handlerClickAddCompany,
        titleForm, handlerClickEditCompany,
        messageSuccess, messageError,
        newCompany, company,
        users, searchGetCompany
    }
}

export default CompanyAddEditHook;