const copy = document.querySelector(".copy span");

copy.addEventListener("click", () => {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(copy);
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    selection.removeAllRanges();

    const original = copy.textContent;
    copy.textContent = "Copied!";
    copy.classList.add("success");

    setTimeout(() => {
      copy.textContent = original;
      copy.classList.remove("success");
    }, 1200);
  } catch (e) {
    const errorMsg = document.querySelector(".error-msg");
    errorMsg.classList.add("show");

    setTimeout(() => {
      errorMsg.classList.remove("show");
    }, 1200);
  }
});
