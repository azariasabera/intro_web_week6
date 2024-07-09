document.addEventListener("DOMContentLoaded", function() {
    const url = 'https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px';
    const requestBody = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                        "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
                        "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
                        "2016", "2017", "2018", "2019", "2020", "2021"
                    ]
                }
            },
            {
                "code": "Alue",
                "selection": {
                    "filter": "item",
                    "values": ["SSS"]
                }
            },
            {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": ["vaesto"]
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        // Process and map the data
        const years = requestBody.query[0].selection.values;
        const populationData = data.value;

        // Create the chart
        const chart = new frappe.Chart("#chart", {
            title: "Population Growth (2000-2021)",
            data: {
                labels: years,
                datasets: [
                    {
                        name: "Population",
                        type: "line",
                        values: populationData
                    }
                ]
            },
            type: 'line',
            height: 450,
            colors: ['#eb5146']
        });
    })
    .catch(error => {
        console.error('Error fetching the population data:', error);
    });
});