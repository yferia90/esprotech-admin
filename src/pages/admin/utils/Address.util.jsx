import _ from 'lodash';

const getFullAddressJson = ({ fullAddress }) => {
	return !_.isNil(fullAddress) ? JSON.parse(fullAddress) : {};
}

const getStreet = async ({ fullAddress }) => {
	const fullAddressJson = await getFullAddressJson({ fullAddress });
	return fullAddressJson?.street;
}

const getCountry = async ({ fullAddress }) => {
	const fullAddressJson = await getFullAddressJson({ fullAddress });
	return fullAddressJson?.countryId;
}

const getState = async ({ fullAddress }) => {
	const fullAddressJson = await getFullAddressJson({ fullAddress });
	return fullAddressJson?.stateId;
}

export {
	getStreet,
	getCountry,
	getState
}