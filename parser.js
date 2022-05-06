const parse= require ('node-html-parser');
const fs = require('fs');
fs.readFile(process.argv [2], 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const root = parse.parse(data);

    tr = root.querySelectorAll("tr");
    tr.forEach(element => {
        if (element.getElementsByTagName ("td").length < 8)
            return ;
               
        el = element.getElementsByTagName ("td")
        naam = el [1].innerHTML.split ("<br>")[0].replace ("<b>", "")

        fathernaam = el [1].innerHTML.split ("<br>")[1]
        if (fathernaam)
          fathernaam = fathernaam.split ("/")[0]
        else
          return
        if (naam == "Candidate Name ") return ;
        rollno = el [2].innerText.replace(/\s+/g, '');
        regno = el[3].innerText
        gender = el [4].innerText.split ("/") [0]
        if (gender == 'Univ') return
        cat = el [7].innerText.replace ("Open", "")
        doa = el [6].innerText.split ("\n")[1]

        console.log (naam + "," +fathernaam +',' + gender + ","+cat + ",J&K,Indian,,BA,"+rollno+",,")
        
    });
  });
  

