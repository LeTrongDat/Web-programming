<%@ page import="main.webapp.entity.Query" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:useBean id="result" scope="session" class="main.webapp.entity.Result"></jsp:useBean>
<jsp:setProperty name="result" property="queries"></jsp:setProperty>
<!DOCTYPE html>
<html>
<head>
    <title>Result</title>
    <link rel="stylesheet" type="text/css" href="./server/stylesheets/respond.css">
</head>
<body>
<header>
    <h2>Queries Result</h2>
</header>
<div>
    <p class="col-75 error" id="x-err"><?= $error ?></p>
</div>
<div>
    <table>
        <thead><tr>
            <th>Point x</th>
            <th>Point y</th>
            <th>Radius</th>
            <th>Result (Point lies inside the area?)</th>
            <th>Execution time</th>
            <th>Creation time</th>
        </tr></thead>
        <tbody>
        <% for(Query query: result.getQueries()) { %>
            <tr class="row">
                <td><%=String.format("%.2f", query.getX())%></td>
                <td><%=String.format("%.2f", query.getY())%></td>
                <td><%=String.format("%.2f", query.getR())%></td>
                <td><%=query.getResult()%></td>
                <td><%=query.getExecutionTime()%></td>
                <td><%=query.getCreationTime()%></td>
            </tr>
        <%}%>
        </tbody>
    </table>
</div>
<div id="wrapper">
    <button class="back-btn" onclick="goBack()">Back</button>
</div>
<script>
    function goBack() {
        window.history.back();
    }
</script>
</body>
</html>