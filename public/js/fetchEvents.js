const request = require('request')
const event_url = 'localhost:3000/fetchEvents'
const event = document.querySelector('#Events')
event.addEeventListener('click',()=>{
    request({url:event_url,json:true},(error,response)=>{
        var events = response.body
      })
     // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < events.length; i++) {
            for (var key in event[i]) {
                if (col.indexOf(key) === -1 && key=='data'){
                    col.push(key.key);
                }
                if(col.indexOf(key)===-1){
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < events.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if(col[j]=='amount'||'orderId'){
                    tabCell.innerHTML = events[i][data][col[j]];
                }
                tabCell.innerHTML = events[i][col[j]]
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
}
)
