module.exports = ({command}) =>
`<head>
    <link rel="stylesheet" type="text/css" href="/resources/css/styles.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/console.css">

    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script src="/js/scripts.js"></script>
    <script>
        window.onload = function() {
            TerminalApp.start(${command ? "'" + command + "'" : ""});
        }
    </script>
</body>`