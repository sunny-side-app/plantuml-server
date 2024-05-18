<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="/public/css/style.css">
    <title>UML問題集</title>
</head>
<body>
    <header>
        <h2><a href="/index.php">PlantUML Practices</a></h2>
        <nav>
        <!-- <a href="/pages/practices.php">Practices</a> -->
        </nav>
    </header>
    <div class="container pt7">
        <table class="table table-hover rem0p9">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Theme</th>
                </tr>
            </thead>
            <tbody id="table_body"></tbody>
        </table>
        <div class="col d-flex justify-content-center">
            <nav>
                <ul id="page_button_group" class="pagination"></ul>
            </nav>
        </div>
    </div>

    <script src="/public/js/practices.js"></script>
</body>