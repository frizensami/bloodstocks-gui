import {csvFormat, tsvParse} from "d3-dsv";
import {utcParse} from "d3-time-format";

// Read bloodstocks.json from https://github.com/frizensami/red-cross-blood-stocks, and get all the previous commits of this file too
const bloodstocks_commits = JSON.parse(await (await fetch("https://api.github.com/repos/frizensami/red-cross-blood-stocks/commits?path=blood-stocks.json")).text());

// This is paginated, so we need to get the rest
// Get the rest of the commits
// let page = 1;
// while (bloodstocks_commits.length % 30 === 0) {
//     console.error("Page: " + page + "Bloodstocks length: " + bloodstocks_commits.length)
//     const next_commits = JSON.parse(await (await fetch("https://api.github.com/repos/frizensami/red-cross-blood-stocks/commits?path=blood-stocks.json&page=" + ++page)).text());
//     if (next_commits.length === 0) {
//         break;
//     }
//     bloodstocks_commits.push(...next_commits);
// }


let all_stocks = []
for (var i = 0; i < bloodstocks_commits.length; i++) {
    const date = new Date(bloodstocks_commits[i].commit.author.date);

    /**
     * Current format of a single call looks like this
    [
        { bloodType: 'A+', status: 'Healthy', fillLevel: '80' },
        { bloodType: 'A-', status: 'Low', fillLevel: '40' },
        { bloodType: 'B+', status: 'Healthy', fillLevel: '73' },
        { bloodType: 'B-', status: 'Moderate', fillLevel: '63' },
        { bloodType: 'O+', status: 'Healthy', fillLevel: '100' },
        { bloodType: 'O-', status: 'Healthy', fillLevel: '72' },
        { bloodType: 'AB+', status: 'Healthy', fillLevel: '78' },
        { bloodType: 'AB-', status: 'Moderate', fillLevel: '60' }
    ]

     */
    const bloodstock = JSON.parse(await (await fetch("https://raw.githubusercontent.com/frizensami/red-cross-blood-stocks/" + bloodstocks_commits[i].sha + "/blood-stocks.json")).text());
    // console.log(bloodstock);

    // Collapse our data into a single object
    // const bloodstocks = [];
    bloodstock.forEach((d) => {
        all_stocks.push({date: date.toISOString().slice(0, 10), bloodType: d.bloodType, fillLevel: parseInt(d.fillLevel)});
        // bloodstocks[d.bloodType] = parseInt(d.fillLevel);
    });


    // const day_data = {date: date.toISOString().slice(0, 10), ...bloodstocks};
    // all_stocks.push(day_data);
}

// Write out csv formatted data.
process.stdout.write(JSON.stringify(all_stocks));     
// process.stdout.write("[{}]");     