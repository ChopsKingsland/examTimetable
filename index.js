function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./events.json", true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

loadJSON(function (response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    // console.log(actual_JSON);
    for (let i = 0; i < actual_JSON.length; i++) {
        let d = Date.parse(actual_JSON[i]["datetime"])
        // console.log(d);
        if (d < Date.now()) {
            delete actual_JSON[i];
        }
        console.log(actual_JSON[i]["subject"]);
    }

    let bigtr = document.getElementById("big");
    let bigtd = document.createElement("td");
    bigtd.colSpan = "2";
    bigtd.style.backgroundColor = actual_JSON[0]["colour"];

    let nextExam = document.createElement("div");
    nextExam.id = "nextExam";

    let title = document.createElement("h1");
    title.innerText = actual_JSON[0]["subject"];

    let paper = document.createElement("h2");
    paper.innerText = actual_JSON[0]["paper"];

    let d2 = new Date(Date.parse(actual_JSON[0]["datetime"]));
    let days = document.createElement("h3");
    days.innerText = `${getNumberOfDays(new Date().toJSON().slice(0,10).replace(/-/g,'/'), actual_JSON[0]["datetime"])} days until ${d2.toLocaleDateString("en-GB")}`;

    
    nextExam.append(title);
    nextExam.append(paper);
    nextExam.append(days);
    bigtd.append(nextExam);
    bigtr.append(bigtd);

    // let secondExam = document.getElementById("secondExam");

    let smalltr1 = document.getElementById("small");
    let smalltd1 = document.createElement("td");
    smalltd1.style.backgroundColor = actual_JSON[1]["colour"];
    // bigtd.colSpan = "2";

    let secondExam = document.createElement("div");
    secondExam.id = "secondExam";

    let title2 = document.createElement("h4");
    title2.innerText = actual_JSON[1]["subject"];

    let paper2 = document.createElement("h5");
    paper2.innerText = actual_JSON[1]["paper"];

    let d3 = new Date(Date.parse(actual_JSON[1]["datetime"]));
    let days2 = document.createElement("h6");
    days2.innerText = `${getNumberOfDays(new Date().toJSON().slice(0,10).replace(/-/g,'/'), actual_JSON[1]["datetime"])} days until ${d3.toLocaleDateString("en-GB")}`;

    secondExam.append(title2);
    secondExam.append(paper2);
    secondExam.append(days2);
    smalltd1.append(secondExam);
    smalltr1.append(smalltd1);


    // let thirdExam = document.getElementById("thirdExam");
    let smalltr2 = document.getElementById("small");
    let smalltd2 = document.createElement("td");
    smalltd2.style.backgroundColor = actual_JSON[2]["colour"];
    // bigtd.colSpan = "2";

    let thirdExam = document.createElement("div");
    thirdExam.id = "thirdExam";

    let title3 = document.createElement("h4");
    title3.innerText = actual_JSON[2]["subject"];

    let paper3 = document.createElement("h5");
    paper3.innerText = actual_JSON[2]["paper"];

    let d4 = new Date(Date.parse(actual_JSON[2]["datetime"]));
    let days3 = document.createElement("h6");
    days3.innerText = `${getNumberOfDays(new Date().toJSON().slice(0,10).replace(/-/g,'/'), actual_JSON[2]["datetime"])} days until ${d4.toLocaleDateString("en-GB")}`;

    thirdExam.append(title3);
    thirdExam.append(paper3);
    thirdExam.append(days3);
    smalltd2.append(thirdExam);
    smalltr2.append(smalltd2);

    console.log(actual_JSON[2]["colour"])
});