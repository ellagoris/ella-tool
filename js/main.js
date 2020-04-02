const db = firebase.firestore();
const canvas = new fabric.Canvas("c");

// canvas.add(rect);

document.querySelectorAll(".library img").forEach(el =>
  el.addEventListener("click", () => {
    fabric.Image.fromURL(el.src, function(img) {
      img.scale(0.2);
      img.set({ left: 100, top: 100 });
      // img.left = 0;
      // img.width = 100;
      canvas.add(img);
    });
    // const image = new fabric.Image(el, {
    //   left: 100,
    //   top: 100,
    //   width: 100,
    //   height: 100
    // });
    // canvas.add(image);
    // console.log(el);
  })
);

function onKeyDown(e) {
  if (e.key === "Delete") {
    canvas.remove(canvas.getActiveObject());
  }
}

function stripAssetURL(obj) {
  const index = obj.src.indexOf("/assets");
  obj.src = obj.src.substring(index);
}

async function onSave() {
  const data = JSON.parse(JSON.stringify(canvas));
  data.objects.forEach(obj => stripAssetURL(obj));
  console.log(data);
  data.title = prompt("Give Your Design a Name:");
  const result = await db.collection("designs").add(data);
  document.location = "/list.html";
  // console.log(result);
}

window.addEventListener("keydown", onKeyDown);
document.querySelector("#saveButton").addEventListener("click", onSave);
