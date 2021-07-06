<?php
if (isset($_POST['updateTotalCount'])) {
    
    $host         = "localhost";
    $username     = "root";
    $password     = "f4{4BD7!!MZ{/C3V";
    $databasename = "quizApp";
    $connect      = mysqli_connect($host, $username, $password, $databasename);
    $sql          = "UPDATE median_score SET total_participants = total_participants+1";
    $update       = mysqli_query($connect, $sql);
    $sql1         = "SELECT * FROM median_score";
    $select       = mysqli_query($connect, $sql1);
    while ($row = mysqli_fetch_array($select)) {
        $usersCount = $row['total_participants'];
        echo "<p id='display_div_usersCount'>" . $usersCount . "</p>";
        exit();
    }
}


if (isset($_POST['updateYourScore'])) {
    $yourScore    = $_POST['updateYourScore'];
    $host         = "localhost";
    $username     = "root";
    $password     = "";
    $databasename = "quizApp";
    $connect      = mysqli_connect($host, $username, $password, $databasename);
    
    $sql    = "INSERT INTO updateResults SET score_Record = '$yourScore'";
    $update = mysqli_query($connect, $sql);
    
    
    $sql1   = "SELECT AVG(score_record) AS median FROM updateResults";
    $median = mysqli_query($connect, $sql1);
    while ($row = mysqli_fetch_array($median)) {
        $average = $row['median'];
    }
    
    echo "<p id='usrResult'>Your Result is: " . $yourScore . "% </p>";
    echo "<p id='usrResult'>Median Score is: " . round($average, 2) . "% </p>";
    exit();
}
?>