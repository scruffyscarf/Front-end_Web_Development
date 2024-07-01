"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
dayjs_1.default.extend(relativeTime_1.default);
function fetchComic() {
    var emailInput = document.getElementById('emailInput');
    var email = emailInput.value;
    if (!email)
        return;
    fetch("https://fwd.innopolis.university/api/hw2?email=".concat(encodeURIComponent(email)))
        .then(function (response) { return response.text(); })
        .then(function (html) {
            var _a;
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var bodyText = (_a = doc.body.textContent) === null || _a === void 0 ? void 0 : _a.trim();
            var comicId = parseInt(bodyText || '');
            if (isNaN(comicId))
                return;
            return fetch("https://fwd.innopolis.university/api/comic?id=".concat(comicId));
        })
        .then(function (response) { return response === null || response === void 0 ? void 0 : response.json(); })
        .then(function (comicData) {
            var comicInfoDiv = document.getElementById('comicInfo');
            if (comicInfoDiv) {
                comicInfoDiv.innerHTML = "\n                    <p>Month: ".concat(comicData.month, "</p>\n                    <p>Number: ").concat(comicData.num, "</p>\n                    <p>Year: ").concat(comicData.year, "</p>\n                    <p>Upload Date: ").concat((0, dayjs_1.default)(comicData.day).fromNow(), "</p>\n                    <p>Heading: ").concat(comicData.safe_title, "</p>\n                    <p>Description: ").concat(comicData.transcript, "</p>\n                    <img src=\"").concat(comicData.img, "\" alt=\"").concat(comicData.alt, "\">\n                ");
            }
        })
        .catch(function (error) { return console.error('Error:', error); });
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('comicForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (event) {
        event.preventDefault();
        fetchComic();
    });
});
