const db = firebase.firestore();

function makeDesign(design) {
  const html = `
    <div class="title">${design.title}</div>
    <canvas width="800" height="600"></canvas>
  `;
  const div = document.createElement("div");
  document.querySelector(".designs").appendChild(div);
  div.className = "design";
  div.innerHTML = html;
  const canvas = new fabric.StaticCanvas(div.querySelector("canvas"));
  canvas.loadFromJSON(design);
}

async function main() {
  const snapshot = await db.collection("designs").get();
  snapshot.forEach(doc => {
    makeDesign(doc.data());
  });
}

main();
