import type {ImageMetadata} from 'astro';
import './Card.css';
export type CardSize = 'tiny' | 'small' | 'medium' | 'large';
interface Props {
  title: string;
  description: string;
  cover?: ImageMetadata;
  date: string;
  readTime: string;
  link: string;
  size?: CardSize;
}

export function Card(props: Props) {
  const {title, description, cover, date, readTime, link, size = 'tiny'} = props;

  return (
    <a href={link} className={`card card-${size}`}>
      {cover ? <img src={cover.src} alt={title} className={`cover cover-${size}`} /> : null}
      <div className={`time time-${size}`}>
        {date}·{readTime}
      </div>
      <div className={`title title-${size}`}>{title}</div>
      <p className={`desc desc-${size}`}>{description}</p>
    </a>
  );
}
