document.getElementById('fileInput').addEventListener('change', handleFile, false);
document.getElementById('generatePdf').addEventListener('click', generatePdf, false);

let excelData = [];

function handleFile(e) {
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        excelData = XLSX.utils.sheet_to_json(firstSheet, {header: 1});
    };
    reader.readAsArrayBuffer(f);
}

function generatePdf() {
    if (excelData.length === 0) {
        alert('Please upload an Excel file first.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    excelData.forEach((row, index) => {
        let rowString = row.join(' ');
        doc.text(rowString, 10, 10 + (index * 10));
    });

    doc.save('output.pdf');
}