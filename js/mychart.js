const CreateLabels = (n,m) =>{
    const diff = Math.abs(n - m);
    const diff_n = diff / 10;
    let labels = new Array();
    for (let i = 0; i < 11; i++) {
        labels.push(n + (diff_n * i) )
    }
    return labels;
};

let data = new Array();
let timer;
let i = 0;

const func = x =>{
    return Math.pow(x, 3.0) + x - 1.0;
};

let [centers, dotes] = nibun(0.0,1.0,func);

const labels = CreateLabels(-5,5);
for (let j = 0; j < labels.length; j++) {
    data.push(func(labels[j]));
}
const chartData = (data,center, dot1, dot2) =>{
    const labe = CreateLabels(dot1 - 1,dot2 + 1);
    console.log(labe);
    return  {
        labels: labe,
        datasets: [{
            type: "line",
            label: 'dot',
            data: [{x:dot1, y:0},{x:dot2,y:1}],
            backgroundColor: 'rgb(57,166,79)',
            pointRadius: 10,
        },{
            type: "line",
            label: 'center',
            data: [{x:center,y:-1}],
            backgroundColor: 'rgba(200, 100, 100, 1.0)',
            pointRadius: 10,
        },
        // {
        //     type: "line",
        //     label: 'line',
        //     data: data,
        //     backgroundColor: 'rgba(0, 0, 0, 0.0)',
        //     borderColor: 'rgba(60, 160, 220, 0.8)'
        // }
    ]}
};

const ManageLine = function () {
    ChartsDisplay(chartData(data,centers[i],dotes[i][0],dotes[i][1]));
    if (i >= labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    timer = setInterval("ManageLine()", 1000);
};
window.onload = function () {
    ChartsDisplay(chartData);
};

console.log(data);
console.log(centers);
console.log(dotes);
console.log(labels);