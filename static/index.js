function fillCalendarWithMonth(year,month){
    fetch(`month/${year}-${month}`)
    .then(r=>r.json())
    .then(r=>{
        document.getElementById('month-name').innerText = r['month-name'];
        document.getElementById('month-year').innerText = r['month-year'];
        document.getElementById('next').onclick = ()=>{
            if (month<12){
                fillCalendarWithMonth(year,month+1);
            }else{
                fillCalendarWithMonth(year+1,1);
            }
        };
        document.getElementById('prev').onclick = ()=>{
            //What should we do if month == 1
            fillCalendarWithMonth(year,month-1);
        };
        document.querySelectorAll('tr').forEach(tr=>{tr.remove()});
        document.getElementById('plan').innerHTML = `
            <tr>
                <th>MO</th>
                <th>TU</th>
                <th>WE</th>
                <th>TH</th>
                <th>FR</th>
                <th>SA</th>
                <th>SU</th>
            </tr>`;
        for(let w of r.weeks){
            let tr = document.createElement('tr');
            for (let day of w){
                let td = document.createElement('td');
                td.innerText = day.whn.split('-')[2];
                if (day.whn.split('-')[2] === '05'){
                    td.classList.add('bad-day');
                }
                td.onclick = ()=>{
                    document.getElementById('day').innerHTML = `Day ${day.whn}`;
                    fetch(`day/${day.whn}`)
                       .then(r=>r.json())
                       .then(r=>{
                           let div = document.createElement('div');
                           div.innerHTML = JSON.stringify(r);
                           document.getElementById('day').append(div);
                       })
                }
                tr.append(td);
            }
            document.getElementById('plan').append(tr);
        }
    })
}

fillCalendarWithMonth(2021,10)