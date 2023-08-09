import { parse } from 'csv';

export const readCsvFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (!event.target || !event.target?.result) {
          reject("No Data");
          return;
        }
  
        console.log("csv text: ", event.target.result.toString());
  
        parse(event.target.result.toString().trim(), { columns: true }, (err, data) => {
          if (err) {
            console.error("Failed to read file", err);
          
            reject(err);
          }
  
          resolve(data);
        });
      };
      reader.readAsText(file);
    });
};