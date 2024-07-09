const requestBody = {
    query: [
      {
        code: 'Vuosi',
        selection: {
          filter: 'item',
          values: [
            '2000', '2001', '2002', '2003', '2004', '2005', '2006',
            '2007', '2008', '2009', '2010', '2011', '2012', '2013',
            '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021',
          ],
        },
      },
      {
        code: 'Alue',
        selection: {
          filter: 'item',
          values: ['SSS'], // Whole country code
        },
      },
      {
        code: 'Tiedot',
        selection: {
          filter: 'item',
          values: ['vaesto'], // Population data code
        },
      },
    ],
    response: {
      format: 'json-stat2',
    },
  }

// Make a POST request to the StatFin API
fetch('https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the population data here (e.g., map it to the chart)
      console.log('Population data:', data);
      if (data && data.value && Array.isArray(data.value)) {
        const years = requestBody.query[0].selection.values;
        const populationData = data.value;

        console.log('Years:', years);  // Log the years to ensure correct mapping
        console.log('Population Data:', populationData);  // Log the population data to ensure correct mapping

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
    }})
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  