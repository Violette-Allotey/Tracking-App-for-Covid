let baseUrl = 'http://localhost:4000'

window.onload = async (e) => {

    let cases = []
    let totalCases = 0
    let totalRecovered = 0
    let totalActive = 0
    let totalDeath = 0
    let country_region = 'country_region'

    let getGlobalCases = () => {
        document.querySelector('#loading').innerHTML = ''
        return fetch(baseUrl + '/cases').then((response) => {
            return response.json()
        }).then((res) => {
            cases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let activeCases = (country_region) => {
        return fetch(baseUrl + '/total-active').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalActive = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let recoveredCases = (country_region) => {
        return fetch(baseUrl  +'/total-recovered').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalRecovered = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let deathCases = (country_region) => {
        return fetch(baseUrl + '/total-deaths').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalDeath = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    let countryTotalCases = (country_region) => {
        return fetch(baseUrl + '/total-cases').then((response) => {
            return response.json()
        }).then((res) => {
            document.querySelector('#loading').innerHTML = ''
            totalCases = res
        })
            .catch((err) => {
                console.log(err)
            })
    }

    await getGlobalCases()
    await activeCases(country_region)
    await recoveredCases(country_region)
    await deathCases(country_region)
    await countryTotalCases(country_region)
    document.querySelector('#loading').style.display = 'none'

    document.querySelector('#total-cases').innerHTML = totalCases
    document.querySelector('#total-recovered').innerHTML = totalRecovered
    document.querySelector('#total-active').innerHTML = totalActive
    document.querySelector('#total-deaths').innerHTML = totalDeath

    let tbody = document.querySelector('#tbd');
    for (let data of cases) {
        let tr = tbody.appendChild(document.createElement('tr'));
        tr.setAttribute('onclick', `getCountry('${data.country}')`)
        tr.appendChild(document.createElement('td')).innerHTML = data.Country_Region
        tr.appendChild(document.createElement('td')).innerHTML = data.Active
        tr.appendChild(document.createElement('td')).innerHTML = data.Recovered
        tr.appendChild(document.createElement('td')).innerHTML = data.Deaths
        tr.appendChild(document.createElement('td')).innerHTML = data.Confirmed
    }
}

function getCountry(country_region) {
    fetch(baseUrl + '/cases/'+ country_region).then((response) => {
        return response.json()
    }).then((res) => {
        console.log(res)
    })
        .catch((err) => {
            console.log(err)
        })
}