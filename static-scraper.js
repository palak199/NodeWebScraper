const axios = require('axios');
const cheerio = require('cheerio');
const json2csv = require('json2csv').parse;
var fs = require('fs');

    const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

    axios(url)
      .then(response => {
        const html = response.data;
	      const $=cheerio.load(html);
	      const table=$('.statsTableContainer >tr');
              const topPremierLeagueScorers = [];

          table.each(function () {
          const rank = $(this).find('.rank > strong').text();
          const playerName = $(this).find('.playerName > strong').text();
          const nationality = $(this).find('.playerCountry').text();
          const goals = $(this).find('.mainStat').text();

          topPremierLeagueScorers.push({
            rank,
            name: playerName,
            nationality,
            goals,
          });
        });
        const fields=['name'];
        const csv = json2csv(topPremierLeagueScorers, fields);
       
        //console.log(topPremierLeagueScorers);
        // json2csv({data: topPremierLeagueScorers}, function(err, csv) {
        //   if (err) console.log(err);
        //   fs.writeFile('players.csv', csv, function(err) {
        //     if (err) throw err;
        //     else
        //     console.log('cars file saved');
        //   });
        // });
        fs.writeFile('players.csv',csv,function(err){
          if(err) console.log(err);
          console.log("written");
        });
        
      })
