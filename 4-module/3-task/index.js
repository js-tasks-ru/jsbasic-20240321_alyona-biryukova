function highlight(table) {
  const INDEX_CELLS_STATUS = 3;
  const INDEX_CELLS_GENDER = 2;
  const INDEX_CELLS_AGE = 1;

  for (let i = 1; i < table.rows.length; i++) {
    const currentRow = table.rows[i];

    const statusCell = currentRow.cells[INDEX_CELLS_STATUS];
    if (statusCell.hasAttribute("data-available")) {
      currentRow.classList.add(
        statusCell.dataset.available === "true" ? "available" : "unavailable"
      )
    } else {
      currentRow.hidden = true;
    }

    const genderCell = currentRow.cells[INDEX_CELLS_GENDER];
    currentRow.classList.add(genderCell.innerHTML === "m" ? "male" : "female");

    const ageCell = currentRow.cells[INDEX_CELLS_AGE];
    if (ageCell.innerHTML < 18) {
      currentRow.style.textDecoration = "line-through";
    }
  }
}
