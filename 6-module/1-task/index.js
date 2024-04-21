/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }

  #templateHead() {
    return `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    `;
  }

  #renderBody() {
    const body = document.createElement("tbody");
    body.append(...this.#renderRows());
    return body;
  }

  #renderRows() {
    return this.#rows.map((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.salary}</td>
            <td>${row.city}</td>
      `;

      const td = document.createElement("td");
      td.append(this.#renderButton());
      tr.append(td);

      return tr;
    });
  }

  #renderButton() {
    const button = document.createElement("button");
    button.addEventListener("click", this.#buttonClick, { once: true });
    button.textContent = "X";
    return button;
  }

  #buttonClick() {
    this.closest("tr").remove();
  }

  #render() {
    this.elem = document.createElement("table");
    this.elem.innerHTML = this.#templateHead();
    this.elem.append(this.#renderBody());

    return this.elem;
  }
}
