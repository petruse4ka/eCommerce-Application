import '../styles.css';

import macaronImage from '@/assets/favicons/original.png';

const app = document.createElement('div');
app.className = 'min-h-screen bg-[#1a1a2e] text-[#e6e6e6] font-roboto text-base leading-normal';

const title = document.createElement('h1');
title.className = 'text-3xl font-bold p-4';
title.textContent = 'eCommerce Application';

const image = document.createElement('img');
image.src = macaronImage;

app.append(title, image);
document.body.append(app);
