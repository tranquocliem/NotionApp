// // let arrEmoji = ["🎁", "🎄", "🎉", "🎀", "🌈", "❤"];
// let arrEmoji = ["❄", "❊", "✽"];
// document.addEventListener("mousemove", function (e) {
//   let body = document.querySelector("body");
//   let emoji = document.createElement("span");
//   let x = e.offsetX;
//   let y = e.offsetY;

//   emoji.style.left = x + "px";
//   emoji.style.top = y + "px";
//   emoji.setAttribute("class", "emojimouse");

//   let icon = arrEmoji[Math.floor(Math.random() * arrEmoji.length)];
//   emoji.innerText = icon;

//   let size = Math.random() * 30;
//   emoji.style.fontSize = 5 + size + "px";

//   let max = 0;
//   let min = 0;
//   let randomValue = Math.floor(Math.random() * (max + 1 - min) + min);
//   emoji.style.transform = "translateX(" + randomValue + "px)";

//   body.appendChild(emoji);

//   setTimeout(() => {
//     emoji.remove();
//   }, 1000);
// });
