const vitanic = "./data/titanic_dataset.csv";

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 950 - margin.left - margin.right,
  height = 650 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// This function is called by the buttons on top of the plot
function changeOpacity(opacityCircle, opacityCross) {
  d3.selectAll("circle").style("opacity", opacityCircle);

  d3.selectAll("path.Cross").style("opacity", opacityCross);
}

//Read the data
d3.csv(vitanic, function (data) {
  // Add X axis
  var x = d3.scaleLinear().domain([0, 80]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  // Add Y axis
  var y = d3.scaleLinear().domain([0, 180]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Making a line top
  svg
    .append("line")
    .style("stroke", "gray")
    .style("stroke-dasharray", "3, 3")
    .attr("x1", 0)
    .attr("y1", 200)
    .attr("x2", width)
    .attr("y2", 200);

  // Making a line bottom
  svg
    .append("line")
    .style("stroke", "gray")
    .style("stroke-dasharray", "3, 3")
    .attr("x1", 0)
    .attr("y1", 410)
    .attr("x2", width)
    .attr("y2", 410);

  // Arrays with genre selection

  let survived = data.filter(function (d) {
    return d.Survived == "survival";
  });

  const blue = "#01BCFA";
  const pink = "#FF8CC2";

  // Add dots
  svg //--------------------------------rendering SURVIVALS
    .append("g")
    .selectAll("dot")
    .data(survived)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.Age);
    })
    .attr("cy", function (d) {
      return y(d.TicketFarepound);
    })
    .attr("r", 4)

    //Paint by genre
    .style("fill", function (d) {
      if (d.Sex == "male") {
        return blue;
      } else {
        return pink;
      }
    })
    .style("opacity", "0.8");

  var cross = d3.symbol().type(d3.symbolCross).size(35);

  svg //-------------------------------rendering DEATHS

    .append("g")
    .selectAll("#dead-cross")
    .data(
      data.filter(function (d) {
        return d.Survived == "dead";
      })
    )
    .enter()
    .append("path")
    .attr("transform", function (d) {
      return "translate(" + x(d.Age) + "," + y(d.TicketFarepound) + ")";
    })
    .attr("d", cross)
    .attr("class", "Cross")
    //Paint by genre
    .style("fill", function (d) {
      if (d.Sex == "male") {
        return blue;
      } else {
        return pink;
      }
    })
    .style("opacity", "0.8");
});
