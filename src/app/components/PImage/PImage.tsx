import './PImage.css';

function PImage(props: any) {
  return (
    <img 
      className={props.className} 
      src={props.src} 
      alt={props.alt} />
  ) 
}

export default PImage;