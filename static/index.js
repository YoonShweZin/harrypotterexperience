function fillCalendarWithMonth(year,month)
{
    //get datas from json file
    fetch(`month/${year}-${month}`)                                           //month is from server.py 
    .then(r=>r.json())
    .then(r=>{
        document.getElementById('month-name').innerText = r['month-name'];    //month-name is one span  //get name from .json file 
        document.getElementById('month-year').innerText = r['month-year'];    //month-year is another two div   //get year from .json file
        
        document.getElementById('next').onclick = ()=>{                       //to go next month with this >
            if (month<12){                                                    //if month is less than 12
                fillCalendarWithMonth(year,month+1);                          //go to next month
            }else{
                fillCalendarWithMonth(year+1,1);                              //else go to next year
            }
        };

        document.getElementById('prev').onclick = ()=>{
            if (month>12){                                                   //if month is greater then 12
                fillCalendarWithMonth(year,month-1);                         //substract from month
            }else if (month == 1){                                           //if the month is equal to 1 (January)
                fillCalendarWithMonth(year-1,12);                            // go to previous year                         
            }else{                                           
                fillCalendarWithMonth (year, --month);
            }
        }

        document.querySelectorAll('tr').forEach(tr=>{tr.remove()});           //remove all of the month before before creating a new one
        document.getElementById('plan').innerHTML = `
            <tr>                         <!-- tr row -->
                <th>MO</th>              <!-- th cell header -->
                <th>TU</th>
                <th>WE</th>
                <th>TH</th>
                <th>FR</th>
                <th>SA</th>
                <th>SU</th>
            </tr>`;

        for(let w of r.weeks){                                                 //loop to get weeks 
            let tr = document.createElement('tr');                             //create tr table rows
            for (let day of w){                                                //loop weeks to get days
                let td = document.createElement('td');                         //create td cells 
                td.innerText = day.whn.split('-')[2];                          //split froms whn position 2 to get days like 1 ,2 etc..
                if (day.whn.split('-')[2] === '05'){                           // slit form whn position 2 to get every day 5
                    td.classList.add('bad-day');                               //and let it as bad day 
                }

                td.onclick = ()=>{
                    document.getElementById('day').innerHTML = `Day ${day.whn}`;
                    fetch(`day/${day.whn}`)
                       .then(r=>r.json())
                       .then(r=>{
                           let div = document.createElement('div');
                           div.innerHTML = JSON.stringify(r);       //convert js object into JSON file
                           document.getElementById('day').append(div);
                       })
                    document.getElementById('te').innerText = day.whn.split('-')[2];
                }

                tr.append(td);                                       //add cells(td) into rows(tr)

            }
            document.getElementById('plan').append(tr);             //add all the rows into div called plan
        }
            //for right div time available and select

            document.getElementById('mn').innerText = r['month-name'];
            document.getElementById('yn').innerText = r['month-year'];

    })
}

fillCalendarWithMonth(2021,10)                                      //call function 2021,10 is the current month and year to display first