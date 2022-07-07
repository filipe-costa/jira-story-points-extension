function createTableHeader() {
    const thead = document.createElement("thead");
    const row = document.createElement("tr");
    const swimlane_column_name_header = document.createElement("th");
    const swimlane_column_total_estimate_header = document.createElement("th");

    swimlane_column_name_header.appendChild(document.createTextNode("Column"));
    swimlane_column_total_estimate_header.appendChild(document.createTextNode("Total Estimate"));

    row.appendChild(swimlane_column_name_header);
    row.appendChild(swimlane_column_total_estimate_header);

    thead.appendChild(row);

    return thead;
}

function createTableBody(objectInsights) {
    const tbody = document.createElement("tbody");

    objectInsights.forEach((insight) => {
        const row = document.createElement("tr");
        const swimlane_column_name = document.createElement("td");
        const swimlane_column_total_estimate = document.createElement("td");

        swimlane_column_name.appendChild(document.createTextNode(insight.column_name));
        swimlane_column_total_estimate.appendChild(document.createTextNode(insight.total_estimate));

        row.appendChild(swimlane_column_name);
        row.appendChild(swimlane_column_total_estimate);
        tbody.appendChild(row);
    });


    return tbody;
}

function createTable(objectInsights) {
    const table = document.createElement("table");
    const thead = createTableHeader();

    table.appendChild(thead);

    if(objectInsights) {
        const tbody = createTableBody(objectInsights);
        table.appendChild(tbody);
    }


    return table;
}

function createMessage() {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("Please, open this extension in a Jira Swimlane to calculate total story points estimate for each column, if any."));
    return p;
}

function render(objectInsights) {
    const main = document.getElementById("main");
    const table = createTable(objectInsights);

    if(Array.isArray(objectInsights) && objectInsights.length > 0) {
        main.appendChild(table);
    } else {
        main.appendChild(createMessage());
    }
}

function main() {
    // Pass object insights via messaging mechanism from content-script.js file
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, null, function(objectInsights) {
            if(chrome.runtime.lastError) return;
            render(objectInsights)
        });
    });
}

main();