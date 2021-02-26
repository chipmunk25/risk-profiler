const GetSaveName = (parcel_status, columns) => {
    const items = columns && columns.find(item => parseInt(item.id) === parseInt(parcel_status));
    return items ? items.status_name : "Delivered"
}

export default GetSaveName;