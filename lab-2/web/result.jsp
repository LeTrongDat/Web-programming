<%@ page import="main.webapp.entity.Query" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%! private List<Query> queries; %>
<%
    PrintWriter writer = response.getWriter();
    writer.println("Start processing result");
    if (session.isNew()) {
        session.setAttribute("queries", new ArrayList<Query>());
    } else writer.println(session.getId());
    writer.close();
    queries = (ArrayList<Query>) session.getAttribute("queries");
    queries.add(0, (Query) request.getAttribute("query"));
%>
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
        <% for(Query query: queries) { %>
            <%= query.toHtmlTable() %>
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

