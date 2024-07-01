import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ComicData {
    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
}

function fetchComic(): void {
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;
    const email = emailInput?.value;
    if (!email) {
        console.error('Email input is empty');
        return;
    }

    fetch(`https://fwd.innopolis.university/api/hw2?email=${encodeURIComponent(email)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyText = doc.body.textContent?.trim();
            const comicId = parseInt(bodyText || '', 10);
            if (isNaN(comicId)) {
                console.error('Invalid comic ID');
                return;
            }

            return fetch(`https://fwd.innopolis.university/api/comic?id=${comicId}`);
        })
        .then(response => {
            if (!response) {
                throw new Error('Response is undefined');
            }
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            return response.json();
        })
        .then((comicData: ComicData) => {
            const comicInfoDiv = document.getElementById('comicInfo');
            if (comicInfoDiv) {
                comicInfoDiv.innerHTML = `
                    <p>Month: ${comicData.month}</p>
                    <p>Number: ${comicData.num}</p>
                    <p>Year: ${comicData.year}</p>
                    <p>Upload Date: ${new Date(comicData.day).toLocaleDateString()}</p>
                    <p>Heading: ${comicData.safe_title}</p>
                    <p>Description: ${comicData.transcript}</p>
                    <img src="${comicData.img}" alt="${comicData.alt}">
                `;
            } else {
                console.error('Element with id "comicInfo" not found');
            }
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comicForm');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            fetchComic();
        });
    }
});
