function checkResult() {
    let form = document.getElementById("database");
    let name = document.querySelector(`[data-column='firstname']`)
    let singleSubjects = Array.from(document.querySelectorAll(`td[data-column='subjects']`)).filter(row => row.textContent.includes(',')).length == 0;

    if (name) {
        checkAcceptanceCriteria("ac-names");
    }

    if (singleSubjects) {
        checkAcceptanceCriteria("ac-subjects");
    }
}

function triggerSplitSubjects(element) {
    console.log('before', currentRow);
    toggleModal('model-row-split')
    currentRow = element.parentElement;
    console.log('after', currentRow);
}

function splitSubjects() {
    let subjects = currentRow.querySelector(`[data-column='subjects']`).innerText.split(', ');
    hasName = currentRow.querySelector(`[data-column='firstname']`);

    if (hasName) {
        data = {
            userID: currentRow.children[0].innerText,
            firstname: currentRow.querySelector(`[data-column='firstname']`).innerText,
            name: currentRow.querySelector(`[data-column='name']`).innerText,
            subjects: subjects[1]
        }
        currentRow.children[3].innerText = subjects[0];
    } else {
        data = {
            userID: currentRow.children[0].innerText,
            name: currentRow.querySelector(`[data-column='name']`).innerText,
            subjects: subjects[1]
        }
        currentRow.children[2].innerText = subjects[0];
    }

    console.log(data);
    addRow(data);
    toggleModal('model-row-split')
}

function splitColumnName() {
    let table = document.getElementById("normalization");
    let headerRow = table.rows[0];
    if (headerRow.cells[1].getAttribute("data-column") == "firstname") {
        return;
    }
    // add new th and add the second position
    let newColumn = document.createElement("th");
    newColumn.innerHTML = "Vorname";
    newColumn.setAttribute("data-column", "firstname");
    headerRow.insertBefore(newColumn, headerRow.cells[1]);

    // Add the new column to the second position for the rest of the rows
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let name = row.cells[1].innerText.split(" ");
        console.log(row.cells[1]);
        let cell = row.insertCell(1);
        cell.setAttribute("data-column", "firstname");
        cell.innerHTML = name[0];
        row.cells[2].innerText = name[1];
    }
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

function checkAcceptanceCriteria(id) {
    document.getElementById(id).classList.add("correct");
}

function addRow(data) {
    let table = document.getElementById("normalization");
    let row = table.insertRow(-1);
    if (data.firstname) {
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        cell1.innerHTML = data.userID;
        cell1.setAttribute("data-column", "userID");
        cell2.innerHTML = data.firstname;
        cell2.setAttribute("data-column", "firstname");
        cell3.innerHTML = data.name;
        cell3.setAttribute("data-column", "name");
        cell4.innerHTML = data.subjects;
        cell4.setAttribute("data-column", "subjects");
    } else {
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = data.userID;
        cell1.setAttribute("data-column", "userID");
        cell2.innerHTML = data.name;
        cell2.setAttribute("data-column", "name");
        cell3.innerHTML = data.subjects;
        cell3.setAttribute("data-column", "subjects");
    }
}
