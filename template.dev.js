module.exports = ({command}) =>
`<head>
    <link rel="stylesheet" type="text/css" href="/resources/css/styles.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/console.css">

    <script src="/node_modules/react/umd/react.development.js"></script>
    <script src="/node_modules/react-dom/umd/react-dom.development.js"></script>
</head>
<body>
    <div id="root"></div>
    <script src="/dev/js/scripts.js"></script>
    <script>
        window.onload = function() {
            TerminalApp.start(${command ? "'" + command + "'" : ""});
        }
    </script>
</body>`