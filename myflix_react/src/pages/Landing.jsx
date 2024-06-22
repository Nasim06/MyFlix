
import "../utils/moving-cards.css";


export default function Landing() {
  return (
    <div id='container'>
        <div className='scroll' id='scroll-one'>
            <div className='item'>Item 1</div>
            <div className='item'>Item 2</div>
            <div className='item'>Item 3</div>
            <div className='item'>Item 4</div>
            <div className='item'>Item 5</div>
            <div className='item'>Item 6</div>
            <div className='item'>Item 7</div>
            <div className='item'>Item 8</div>
            <div className='item'>Item 9</div>
            <div className='item'>Item 10</div>
        </div>
        <div className='scroll' id='scroll-two'>
            <div className='item'>Item 1</div>
            <div className='item'>Item 2</div>
            <div className='item'>Item 3</div>
            <div className='item'>Item 4</div>
            <div className='item'>Item 5</div>
            <div className='item'>Item 6</div>
            <div className='item'>Item 7</div>
            <div className='item'>Item 8</div>
            <div className='item'>Item 9</div>
            <div className='item'>Item 10</div>
        </div>
        <div className='fade'></div>
    </div>
  )
}
