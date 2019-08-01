const getFunc = () =>{
    const func1 = x =>{
        return Math.pow(x, 3.0) + x - 1.0;
};
    const func2 = x =>{
        return Math.pow(x, 3.0) + x - 10.0;
    };

    const funcs = [func1, func1, func2];
    return funcs[getSelectNum()];
};

const getRange = () =>{
    const num = getSelectNum();
    const range = [[-10.0,10.0],[-10.0,0.0],[-10.0,10.0]];
    console.log(range[num]);
    return [range[num][0], range[num][1]];
};

const baseLine = (min, max, func) =>{
    if(min > max) throw new RangeError("minが小さい必要あり");
    let data = [];
    console.log(min,max);
    for (let j = min; j < max; j+= 0.01) {
        data.push({x:j,y:func(j)});
    }
    console.log(data);
    return data;
};

const createChart = (min, max, func, center, dot1, dot2) => {
    return new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        zoomType: "xy",
        exportEnabled: true,
        title: {
            text: "Frequency Response of Low Pass Filters"
        },
        subtitles:[{
            text: "X Axis scale is Logarithmic",
            fontSize: 14
        }],
        axisX: {
            title: "X",
        },
        axisY: {
            title: "Y",
            titleFontColor: "#4F81BC",
            labelFontColor: "#4F81BC"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor:"pointer",
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            name: "func",
            dataPoints: baseLine(min, max, func)
            }, {
            type: "line",
            name: "X",
            showInLegend: true,
            dataPoints: [
                {x:dot1,y:func(dot1)},
                {x:dot2, y:func(dot2)}]
            }, {
            type: "line",
            name: "Center",
            color: "#39a64f",
            showInLegend: true,
            dataPoints: [
                {x:center,y:func(center)}]
        }]
    });
};


let timer;
let i = 0;
let chart;

const [range1, range2] = getRange();
const [centers, dotes] = nibun(range1, range2, getFunc());

const labels = CreateLabels(0.0,10.0);
const ManageLine = function () {
    chart = createChart(range1, range2, getFunc(), centers[i], dotes[i][0], dotes[i][1]);
    chart.render();
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
};

function toogleDataSeries(e){
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else{
        e.dataSeries.visible = true;
    }
    chart.render();
}


window.onload =()=> {
    createChart(-10.0, 10.0, getFunc()).render();
};