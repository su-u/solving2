const EPS = 0.0001; // constは定数の定義

const nibun = (a, b, func) => {
    let centers = [];
    let dotes = [];
    let count = 1;
    let c;
    do {
        dotes.push([a,b]);
        c = (a + b) / 2.0; // 2分計算
        if (func(c) * func(a) < 0) b = c;
        // 式(1.2)
        else a = c; // 式(1.3)
        dotes.push(c);
        count += 1;
    } while (Math.abs(a - b) > EPS); // 収束判別　式(1.4)の変形
    return [centers,dotes];
};

