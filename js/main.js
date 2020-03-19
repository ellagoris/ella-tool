const canvas = new fabric.Canvas("c");

// canvas.add(rect);

Array.from(document.querySelectorAll(".library img")).forEach(el =>
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

window.addEventListener("keydown", onKeyDown);
