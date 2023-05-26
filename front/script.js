const problems = [
    {
        title: "title",
        difficulty: "Easy",
        acRate: "42%"
    },
    {
        title: "title1",
        difficulty: "Medium",
        acRate: "32%"
    },
    {
        title: "title2",
        difficulty: "Hard",
        acRate: "12%"
    }
];
const problems2 = [
    {
        title: "title3",
        difficulty: "Easy",
        acRate: "42%"
    },
    {
        title: "title4",
        difficulty: "Medium",
        acRate: "32%"
    },
    {
        title: "title5",
        difficulty: "Hard",
        acRate: "12%"
    }
];

function clearProblems() {
    const problemsElement = document.getElementById("problem-statements");
    while (problemsElement.firstChild) {
        problemsElement.removeChild(problemsElement.firstChild);
    }
}

function renderProblems(pageNumber) {
    clearProblems();

    const problemsElement = document.getElementById("problem-statements");
    const tableTag = document.createElement("table");
    const problems_list = pageNumber == 1 ? problems : problems2

    for (let i = 0; i < problems_list.length; i++) {
        const trTag = document.createElement("tr");

        const tdEl_title = document.createElement("td");
        tdEl_title.innerHTML = problems_list[i].title;
        trTag.appendChild(tdEl_title);

        const tdEl_difficulty = document.createElement("td");
        tdEl_difficulty.innerHTML = problems_list[i].difficulty;
        trTag.appendChild(tdEl_difficulty);

        const tdEl_acRate = document.createElement("td");
        tdEl_acRate.innerHTML = problems_list[i].acRate;
        trTag.appendChild(tdEl_acRate);

        tableTag.appendChild(trTag);
    }
    problemsElement.appendChild(tableTag);
}
renderProblems(1);
