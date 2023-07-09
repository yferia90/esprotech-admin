const getDataTypeSelect = (path, data) => {
	let result = [];
	switch(path){
		case 'customer':
			result = data?.customers?.customers.map(item => {
	            return { name: `${item.firstName} ${item.lastName}`, id: item.id}
	        });
	        break;
	    case 'currency':
			result = data?.currencies?.currencies.map(item => {
	            return { name: `${item.simbol} : ${item.name}`, id: item.id}
	        });
	        break;
	     default:
	     	break;
	}
	return result;
}

export {
	getDataTypeSelect
}