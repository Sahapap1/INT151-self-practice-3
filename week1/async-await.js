async function delay(ms) {
    return new Promise((resolve, reject) => {
        console.log('waiting....');
        setTimeout(() => {
            resolve(); // แจ้งว่าเสร็จแล้ว
        }, ms);
    })
}

await delay(2000)
console.log("2 seconds passed!")


function step1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 1 done");
            resolve();
        }, 1000)
    })
}

function step2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 2 done");
            resolve();
        }, 1000)
    })
}

function step3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Step 3 done");
            resolve();
        }, 1000)
    })
}

step1()
    .then(step2)
    .then(step3)
    .then(() => console.log("All steps complete!"))