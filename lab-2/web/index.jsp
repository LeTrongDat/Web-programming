<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="Lab 1 web programming in itmo university">
  <meta name="author" content="Le Trong Dat">
  <meta name="keywords" content="web_programming, php, css, javascript">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="client/stylesheets/index.css"/>
  <link rel="stylesheet" type="text/css" href="client/stylesheets/form.css"/>
  <title>Form</title>
</head>
<body>
<header class="header">
  <div>Web programming - Laboratory №1</div>
  <div>Le Trong Dat, P3231</div>
  <div>Variant: 2710</div>
  <div>Link to Github:
    <a href="https://github.com/LeTrongDat/Web-programming">https://github.com/LeTrongDat/Web-programming</a>
  </div>
</header>
<div id="content">
  <div id="description">
    <h2>Lab's task</h2>
    <p>
      The script should perform data validation and return an HTML page with a table containing the obtained parameters
      and the result of calculations - the fact of hitting or not hitting a point in the area.
      Previous results should be persisted between queries and displayed in a table.
    </p>
    <table>
      <tr>
        <th>Constraints</th>
        <th>Area for checking</th>
      </tr>
      <tr>
        <td id="constraints">
          <ul>
            <li>Value of X should be in {-3; -2; -1; 0; 1; 2; 3; 4; 5}</li>
            <li>Value of Y should be in the range (-3, 3)</li>
            <li>Value of R should be in {1; 1.5; 2; 2.5; 3}</li>
          </ul>
        </td>
        <td id="area">
<%--          <img src="client/image/coordinate.jpg" alt="Cartesian coordinate of area">--%>
          <canvas id="myCanvas" width="300" height="300" style="border:1px solid #d3d3d3;"> </canvas>
          <p class="error" id="canvas-err"></p>
        </td>
      </tr>
    </table>
  </div>
  <div class="container">
    <h2>Data form</h2>
    <form name="data-form" id="data-form" action="data-process" method="POST">
      <div class="row">
        <div class="col-25">
          <label for="x-input">Point X:</label>
        </div>
        <div class="col-75" id="x-input"></div>
        <p class="col-75 error" id="x-err"></p>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="y-input">Point Y:</label>
        </div>
        <div class="col-75" id="y-input"></div>
        <p class="col-75 error" id="y-err"></p>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="radius-input">Point R:</label>
        </div>
        <div class="col-75" id="radius-input"></div>
        <p class="col-75 error" id="radius-err"></p>
      </div>
      <div class="row">
        <input type="submit" value="Submit">
      </div>
    </form>
  </div>
</div>
<footer>
  <p>Address: 43 Nguyen Phong Sac Str., Ha Noi city, Viet Nam</p>
  <p>Contact: <a href="mailto:dat.lt@teko.vn">dat.lt@teko.vn</a></p>
</footer>

<script type="text/javascript" src="client/validator.js"></script>
<script type="text/javascript" src="client/coordinate.js"></script>
</body>
</html>
