<?php
require_once './server/helpers/Query.php';
session_start();
//date_default_timezone_set('Europe/Moscow');

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        if (!isset($_SESSION['form_data'])) $_SESSION['form_data'] = array();
        $_SESSION['form_data'][] = new Query($_POST["x"], $_POST["y"], $_POST["radius"]);
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Result</title>
    <link rel="stylesheet" type="text/css" href="stylesheets/respond.css">
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
                <th>Creation time</th>
                <th>Execution time</th>
            </tr></thead>
            <tbody>
            <?php foreach(array_reverse($_SESSION["form_data"]) as $query) echo $query->toHtmlTableRow(); ?>
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

