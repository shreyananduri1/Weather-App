const arr = ["batch 1", "batch 2", "batch 3"]
let index = 0;
function greetHello() {
        if(index === arr.length){
            index = 0
        }
        document.getElementById("greet").innerHTML = "Hi " + arr[index];
        index++;
}

// greetHello();