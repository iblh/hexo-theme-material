(function () {
    var ibContainer;
    var browserIcons;
    var scriptPath;
    var browserName;
    var imgPath;
    var html;

    ibContainer = document.createElement('div');
    ibContainer.setAttribute('id', 'ib-container');

    var html="";
    html += "<div class=\"ib-modal\">";
    html += "    <div class=\"ib-header\">";
    html += "        <h1>您的浏览器需要更新<\/h1>";
    html += "        <p>为了保证页面的正常显示并保护您的个人信息，";
    html += "            <br><strong>请使用以下新版浏览器<\/strong>";
    html += "        <\/p>";
    html += "    <\/div>";
    html += "    <ul class=\"ib-browsers\">";
    html += "        <li>";
    html += "            <a href=\"http:\/\/www.google.cn\/chrome\/browser\/desktop\/index.html\">";
    html += "                <i class=\"ib-browser-icon ib-ua-chrome\"><\/i>";
    html += "                <div class=\"ib-browser-name\">Chrome<\/div>";
    html += "                <div class=\"ib-browser-description\">谷歌推出的快速, 简单, 稳定且安全的浏览器<\/div>";
    html += "            <\/a>";
    html += "        <\/li>";
    html += "        <li>";
    html += "            <a href=\"http:\/\/www.firefox.com.cn\" target=\"_blank\">";
    html += "                <i class=\"ib-browser-icon ib-ua-firefox\"><\/i>";
    html += "                <div class=\"ib-browser-name\">Firefox<\/div>";
    html += "                <div class=\"ib-browser-description\">最快的浏览器<\/div>";
    html += "            <\/a>";
    html += "        <\/li>";
    html += "        <li>";
    html += "            <a href=\"https:\/\/www.apple.com\/cn\/safari\" target=\"_blank\">";
    html += "                <i class=\"ib-browser-icon ib-ua-safari\"><\/i>";
    html += "                <div class=\"ib-browser-name\">Safari<\/div>";
    html += "                <div class=\"ib-browser-description\">由苹果公司设计用于Mac的产品<\/div>";
    html += "            <\/a>";
    html += "        <\/li>";
    html += "        <li>";
    html += "            <a href=\"http:\/\/www.opera.com\/zh-cn\" target=\"_blank\">";
    html += "                <i class=\"ib-browser-icon ib-ua-opera\"><\/i>";
    html += "                <div class=\"ib-browser-name\">Opera<\/div>";
    html += "                <div class=\"ib-browser-description\">快速, 小巧的浏览器<\/div>";
    html += "            <\/a>";
    html += "        <\/li>";
    html += "    <\/ul>";
    html += "    <div class=\"ib-footer\">";
    html += "        <a class=\"ib-try\" href=\"http:\/\/www.google.cn\/chrome\/browser\/desktop\/index.html\">试试Chrome<\/a>";
    html += "    <\/div>";
    html += "<\/div>";
    html += "<div class=\"ib-mask\"><\/div>";
    html += "";


    ibContainer.innerHTML = html;

    // the path to the image cannot be relative in a filter. Have to use javascript to get the absolute path.
    browserIcons = ibContainer.getElementsByTagName('i');

    for (var i = 0; i < document.scripts.length; i++) {

        if (match = document.scripts[i].src.match(/(.*)ie-blocker.zhCN\.js/)) {
            scriptPath = match[1];
            imgPath = scriptPath + (document.scripts[i].getAttribute('img-path') || 'img/');
            break;
        }
    }

    for (var i = 0; i < browserIcons.length; i++) {
        if (browserName = browserIcons[i].className.match(/ib-ua-(\w+)/)[1]) {
            browserIcons[i].style['filter'] = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                imgPath + browserName + '.png")';
        }
    }

    window.onload = function () {

        document.body.appendChild(ibContainer);

        ibContainer.style.display = 'block';
    };
})();
