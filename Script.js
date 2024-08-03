document.addEventListener("DOMContentLoaded", function () {
  const addnew = document.getElementById("AddNew");
  const saveI = document.getElementById("saveI");
  const cancelI2 = document.getElementById("CancelI2");
  const UpdateI = document.getElementById("UpdateI");
  const body = document.body;

  body.classList.add("activeIndex");

  addnew.addEventListener("click", () => {
    body.classList.add("activeInsert");
    body.classList.remove("activeIndex");
    body.classList.remove("activeUpdate");
  });

  saveI.addEventListener("click", () => {
    body.classList.add("activeIndex");
    body.classList.remove("activeInsert");
    body.classList.remove("activeUpdate");
  });

  cancelI2.addEventListener("click", () => {
    body.classList.add("activeIndex");
    body.classList.remove("activeInsert");
    body.classList.remove("activeUpdate");
  });

  UpdateI.addEventListener("click", () => {
    body.classList.add("activeIndex");
    body.classList.remove("activeInsert");
    body.classList.remove("activeUpdate");
  });
 
});

//-------------------------------------------------------------------------------------------//
//?------------------------------------------API-------------------------------------------------//
//-------------------------------------------------------------------------------------------//

document.addEventListener("DOMContentLoaded", function () {
  fetchTasks();
                                                            //?------------------------------------------CREATE-//

  document
    .getElementById("createForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      fetch("./create.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          fetchTasks();
          this.reset();
        })
        .catch((error) => console.error("Error:", error));
    });

                                                            //?-------------------------------------------------//
                                                            //--------------------------------------------------//
                                                            //*------------------------------------------Update-//

  document
    .getElementById("editForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(this);
      fetch("./update.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          fetchTasks();
          var container = new bootstrap.Modal(
            document.getElementById("editTaskModal")
          );
          container.hide();
        })
        .catch((error) => console.error("Error:", error));
    });
});

                                                          //*-------------------------------------------------//
                                                          //--------------------------------------------------//
                                                          //!------------------------------------------Read-//
function fetchTasks() {
  fetch("./Read.php")
    .then((response) => response.json())
    .then((data) => {
      var tbody = document.getElementById("taskTableBody");
      tbody.innerHTML = "";
      data.forEach((task) => {
        var tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${task.id}</td>
                    <td>${task.Name}</td>
                    <td>${task.Phone}</td>
                    <td>${task.Email}</td>
                    <td>
                        <a class="link-dark" onclick="EditData('${task.id}', '${task.Name}', '${task.Phone}', '${task.Email}')"><i class="fa-solid fa-pen-to-square fs-5 me-3"></i>
                        </a>
                        <a class="link-dark" onclick="deleteTask(${task.id})">
                            <i class="fa-solid fa-trash fs-5"></i>
                        </a>
                    </td>
                `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error:", error));
}
                                                          //!-------------------------------------------------//
                                                        //--------------------------------------------------//
                                                        //todo------------------------------------------Delete-//
function deleteTask(id) {
  var formData = new FormData();
  formData.append("id", id);

  fetch("./Delete.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      fetchTasks();
    })
    .catch((error) => console.error("Error:", error));
}
                                                          //todo-------------------------------------------------//
                                                          //--------------------------------------------------//
                                                          //*------------------------------------------EDITUpdate-//
function EditData(id, Name, Phone, Email) {
  document.getElementById("edit-id").value = id;
  document.getElementById("Name_Update").value = Name;
  document.getElementById("Phone_Update").value = Phone;
  document.getElementById("Email_Update").value = Email;
  var container = new bootstrap.Modal(document.getElementById("editTaskModal"));
  container.show();
}
                                                          //*---------------------------------------------------//
