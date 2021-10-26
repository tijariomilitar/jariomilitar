class CatalogFilter extends React.Component {
	constructor(props) { 
		super(props);
		this.state = {
			code: "",
			name: "",
			color_id: "",
			status: "",
			brand: "",
			price_category_id: 3,
			products: [],
			packs: [],
			colors: []
		};
	};

	async componentDidMount() {
		let colors = await API.response(Product.color.list);
		this.setState({ colors: colors });
	};

	render() {
		return (
			<div className="box b1 container container height-500 scroll-y">
				<input type="text" className="mobile-box b6 input-generic margin-top-5 center bold" placeholder="Código" autoComplete="off" onChange={evt => this.setState({ code: evt.target.value}) }></input>
				<input type="text" className="mobile-box b2 input-generic margin-top-5 center bold" placeholder="Nome do Produto" autoComplete="off" onChange={evt => this.setState({ name: evt.target.value }) }></input>
				<select className="mobile-box b6 input-generic margin-top-5 center bold">
					<option value="">Cor</option>
					{this.state.colors.length && this.state.colors.map(color => (
						<option key={color.id} value={color.id}>{color.name}</option>
					)) }
				</select>
				<button className="mobile-box b6 submit-generic margin-top-5 center bold" onClick={async () => {
					let product = {
						code: this.state.code,
						name: this.state.name,
						color_id: this.state.color_id,
						status: this.state.status,
						brand: this.state.brand,
						price_category_id: this.state.price_category_id
					};

					let response = await API.response(Catalog.filter, product);

					console.log(response);
					
					this.setState({ products: response.products });
					this.setState({ packs: response.packages });
				}}>Buscar</button>

				{ this.state.packs.map(pack => (
					<PackageBox key={pack.id} pack={pack} />
				)) }

				{ this.state.products.map(product => (
					<ProductBox key={product.id} product={product} />
				)) }
			</div>
		);
	};
};