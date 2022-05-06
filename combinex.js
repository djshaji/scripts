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
        .on('data', (data) => results.push(data))
        .on('end', () => {
            results.forEach(element => {
                formdata [element.rollno] = element
            });

        // console.log (formdata)

        for (d in data) {
            data [d]["email"] = formdata [d]["Email Address"]
            data [d]["phone"] = formdata[d]["Phone"]
        }

        fs.createReadStream(process.argv[4])
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(element => {
                    nama = element.firstname_text
                    if (element.middlename != '')
                        nama += ' ' + element.middlename ;
                    if (element.lastname_text != '')
                        nama += " " + element.lastname_text
                    if (element.fathername == null)
                        element.fathername = ''
                    element.fathername = element.fathername.toLowerCase ()
                    element.fathername = element.fathername.replace ("shri ", "")
                    element.fathername = element.fathername.replace (" ", "")
                    // console.log (element.fathername)
                    extdata [nama.toLowerCase() + '/' + element.fathername.toLowerCase()] = element
                    });

            // console.log (extdata)
            for (row in data) {
                r = data [row]
                _name = r.name + '/' + r.fathername.replace (" ", "")
                _name = _name.toLowerCase()
                if (r.email == undefined && extdata.hasOwnProperty (_name)) {
                    // console.log (r)
                    em = extdata [_name]["emailid_text"]
                    ph = extdata [_name]["mobile"]

                    if (em) {
                        r.email = em
                        // console.log (em)
                    }
                    if (ph)
                        r.phone = ph
                }

                
                // if (0)
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
});
