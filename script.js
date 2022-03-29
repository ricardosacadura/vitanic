let data = "./data/titanic_dataset.csv";

var margin = { top: 10, right: 40, bottom: 30, left: 150 },
  width = 1100 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;

let svg = d3
  .select("#scatter_area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .style("background-color", "lightgray");

d3.csv(data, d3.autoType).then((tabela) => {
  let statsAge = {};
  tabela.map((linha) => {
    statsAge = {
      ...statsAge,
      [linha.Age]: 0,
    };
  });
  tabela.map((linha) => statsAge[linha.Age]++);
  let spaceBetweenX = 600 / Object.keys(statsAge).length;

  var x = d3
    .scaleLinear()
    .domain([0, 80]) // This is the min and the max of the data: 0 to 100 if percentages
    .range([50, width]); // This is the corresponding value I want in Pixel
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  let g1 = svg
    .append("g")
    .attr("width", 500)
    .attr("height", 200)
    .attr("m", 600);

  Object.keys(statsAge).map((i) => {
    g1.append("circle")
      .attr("cx", i * spaceBetweenX + spaceBetweenX / 2 + 50)
      .attr("cy", d3.randomUniform(200, 700))
      .attr("fill", "gray")
      .attr("r", "8");
    console.log("hello");
    console.log(statsAge);
  });

  //////EXAMPLE////////
  // // set the dimensions and margins of the graph
  // var margin = { top: 10, right: 40, bottom: 30, left: 150 },
  //   width = 1100 - margin.left - margin.right,
  //   height = 600 - margin.top - margin.bottom;

  // // append the svg object to the body of the page
  // var svg = d3
  //   .select("#scatter_area")
  //   .append("svg")
  //   .attr("width", width + margin.left + margin.right)
  //   .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // // Create data
  // var data2 = [
  //   { x: 10, y: 20 },
  //   { x: 40, y: 90 },
  //   { x: 80, y: 50 },
  // ];

  // // X scale and Axis
  // var x = d3
  //   .scaleLinear()
  //   .domain([0, 100]) // This is the min and the max of the data: 0 to 100 if percentages
  //   .range([0, width]); // This is the corresponding value I want in Pixel
  // svg
  //   .append("g")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(d3.axisBottom(x));

  // // Y scale and Axis
  // var y = d3
  //   .scaleLinear()
  //   .domain([0, 100]) // This is the min and the max of the data: 0 to 100 if percentages
  //   .range([height, 0]); // This is the corresponding value I want in Pixel
  // svg.append("g").call(d3.axisLeft(y));

  // svg.append("g").call(d3.axisLeft(y));

  // // Add 3 dots for 0, 50 and 100%
  // svg
  //   .selectAll("whatever")
  //   .data(data2)
  //   .enter()
  //   .append("circle")
  //   .attr("cx", function (d) {
  //     return x(d.x);
  //   })
  //   .attr("cy", function (d) {
  //     return y(d.y);
  //   })
  //   .attr("r", 7);
});
