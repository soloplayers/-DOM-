let div = dom.create("<strong>重要内容</strong>");
let div1 = dom.create("div");
let em = document.querySelector("#empty1");
let text = document.querySelector(".text");
let body = document.body;
let t1 = dom.find(".t2")[0];

console.log(e);

div1.style.border = "1px solid red";
body.appendChild(div);
body.appendChild(div1);
dom.style(text, { border: "1px solid red" });
console.log(dom.empty(em));
console.log(dom.index(t1));
