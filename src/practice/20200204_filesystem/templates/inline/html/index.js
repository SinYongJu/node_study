const createHtml = (css, script) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    ${css}
  </style>
</head>
<body>
  <div>
      <h1>WELLCOME</h1>  
  <script type="text/javascript">
    ${script}
  </script>
</body>
</html>`;

module.exports.createHtml = createHtml;
