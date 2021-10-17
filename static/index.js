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
        };

        document.querySelectorAll('tr').forEach(tr=>{tr.remove()});           //remove all of the month before before creating a new one
        document.getElementById('plan').innerHTML = `
            <tr>                         <!-- tr row -->
                <th>MON</th>              <!-- th cell header -->
                <th>TUE</th>
                <th>WED</th>
                <th>THU</th>
                <th>FRI</th>
                <th>SAT</th>
                <th>SUN</th>
            </tr>`;

        for(let w of r.weeks){                                                 //loop to get weeks 
            let tr = document.createElement('tr');                             //create tr table rows
            for (let day of w){                                                //loop weeks to get days
                 //td.innerText = JSON.stringify(day);
                let td = document.createElement('td');                         //create td cells 
                td.innerText = day.whn.split('-')[2];                          //split froms whn position 2 to get days like 1 ,2 etc..
                //if (day.whn.split('-')[2] === '05'){                           // slit form whn position 2 to get every day 5
                //    td.classList.add('bad-day');                               //and let the class name as bad day 
                //}

                //show free seats 
                if(day.free == 0)                                              //if the free seat is 0
                {
                    td.classList.add('sold');                                  //give a class name sold to use in css
                }

                //dim months which are unrelated to viewing months
                if (day.whn.split('-')[1] != month)                      //dim unrelated months
                {
                    td.classList.add('dim-unrelated-month');
                }


                td.onclick = ()=>{
                    //document.getElementById('day').innerHTML = `Day ${day.whn}`;
                    fetch(`day/${day.whn}`)
                       .then(r=>r.json())
                       .then(r=>{
                        //    let div = document.createElement('div');
                        //    div.innerHTML = JSON.stringify(r);       //convert js object into JSON file
                        //    document.getElementById('day').append(div);

                            //show the selected seat
                            if (day.free !==0 )                                      //if free seats are not zero 
                            {
                                if(ava = document.querySelector('.arr-selected')){   //select css class 
                                    ava.classList.remove('arr-selected');          
                                };
                                td.classList.add('arr-selected');                 //create class to use in css
                            }
                        
                           document.getElementById('times').innerHTML="";
                           //create table cells (time available select) in right side
                           for(let val=0; val<r.availability.length; val++){
                            let timetr = document.createElement('tr');
                            let timetd = document.createElement('td');
                            let timetd2 = document.createElement('td');
                            let selc = document.createElement('button');
            
                            timetd.innerHTML = r.availability[val]["whn"].split("T")[1];   //get available times
                            timetd2.innerText = 'AVAILABLE';
                            selc.innerText = 'SELECT';

                            //to design things in css assign class
                            timetd.classList.add('timetd');
                            timetd2.classList.add('timetd2');
                            selc.classList.add('selc');

                            timetr.append(timetd);
                            timetr.append(timetd2);
                            timetr.append(selc);
                            document.getElementById('times').appendChild(timetr); 

                            selc.onclick = () =>{
                                //if input value is null do something 
                                adult = document.getElementById('adult').value;
                                child = document.getElementById('child').value;
                                time = r.availability[val]["whn"].split("T")[1];

                                if ((adult.length) == 0 && (child.length == 0)){      //if input NO is 0(no input) show alert
                                    alert ("Enter number of Adult or Child!!");
                                }
                                else if ((parseInt(adult) > 4)){                      //if adult input no is greater than 4
                                    alert ("Can't be greater then 4");
                                }
                                else if((parseInt(child) >4)){
                                    alert ("Can't be greater then 4")                 //if adult input no is greater than 4 
                                }
                                else if((parseInt(adult) < 0)){                       //if adult input no is less then 0 mean (negative vaules)
                                    alert ("Minus is invalid");
                                }
                                else if((parseInt(child) < 0)){                       //if adult input no is less then 0 mean (negative vaules)
                                    alert ("Minus is invalid");
                                }
                                                                //normally if the adult is 0 but the child no is empty it would go to booking page to prevent that from happening
                                else if ((parseInt(adult)==0) || (parseInt(child) == " ")){         //if the adult is 0 but the child no is empty show alert
                                    alert ("To buy ticket enter number.");
                                }
                                else if ((parseInt(adult)==" ") || (parseInt(child) == 0)){        //if the adult value is empty but the child no is 0 show alert
                                    alert ("To buy ticket enter number.");
                                }
                                
                                //normally if the adult is 0 but the child no is empty it would go to booking page to prevent that from happening
                                else if ((parseInt(adult)==0) || (parseInt(child) == " ")){         //if the adult is 0 but the child no is empty show alert
                                    alert ("To buy ticket enter number.");
                                }
                                else if ((parseInt(adult)==" ") || (parseInt(child) == 0)){        //if the adult value is empty but the child no is 0 show alert
                                    alert ("To buy ticket enter number.");
                                }

                                else if((parseInt(adult) == 0) && (parseInt(child) == 0)){     //if the value is 0
                                    alert ("Zero really! At least buy one ticket.");
                                }
                                else{                                   //check if all inputs are not empty with javascrip
                                    inputField = document.querySelectorAll("input");
                                    inputs = Array.from(inputField).filter (input => input.value !== " ");

                                    //purchase ticket calculation
                                    adultTicketprice = 80;
                                    childTicketprice = 40;
                                    ticketPrice = (adult * adultTicketprice) + (child * childTicketprice);

                                    window.location.href = "/ticket/?datetime="+day.whn+"&time="+time+"&adultTicket="+adult+"&childTicket="+child+"&ticketPrice="+ticketPrice;
                                };
                            };
                        }; 
                    })

                    //for right div time available and select                   
                    document.getElementById('da').innerHTML = `${new Date(day.whn).toUTCString().slice(0,3)}`   //day in right side div
                    document.getElementById('mn').innerText = r['month-name'];
                    document.getElementById('te').innerText = day.whn.split('-')[2];   //date beside month in right side div
                    document.getElementById('yn').innerText = r['month-year']; 
                    //document.getElementById('day-date').innerHTML = `${new Date(day.whn).toUTCString().slice(0,16)}`; //for date eg. Tue, 19 Oct 2021
                }

                tr.append(td);                                       //add cells(td) into rows(tr)

            }
            document.getElementById('plan').append(tr);             //add all the rows into div called plan
        }
    })
}

fillCalendarWithMonth(2021,10)                                      //call function 2021,10 is the current month and year to display first