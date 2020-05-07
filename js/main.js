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

async function onSaveGalerij() {
  const data = JSON.parse(JSON.stringify(canvas));
  data.objects.forEach(obj => stripAssetURL(obj));
  console.log(data);
  data.title = document.querySelector(".pop-up-input").value;
  const result = await db.collection("designs").add(data);
  document.location = "/list.html";
  // console.log(result);
}

function onShowPopUp() {
document.querySelector(".pop-up").style.display="flex";
}

function onHidePopUp() {
  document.querySelector(".pop-up").style.display="none";
  }

window.addEventListener("keydown", onKeyDown);
document.querySelector("#saveGalerij").addEventListener("click", onSaveGalerij);
document.querySelector("#saveButton").addEventListener("click", onShowPopUp);
document.querySelector(".pop-up-close").addEventListener("click", onHidePopUp);