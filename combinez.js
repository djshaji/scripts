const csv = require('csv-parser')
const fs = require('fs')
var stringSimilarity = require("string-similarity");

const results = [];
const formResults = [];
data = {}
formdata = {}
extdata = {}

fs.createReadStream(process.argv[2])
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // console.log(results);
    results.forEach(element => {
        _name = element.name + '/' +element.fathername
        _name = _name .toLowerCase ().replaceAll (" ", "")
        data [_name] = element
    });

    // console.log (data)

    fs.createReadStream(process.argv[3])
        .pipe(csv())
        .on('data', (data) => formResults.push(data))
        .on('end', () => {
            formResults.forEach(element => {
                _name = element.name + '/' +element.fathername
                _name = _name .toLowerCase ().replaceAll (" ", "")
                formdata [_name] = element
            });

        // console.log (formdata)

        for (d in data) {           
           for (fd in formdata) {
                similarity = stringSimilarity.compareTwoStrings(d, fd);
                // console.log (d + " " + fd + ": " + similarity)

                if (similarity> .9) {
                    data [d]["email"] = formdata [fd]["email"]
                    data [d]["phone"] = formdata[fd]["phone"]
                    break ;
                }
            }
            
            continue ;
            if (! formdata.hasOwnProperty (d)) {
                // console.log ("no " + d + " in formdata")
                continue;
            } 

            // if (data[d]["email"] == "" || data[d]["email"] == null)
                data [d]["email"] = formdata [d]["email"]
            // if (data[d]["phone"] == "")
                data [d]["phone"] = formdata[d]["mobile"]
            // console.log (d)
        }

        
        // console.log (formdata)

        if (1)
            for (d in data) {
                r = data [d]
                console.log (
                    r ["name"] + "," +
                    r ["fathername"] + "," +
                    r["gender"] + "," +
                    r["category"]+ "," +
                    r["state"]+ "," +
                    "Indian," +
                    r["email"]+ "," +
                    r["phone"]+ "," +
                    r["rollno"]
                ) 
        }
    });
});
