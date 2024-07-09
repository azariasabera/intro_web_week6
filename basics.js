const inputArea = document.getElementById('input-area');
const submitButton = document.getElementById('submit-data');

const jsonQuery = { 
    "query": [{   
        "code": "Vuosi",
        "selection": {
            "filter": "item",
            "values": [ "2000",
                        "2001",
                        "2002",
                        "2003",
                        "2004",
                        "2005",
                        "2006",
                        "2007",
                        "2008",
                        "2009",
                        "2010",
                        "2011",
                        "2012", 
                        "2013",
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                        "2020",
                        "2021" ]}
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
            }],
    "response": { "format": "json-stat2"}
}

submitButton.addEventListener('click', async (e)=>{
    e.preventDefault();
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"
    const res = await fetch(url);
    const data = await res.json();
    let name = inputArea.value.toLowerCase();
    name = name.slice(0, 1).toUpperCase() + name.slice(1);
    console.log(name)
    let code = "";
    console.log(data.variables[1].valueTexts)
    data.variables[1].valueTexts.forEach((element, index) => {
        if(element === name){
            code = data.variables[1].values[index];
        }
    });
    console.log(code);
    jsonQuery.query[1].selection.values = [code];
    console.log(jsonQuery);
    buildChart();
})


const getData = async () => {
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px"

    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(jsonQuery)
    })
    if(!res.ok) {
        return;
    }
    const data = await res.json()

    return data
}

const buildChart = async () => {
    const data = await getData()
    
    const area = Object.values(data.dimension.Alue.category.label);
    const years = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;

    /* 
    // Option 1
    const chartData = {
        labels: years,
        dataset: [] // accepts an array of objects with name and values
    }
    for (let i = 0; i < area.length; i++) {
        const dataset = {
            name: area[i],
            values: []
        }
        for (let j = 0; j < years.length; j++) {
            dataset.values.push(values[i + j])
        }
        chartData.datasets.push(dataset)
    }
    */

    // Option 2
    area[0] = {
        name: area[0],
        values: values
    }

    const chartData = {
        labels: years,
        datasets: area
    }

    const chart = new frappe.Chart("#chart", {
        title: "Population growth in Finland 2000-2021",
        data: chartData,
        type: "line",
        height: 450,
        colors: ['#eb5146'],
        /*barOptions: {
           stacked: 1
        }*/
        lineOptions: {
            hideDots: 1,
            regionFill: 0
        }

    });
}
buildChart()
