class PackageBox extends React.Component {
	constructor(props) { 
		super(props);
		this.state = { test: true };
	};

	render() {
		return (
			<div className="box b5 container ground margin-top-10 padding-10 pointer shadow-2-hover" onClick={() => alert(this.props.pack.id+','+this.props.pack.name)}>
				{this.props.pack.image ? (<div className="box b1"><img className="image-card" src={this.props.pack.image}/></div> ) : 
				( <div className="box b1"><img className="image-card" src={"/images/product/no-product.png"} /></div> )}
				{( <div className="box b1 avant-garde center padding-10 bold" style={{ color: "#323232" }}>{ this.props.pack.name + ' - ' +this.props.pack.color }</div> )}
				{( <div className="box b1 em15 center italic bold" style={{ color: "#467846" }}>{"$"+this.props.pack.price.toFixed(2)}</div> )}
			</div>
		);
	}
};