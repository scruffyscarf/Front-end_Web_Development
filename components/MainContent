import React, { useEffect, useState } from 'react';
import Dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
Dayjs.extend(relativeTime);

interface Project {
    title: string;
    description: string;
}

interface SocialLink {
    platform: string;
    url: string;
}

const MainContent: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([
        { title: 'Project Satellite', description: 'Описание проекта...' },
        { title: 'Daily Meeting Telegram Bot', description: 'Описание проекта...' }
    ]);

    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { platform: 'GitHub', url: 'https://github.com/scruffyscarf' },
        { platform: 'Telegram', url: 'https://t.me/scruffyscarf' },
        { platform: 'VK', url: 'https://vk.com/scruffyscarf' }
    ]);

    // Здесь может быть логика для получения данных, например, из API

    return (
        <main>
            {/* Описание */}
            <section className="rectangle about">
                <h2>About me</h2>
                <p>Мой текст...</p>
            </section>

            {/* Список проектов */}
            <section className="rectangle">
                <h2>My projects</h2>
                <ul className="list">
                    {projects.map((project, index) => (
                        <li key={index}>{project.title}</li>
                    ))}
                </ul>
            </section>

            {/* Контакты */}
            <section className="rectangle contacts">
                <h1 className="social">Social Media</h1>
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.url}>{link.platform}</a>
                ))}
            </section>
        </main>
    );
};

export default MainContent;

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
