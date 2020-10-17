<%--
  Created by IntelliJ IDEA.
  User: letro
  Date: 10/7/2020
  Time: 7:01 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isErrorPage="true" %>
<html>
<head>
    <title>Error</title>
    <link rel="stylesheet" type="text/css" href="client/stylesheets/error.css">
    <link rel="stylesheet" type="text/css" href="client/stylesheets/index.css">
</head>
<body>
<div class="error-container">
    <h1>Oops!</h1>
    <h2>An error has occurred</h2>
    <div>Error message: <span><%= exception.getMessage() %></span></div>
    <input type="button" value="Go home" class="back-btn" onclick="history.back(-1)">
</div>
</body>
</html>
