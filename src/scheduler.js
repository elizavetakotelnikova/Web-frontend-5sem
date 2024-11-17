
window.addEventListener('DOMContentLoaded', constuctor);

function constuctor() {
    const generationForm = document.getElementsByClassName("constructor__form")[0];
    const savingForm = document.getElementsByClassName("constructor__saving-form")[0];
    const loadForm = document.getElementsByClassName("constructor__load-form")[0];
    const scheduleContainer = document.getElementsByClassName("constructor__schedule")[0];

    if (localStorage.getItem('scheduleSettings')) {
        const settings = JSON.parse(localStorage.getItem('scheduleSettings'));
        document.getElementById("form__days").value = settings.days || 5;
        document.getElementById("form__lessons").value = settings.lessons || 6;
        document.getElementById("form__language").value = settings.language || 'ru';
    }

    generationForm.addEventListener("submit", function (event)  {
        event.preventDefault();

        const days = document.getElementById("form__days").value;
        const lessons = document.getElementById("form__lessons").value;
        const language = document.getElementById("form__language").value;

        const settings = { days, lessons, language };
        localStorage.setItem('scheduleSettings', JSON.stringify(settings));

        generateSchedule(days, lessons, language);
    });

    savingForm.addEventListener("submit", function (event)  {
        event.preventDefault();

        const tableState = scheduleContainer.innerHTML;
        localStorage.setItem('tableState', JSON.stringify(tableState));

        const headerData = []
        const headers = document.querySelectorAll('.schedule__table th')
        headers.forEach(each => {
            const input = each.querySelector('input');
            const cellData = input.value;
            headerData.push(cellData)
        });

        localStorage.setItem("headerData", JSON.stringify(headerData))


        const tableData = [];
        const rows = document.querySelectorAll('.schedule__table tr');
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const rowData = Array.from(inputs).map(input => input.value);
            console.log(rowData)
            tableData.push(rowData)
        });

        console.log(tableData)
        localStorage.setItem('tableData', JSON.stringify(tableData));
    });

    loadForm.addEventListener("submit", function (event)  {
        event.preventDefault();

        if (localStorage.getItem('tableState')) {
            scheduleContainer.innerHTML = JSON.parse(localStorage.getItem('tableState'));
        }

        const headerData = JSON.parse(localStorage.getItem("headerData"))
        let headers;
        if (headerData) {
            headers = scheduleContainer.querySelectorAll("th")
            for (let i = 0; i < headers.length; i++) {
                headers[i].querySelector('input').value = headerData[i];
            }
        }

        const storedData = JSON.parse(localStorage.getItem('tableData'));
        let rows;
        let columns;
        if (storedData) {
            rows = scheduleContainer.querySelectorAll('tr')
            for (let i = 0; i < rows.length; i++) {
                columns = rows[i].querySelectorAll('td')
                for (let j = 0; j < columns.length; j++) {
                    columns[j].querySelector('input').value = storedData[i][j];
                }
            }
        }
    });


    function generateSchedule(days, lessons, language) {
        scheduleContainer.innerHTML = generateTable(days, lessons, language);
        const scheduleTable = scheduleContainer.getElementsByTagName("table")[0]
        console.log(scheduleTable)
        scheduleTable.classList.add("schedule__table")
    }
}

function generateTable(days, max_classes, language) {
    let table = '<table>';
    table += '<tr>'
    for (let i = 1; i <= days; i++) {
        if (language === 'ru') {
            table += `<th class="schedule__table-header"><input class="schedule__table-header" type="text" value="День ${i}"</input></th>`;
        }
        else {
            table += `<th class="schedule__table-header"><input class="schedule__table-header" type="text" value="Day ${i}"</input>`;
        }
    }
    table += '</tr>'

    for (let i = 1; i <= max_classes; i++) {
        table += '<tr class="schedule__table-row">'
        for (let j = 1; j <= days; j++) {
            if (language === 'ru') {
                table += `<td class="schedule__table-cell"><input type="text" value="Занятие ${i}"</input></td>`
            }
            else {
                table += `<td class="schedule__table-cell"><input type="text" value="Class ${i}"</input></td>`
            }
        }
        table += '</tr>'
    }

    table += '</table>';
    return table;
}