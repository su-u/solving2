const chartData = (center, dot1, dot2) =>{
    const labe = CreateLabels(dot1,dot2);
    let data = new Array();
    for (let j = 0; j < labe.length; j++) {
        data.push(func(labe[j]));
    }
    console.group("sec");
    console.log(labe);
    console.log(`dot1:${dot1}   dot2:${dot2}`);
    console.log(`center:${center},${func(center)}`);
    console.groupEnd();

    return  {
        labels: labe,
        datasets: [{
            type: "line",
            label: 'dot',
            data: [{x:dot1, y:func(dot1)},{x:dot2,y:func(dot2)}],
            borderColor: 'rgba(57,166,79, 0.8)',
            backdropColor:'rgba(0,0,0,0)',
            pointRadius: 10,
        },{
            type: "line",
            label: 'center',
            data: [{x:center,y:func(center)}],
            backgroundColor: 'rgba(200, 100, 100, 1.0)',
            pointRadius: 10,
        },
        {
            type: "line",
            label: 'line',
            data: data,
            backgroundColor: 'rgba(0, 0, 0, 0.0)',
            borderColor: 'rgba(60, 160, 220, 0.8)'
        }
    ]}
};

const func = x =>{
    return Math.pow(x, 3.0) + x - 1.0;
};

let timer;
let i = 0;


let [centers, dotes] = nibun(0.0,10.0,func);

const labels = CreateLabels(0.0,10.0);
const ManageLine = function () {
    ChartsDisplay(chartData(centers[i],dotes[i][0],dotes[i][1]));
    if (i >= labels.length) clearInterval(timer);
    i++;
};

const start = () =>{
    const table = document.getElementById("table-cal");
    for (let j = 0; j < centers.length; j++) {
        const row = table.insertRow( -1 );
        let cell1 = row.insertCell(-1);
        let cell2 = row.insertCell(-1);
        let cell3 = row.insertCell(-1);
        let cell4 = row.insertCell(-1);

        cell1.innerHTML = j + 1;
        cell2.innerHTML = dotes[j][0];
        cell3.innerHTML = centers[j];
        cell4.innerHTML = dotes[j][1];
    }

    i = 0;
    timer = setInterval("ManageLine()", 1000);
};

const reset = () =>{
    clearInterval(timer);
    const table = document.getElementById("table-cal");
    while( table.rows[ 1 ] ) table.deleteRow( 1 );
    ChartsDisplay(chartData);
};

window.onload = function () {
    ChartsDisplay(chartData);
};
