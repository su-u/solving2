const CreateLabels = (n,m) =>{
    const diff = Math.abs(m-n);
    const diff_n = diff / 10.0;
    let labels = new Array();
    for (let i = 0; i < 11; i++) {
        labels.push(n + (diff_n * i) )
    }
    return labels;
};

let timer;
let i = 0;

const func = x =>{
    return Math.pow(x, 3.0) + x - 1.0;
};

let [centers, dotes] = nibun(0.0,1.0,func);

const labels = CreateLabels(-10,10);
const chartData = (center, dot1, dot2) =>{
    const labe = CreateLabels(dot1,dot2);
    let data = new Array();
    for (let j = 0; j < labe.length; j++) {
        data.push(func(labe[j]));
    }
    console.group("sec");
    console.log(labe);
    console.log(data);
    console.log(`center:${center}`);
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

const ManageLine = function () {
    ChartsDisplay(chartData(centers[i],dotes[i][0],dotes[i][1]));
    if (i >= labels.length) clearInterval(timer);
    i++;
};

const start = function () {
    i = 0;
    timer = setInterval("ManageLine()", 1000);
};
window.onload = function () {
    ChartsDisplay(chartData);
};

console.log(centers);
console.log(dotes);
console.log(labels);