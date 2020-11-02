const API_KEY = 'e80ea94242284179806d19329a5e67ed';
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2014;

const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;


const getData = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    }).then( res => {
        if (res.status !== 200) {
            console.log('Error: ', res.status);
            return Promise.reject(new Error(res.statusText));
        } else {
            return Promise.resolve(res);
        }
    })
    .then( res => res.json())
    .catch( err => console.log(err))
};


function getAllStandings() {
    getData(ENDPOINT_COMPETITION)
        .then( data => {
            showCardStandings(data);
        })
        .catch( err => {
            console.log(err);
        })
}

function getAllTeams() {
    getData(TEAM)
        .then( data => {
            showCardTeams(data);
        })
        .catch( err => {
            console.log(err);
        })
}

function getDetailTeams() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get('id');

    getData(`${BASE_URL}teams/${idParams}`)
        .then( data => {
            console.log(data);
            showCardById(data);
        })
        .catch( err => {
            console.log(err);
        })
}


function showCardStandings(data) {
    let standings = "";

    const elms = document.getElementById('homeStandings');
    data.standings[0].table.forEach( standing => {
        standings += `
            <tr>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
            </tr>
        `;
    });

    elms.innerHTML = `
        <table class="centered striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Team Name</th>
                    <th>Won</th>
                    <th>Draw</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody id="standings">
                ${standings}
            </tbody>
        </table>
    `;
}

function showCardTeams(data) {
    let teams = "";
    const elms = document.getElementById('homeTeams');
    data.teams.forEach( team => {
        teams += `
        <div class="col s6 m3">
            <a href="./pages/detail.html?id=${team.id}" class="card">
                <div class="card-image">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                </div>
            </a>
        </div>
        `;
    });
    elms.innerHTML = teams;
}

function showCardById(data) {
    let cardDetails = "";
    const elms = document.getElementById('body-content');
    data.area.forEach( dtl => {
        cardDetails += `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                <img src="${dtl.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                </div>
                <div class="card-content">
                <span class="card-title">${dtl.name}</span>
                </div>
            </div>
            `;
    });
    elms.innerHTML = cardDetails;
}