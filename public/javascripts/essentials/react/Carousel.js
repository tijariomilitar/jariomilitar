// const Carousel = ({ slides }) => {
//   const [current, setCurrent] = useState(0);
//   const length = slides.length;
// 
//   const nextSlide = () => {
//     setCurrent(current === length - 1 ? 0 : current + 1);
//   };
// 
//   const prevSlide = () => {
//     setCurrent(current === 0 ? length - 1 : current - 1);
//   };
// 
//   if (!Array.isArray(slides) || slides.length <= 0) {
//     return null;
//   }
// 
//   return (
//     <section className='slider'>
//       <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
//       <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
//       {SliderData.map((slide, index) => {
//         return (
//           <div
//             className={index === current ? 'slide active' : 'slide'}
//             key={index}
//           >
//             {index === current && (
//               <img src={slide.image} alt='travel image' className='image' />
//             )}
//           </div>
//         );
//       })}
//     </section>
//   );
// };
// 
// export default Carousel;

class Carousel extends React.Component {
  constructor(props) { 
    super(props);
    this.state = { 
      current: 0,
      length: this.props.slides.length
    };
  };


  render() {
    console.log(this.props.slides);
    let prevSlide = () => { 
      let slide = this.state.current === 0 ? this.state.length - 1 : this.state.current - 1; 
      this.setState({ current: slide }); 
      console.log(this.state.current) 
    };

    let nextSlide = () => { 
      let slide = this.state.current === this.state.length - 1 ? 0 : this.state.current + 1; 
      this.setState({ current: slide }); 
      console.log(this.state.current)
    };
    
    return (
      <div className="box b1 container">
        <div className="box b8" onClick={prevSlide}>{'<<'}</div>
        <div className="box b3-4">
          {SliderData.map((slide, index) => {
            return (
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}
              >
                {index === current && (
                  <img src={slide.image} alt='travel image' className='image' />
                )}
              </div>
            );
          })}
        </div>
        <div className="box b8" onClick={nextSlide}>{'>>'}</div>
      </div>
    );
  }
};