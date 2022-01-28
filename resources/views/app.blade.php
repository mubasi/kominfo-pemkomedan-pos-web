<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ env('APP_NAME') }}</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <link rel="{{ env('APP_NAME') }}" href="<?= url('images/logo.png') ?>">
</head>

<body>
  <noscript>
    <strong>We're sorry but Vue.js doesn't work properly without JavaScript enabled. Please enable it to
      continue.</strong>
  </noscript>
  <div id="app">
    <!-- begin #page-loader -->
    <div id="page-loader" class="fade show"><span class="spinner"></span></div>
    <!-- end #page-loader -->
  </div>
  <script src="{{ url('') . mix('js/app.js') }}"></script>
</body>

</html>