
import XLSX from 'xlsx'
/* 
import jsPDF from 'jspdf';
import 'jspdf-autotable'; */

const companyHeader = "HYPERBUILD Enterprise"
export const ExportToExcel = (data, columns) => {
    const filename = `${new Date().getTime()}.xlsx`
    let finalArray = [columns]
    let newArray = data.map(obj => Object.values(obj));
    finalArray.push(...newArray)
    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(finalArray)
    XLSX.utils.book_append_sheet(wb, wsAll, companyHeader)
    XLSX.writeFile(wb, filename)
}
/* 
export const exportToPDF = (data, columns) => {
    const filename = `${new Date().getTime()}.pdf`
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const headers = [columns];

    //  const data = this.state.people.map(elt=> [elt.name, elt.profession]);
    let newArray = data.map(obj => Object.values(obj));
    let content = {
        startY: 50,
        head: headers,
        body: newArray
    };

    doc.text(companyHeader, marginLeft, 40);
    doc.autoTable(content);
    doc.save(filename)
}

 */