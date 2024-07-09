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
                        "2021"
        ]}
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
    console.log(data)}
/* 
    const parties = Object.values(data.dimension.Puolue.category.label);
    const labels = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;
    
    //console.log(parties)
    //console.log(labels)
    //console.log(values)

    parties.forEach((party, index) => {
        let partySupport = []
        for(let i = 0; i < 10; i++) {
            partySupport.push(values[i * 8 + index])
        }
        parties[index] = {
            name: party,
            values: partySupport.reverse()
        }
    })

    //console.log(parties)

    const chartData = {
        labels: labels,
        datasets: parties
    }

    const chart = new frappe.Chart("#chart", {
        title: "Finnish parliamentary elections",
        data: chartData,
        type: "line",
        height: 400,
        colors: ['#f54b4b', '#ffde55', '#006288', '#349a2b', '#61bf1a', '#f00a64', '#ffdd93', '#0135a5'],
        //barOptions: {
        //    stacked: 1
        //}
        lineOptions: {
            hideDots: 1,
            regionFill: 0
        }

    })



}
 */
buildChart()
