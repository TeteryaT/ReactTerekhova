import React, { useState } from 'react';
import './App.css';

const Clock = ({ format, timezone }) => {
  const [time, setTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const localOffset = now.getTimezoneOffset() * 60000;
    let offsetMs = 0;

    if (timezone !== 'local') {
      const match = timezone.match(/([+-])(\d{1,2}):(\d{2})/);
      if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2]);
        const minutes = parseInt(match[3]);
        offsetMs = sign * (hours * 60 + minutes) * 60000;
      }
    }

    const adjustedTime = new Date(now.getTime() + localOffset + offsetMs);
    let hours = adjustedTime.getHours();
    const minutes = adjustedTime.getMinutes().toString().padStart(2, '0');
    const seconds = adjustedTime.getSeconds().toString().padStart(2, '0');

    if (format === '12') {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone, format]);

  return <div className="clock">Время: {time}</div>;
};

const professionData = {
  Developer: ['GitHub', 'Stack Overflow', 'MDN Web Docs', 'Dev.to', 'React Docs', 'CSS-Tricks', 'CodePen'],
  Designer: ['Behance', 'Dribbble', 'Figma', 'Adobe', 'DesignModo', 'Uplabs', 'Canva'],
  Teacher: ['Google Classroom', 'Khan Academy', 'Coursera', 'Edmodo', 'Zoom', 'TED-Ed', 'Duolingo'],
  Doctor: ['PubMed', 'WebMD', 'Mayo Clinic', 'Healthline', 'Medscape', 'WHO', 'UpToDate'],
  Engineer: ['IEEE', 'Engineering Toolbox', 'SolidWorks', 'Autodesk', 'Coursera Engineering', 'ResearchGate', 'EDN Network'],
};

const JobSelector = ({ selected, onChange }) => (
  <div>
    <label htmlFor="prof-select">Выберите профессию:</label><br />
    <select id="prof-select" value={selected} onChange={e => onChange(e.target.value)}>
      {Object.keys(professionData).map(prof => (
        <option key={prof} value={prof}>{prof}</option>
      ))}
    </select>
  </div>
);

const JobMenu = ({ profession }) => {
  const items = professionData[profession] || [];
  return (
    <div>
      <h3>Полезные ссылки для: {profession}</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}><a href="#" target="_blank" rel="noopener noreferrer">{item}</a></li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  const [profession, setProfession] = useState('Developer');
  const [format, setFormat] = useState('24');
  const [timezone, setTimezone] = useState('+3:00');

  return (
    <div>
      <h2>Лабораторная работа №2</h2>
      <div>
        <label>Формат времени:</label>
        <select value={format} onChange={e => setFormat(e.target.value)}>
          <option value="24">24 часа</option>
          <option value="12">12 часов</option>
        </select>

        <label>Часовой пояс:</label>
        <select value={timezone} onChange={e => setTimezone(e.target.value)}>
          <option value="local">Локальный</option>
          <option value="-8:00">-8:00 (США, Калифорния)</option>
          <option value="-5:00">-5:00 (Нью-Йорк)</option>
          <option value="0:00">0:00 (Гринвич)</option>
          <option value="+3:00">+3:00 (Минск, Москва)</option>
          <option value="+5:30">+5:30 (Индия)</option>
          <option value="+9:00">+9:00 (Япония)</option>
        </select>
      </div>

      <Clock format={format} timezone={timezone} />

      <hr />
      <JobSelector selected={profession} onChange={setProfession} />
      <JobMenu profession={profession} />
    </div>
  );
}

export default App;