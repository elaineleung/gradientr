const rgbaSelect = document.getElementById("rgbaselect");
const hexaSelect = document.getElementById("hexaselect");
const toRight = document.getElementById("toright");
const toBottom = document.getElementById("tobottom");
const bottomRight = document.getElementById("bottomright");
const bottomLeft = document.getElementById("bottomleft");

const codeInput = document.getElementById("code");
const body = document.getElementById("gradient");
const footer = document.querySelector(".footer-text");
// color palette here! colors for gradient pickrs defined here

let color1RGBA = "rgb(224, 83, 131)";
let color2RGBA = "rgb(0, 195, 255)";
let color1HEXA = "#E05383";
let color2HEXA = "#00C3FF";
let direction = "right";
let rgbaSelected = true;

const properties = {
  theme: "nano", // or 'monolith', or 'nano'
  defaultRepresentation: "RGBA",
  closeWithKey: "Escape",
  comparison: false,
  autoReposition: true,
  position: "bottom-middle",
  appClass: "color-class",
  swatches: [
    "rgb(244, 67, 54)",
    "rgb(233, 30, 99)",
    "rgb(156, 39, 176)",
    "rgb(103, 58, 183)",
    "rgb(63, 81, 181)",
    "rgb(33, 150, 243)",
    "rgb(3, 169, 244)",
    "rgb(0, 188, 212)",
    "rgb(0, 150, 136)",
    "rgb(76, 175, 80)",
    "rgb(139, 195, 74)",
    "rgb(205, 220, 57)",
    "rgb(255, 235, 59)",
    "rgb(255, 193, 7)"
  ],

  components: {
    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: false,
      cmyk: true,
      input: true,
      clear: true,
      save: false
    }
  }
};

const pickr1 = Pickr.create({
  ...properties,
  el: ".color-picker-1",
  default: color1RGBA
});
const pickr2 = Pickr.create({
  ...properties,
  el: ".color-picker-2",
  default: color2RGBA
});
const pickr3 = Pickr.create({
  ...properties,
  el: ".h1-color-picker",
  default: "#050303"
});
const pickr4 = Pickr.create({
  ...properties,
  el: ".text-color-picker",
  default: "#1b1919"
});

pickr1.on("change", (color, instance) => {
  color1RGBA = color.toRGBA().toString(0);
  color1HEXA = color.toHEXA().toString();
  createGradient();
});

pickr2.on("change", (color, instance) => {
  color2RGBA = color.toRGBA().toString(0);
  color2HEXA = color.toHEXA().toString();
  createGradient();
});

pickr3.on("change", (color, instance) => {
  document.querySelector(".title").style.color = color.toRGBA();
});

pickr4.on("change", (color, instance) => {
  document.querySelector(".hero-text").style.color = color.toRGBA();
  const footer = document.querySelectorAll(".footer-text");
  footer.forEach(ele => (ele.style.color = color.toRGBA()));
});

const createGradient = () => {
  body.style.background = `linear-gradient(to 
    ${direction}, ${color1RGBA}, ${color2RGBA})`;
  showCode();
};

const showCode = () => {
  if (rgbaSelect.classList.contains("is-selected")) {
    codeInput.textContent = `linear-gradient(to ${direction}, ${color1RGBA}, ${color2RGBA})`;
  } else if (hexaSelect.classList.contains("is-selected")) {
    codeInput.textContent = `linear-gradient(to ${direction}, ${color1HEXA}, ${color2HEXA})`;
  }
};

const selectRGBA = () => {
  rgbaSelected = true;
  highlightButtons();
};

const selectHEXA = () => {
  rgbaSelected = false;
  highlightButtons();
};

const selectHorizontal = () => {
  direction = "right";
  highlightButtons();
  createGradient();
};

const selectVertical = () => {
  direction = "bottom";
  highlightButtons();
  createGradient();
};

const selectDiagBottomRight = () => {
  direction = "bottom right";
  highlightButtons();
  createGradient();
};

const selectDiagBottomLeft = () => {
  direction = "bottom left";
  highlightButtons();
  createGradient();
};

const highlightButtons = () => {
  if (rgbaSelected === true && !rgbaSelect.classList.contains("is-selected")) {
    rgbaSelect.classList.add("is-selected", "is-info");
    hexaSelect.classList.remove("is-info", "is-selected");
    showCode();
  } else if (
    rgbaSelected === false &&
    !hexaSelect.classList.contains("is-selected")
  ) {
    hexaSelect.classList.add("is-selected", "is-info");
    rgbaSelect.classList.remove("is-info", "is-selected");
    showCode();
  }

  if (direction === "right" && !toRight.classList.contains("is-info")) {
    toRight.classList.add("is-selected", "is-info");
    if (toBottom.classList.contains("is-info")) {
      toBottom.classList.remove("is-info", "is-selected");
    } else if (bottomRight.classList.contains("is-info")) {
      bottomRight.classList.remove("is-info", "is-selected");
    } else {
      bottomLeft.classList.remove("is-info", "is-selected");
    }
    showCode();
  } else if (
    direction === "bottom" &&
    !toBottom.classList.contains("is-info")
  ) {
    toBottom.classList.add("is-selected", "is-info");
    if (toRight.classList.contains("is-info")) {
      toRight.classList.remove("is-info", "is-selected");
    } else if (bottomRight.classList.contains("is-info")) {
      bottomRight.classList.remove("is-info", "is-selected");
    } else {
      bottomLeft.classList.remove("is-info", "is-selected");
    }
    showCode();
  } else if (
    direction === "bottom right" &&
    !bottomRight.classList.contains("is-info")
  ) {
    bottomRight.classList.add("is-selected", "is-info");
    if (bottomLeft.classList.contains("is-info")) {
      bottomLeft.classList.remove("is-info", "is-selected");
    } else if (toRight.classList.contains("is-info")) {
      toRight.classList.remove("is-info", "is-selected");
    } else {
      toBottom.classList.remove("is-info", "is-selected");
    }
  } else if (
    direction === "bottom left" &&
    !bottomLeft.classList.contains("is-info")
  ) {
    bottomLeft.classList.add("is-selected", "is-info");
    if (bottomRight.classList.contains("is-info")) {
      bottomRight.classList.remove("is-info", "is-selected");
    } else if (toRight.classList.contains("is-info")) {
      toRight.classList.remove("is-info", "is-selected");
    } else {
      toBottom.classList.remove("is-info", "is-selected");
    }
  }
};

rgbaSelect.addEventListener("click", selectRGBA);
hexaSelect.addEventListener("click", selectHEXA);
toRight.addEventListener("click", selectHorizontal);
toBottom.addEventListener("click", selectVertical);
bottomRight.addEventListener("click", selectDiagBottomRight);
bottomLeft.addEventListener("click", selectDiagBottomLeft);
