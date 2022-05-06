const csv = require('csv-parser')
const fs = require('fs')
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
        data [element.rollno] = element
    });

    // console.log (data)

    fs.createReadStream(process.argv[3])
        .pipe(csv())
        .on('data', (data) => formResults.push(data))
        .on('end', () => {
            formResults.forEach(element => {
                formdata [element.rollno] = element
            });

        // console.log (formdata)

        for (d in data) {
            if (! formdata.hasOwnProperty (d))
                continue;
            if (data[d]["email"] == "" || data[d]["email"] == null)
                data [d]["email"] = formdata [d]["Email Address"]
            if (data[d]["phone"] == "")
                data [d]["phone"] = formdata[d]["Phone"]
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
