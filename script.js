function checkResult() {
    let form = document.getElementById("database");
    let name = form.elements["name"].checked;
    let subjects = form.elements["subjects"].checked;

    if (name) {
        console.log("name is true")
        addCorrectClass("name")
    }

    if (subjects) {
        addCorrectClass("subjects")
    }

    let result = document.getElementById("result");
    userAnswer = name + subjects;
    result.innerHTML = `${userAnswer} / 4 sind korret`;
}

// private

function addCorrectClass(columnName) {
    document.querySelectorAll(`[data-column='${columnName}']`).forEach((element) => {
        element.classList.add("correct");
    });
}
