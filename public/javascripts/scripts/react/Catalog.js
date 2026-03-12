class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
  	console.log(this.props);
  	return (<div>{this.props.color}</div>)
  }
}