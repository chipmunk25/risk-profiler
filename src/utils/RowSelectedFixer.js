
  const chipSelectedRowKeys=[]
  const chipSelectedRows=[]

  function selectCallbacks(selectedRowKeys = [], selectedRows = []) {
    setSelect({ selectedRowKeys, selectedRows });
    selectCallback(isSelectMore ? selectedRowKeys : selectedRowKeys[0], selectedRows);
  }
  
function onChipSelectAll(selected, selectedRows, changeRows) {
    let selectedRowKeysTemp = [...chipSelectedRowKeys];
    let selectedRowsTemp = [...chipSelectedRows];
    const changedKeys = changeRows.map(row => row[rowKey]);
 
    if (selected) {
   
      selectedRowKeysTemp = selectedRowKeysTemp.concat(
        changedKeys.filter(key => !selectedRowKeysTemp.includes(key)),
      );
      selectedRowsTemp = selectedRowsTemp.concat(
        changeRows.filter(row => !chipSelectedRowKeys.includes(row[rowKey])),
      );
      if (!checkMaxLength(selectedRowKeysTemp)) {
        return false;
      }
    } else {
      selectedRowKeysTemp = selectedRowKeysTemp.filter(key => !changedKeys.includes(key));
      selectedRowsTemp = selectedRowsTemp.filter(row => !changedKeys.includes(row[rowKey]));
    }
    selectCallbacks(selectedRowKeysTemp, selectedRowsTemp);
  }