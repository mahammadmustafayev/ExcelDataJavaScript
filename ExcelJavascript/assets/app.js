document.getElementById('fileInput').addEventListener('change',handle,false);


function handle(e) {
    var files= e.target.files, f=files[0];
    var reader= new FileReader();
    reader.onload=function (e) {
        var data  = new Uint8Array(e.target.result);
        var workbook=XLSX.read(data,{type:'array'});

        var firstSheet=workbook.Sheets[workbook.SheetNames[0]];
        var excelRows=XLSX.utils.sheet_to_json(firstSheet, {header: 1});

        document.getElementById('output').textContent = JSON.stringify(excelRows, null, 2);
    };
    reader.readAsArrayBuffer(f);
}