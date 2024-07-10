document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
    const postData = {
        "query": [
            {
                "code": "Vuosi",
                "selection": {
                    "filter": "item",
                    "values": ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
                }
            },
            {
                "code": "Alue",
                "selection": {
                    "filter": "item",
                    "values": ["SSS"] // Replace with the actual municipality code
                }
            },
            {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": ["vm01", "vm11"] // Births and deaths codes
                }
            }
        ],
        "response": {
            "format": "json-stat2"
        }
    };

    function fetchData(body) {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }

    function mapDataToChart(data) {
        const years = data.dimension.Vuosi.category.label;
        const births = data.value.filter((_, index) => index % 2 === 0); // Even indices for births
        const deaths = data.value.filter((_, index) => index % 2 !== 0); // Odd indices for deaths

        const chartData = {
            labels: Object.values(years),
            datasets: [
                { name: "Births", type: "bar", values: births, colors: ['#63d0ff'] },
                { name: "Deaths", type: "bar", values: deaths, colors: ['#363636'] }
            ]
        };

        new frappe.Chart("#chart", {
            title: "Births and Deaths in Municipality",
            data: chartData,
            type: 'bar',
            height: 450,
            colors: ['#63d0ff', '#363636']
        });
    }

    fetchData(postData).then(data => {
        console.log(data);
        mapDataToChart(data);
    });
});
