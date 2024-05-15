function checkResult() {
    let form = document.getElementById("database");
    let name = form.elements["name"].checked;
    let singleSubjects = Array.from(document.querySelectorAll(`td[data-column='subjects']`)).filter(row => row.textContent.includes(',')).length == 0;

    if (name) {
        addCorrectClass("name")
    }

    if (singleSubjects) {
        addCorrectClass("subjects")
    }

    let result = document.getElementById("result");
    userAnswer = name + singleSubjects;
    result.innerHTML = `${userAnswer} / 2 Optimierung erkannt`;
}

function triggerSplitSubjects(element) {
    console.log('before', currentRow);
    toggleModal('modal-example')
    currentRow = element.parentElement;
    console.log('after', currentRow);
}

function splitSubjects() {
    console.log(currentRow.children[2]);
    let subjects = currentRow.children[2].innerText.split(", ");
    console.log(subjects);
    data = {
        userID: currentRow.children[0].innerText,
        name: currentRow.children[1].innerText,
        subjects: subjects[1]
    }
    addRow(data);
    currentRow.children[2].innerText = subjects[0];
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
    cell3.setAttribute("data-column", "userID");
    cell2.innerHTML = data.name;
    cell2.setAttribute("data-column", "name");
    cell3.innerHTML = data.subjects;
    cell3.setAttribute("data-column", "subjects");
}
