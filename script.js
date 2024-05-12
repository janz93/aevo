function checkResult() {
    let form = document.getElementById("database");
    let name = form.elements["name"].checked;
    let subjects = form.elements["subjects"].checked;

    if (name) {
        addCorrectClass("name")
    }

    if (subjects) {
        addCorrectClass("subjects")
    }

    let result = document.getElementById("result");
    userAnswer = name + subjects;
    result.innerHTML = `${userAnswer} / 4 sind korret`;
}

function triggerSplitSubjects(element) {
    toggleModal('modal-example')
    currentRow = element.parentElement;
}

function splitSubjects() {
    let subjects = currentRow.children[2].innerHTML.split(", ");
    data = {
        userID: currentRow.children[0].innerHTML,
        name: currentRow.children[1].innerHTML,
        subjects: subjects[1]
    }
    addRow(data);
    currentRow.children[2].innerHTML = subjects[0];
    toggleModal('modal-example')
}

function filterTable() {
    var columnName = document.getElementById("columnSelect").value;
    var searchText = document.getElementById("searchText").value;
    console.log(columnName, searchText, document.querySelectorAll(`[data-column='${columnName}']`));

    document.querySelectorAll(`td[data-column='${columnName}']`).forEach((element) => {

        console.log(element.innerText.toLowerCase(), searchText.toLowerCase(), element.innerText.toLowerCase() != searchText.toLowerCase());
        if (element.innerText.toLowerCase() != searchText.toLowerCase()) {
            element.parentElement.classList.add("hidden");
        } else {
            element.parentElement.classList.remove("hidden");
        }
    });
}

function resetFilterTable() {
    document.querySelectorAll(".hidden").forEach((element) => {
        element.classList.remove("hidden");
    });
}

// private

function addCorrectClass(columnName) {
    document.querySelectorAll(`[data-column='${columnName}']`).forEach((element) => {
        element.classList.add("correct");
    });
}

function addRow(data) {
    let table = document.getElementById("normalization");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = data.userID;
    cell2.innerHTML = data.name;
    cell3.innerHTML = data.subjects;
}
