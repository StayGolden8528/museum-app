import React from 'react';




function DisplayArea (props) {

		return (
			<div className="displayArea">
				{ 
					props.art.length > 0 ? (
						<div className = "showResults" >
							<p> Showing results for: { props.currentSearch }</p> 
							<div className = "artworks" >
								{
									props.art.map(item => {
										const { id, title, webImage,
										principalOrFirstMaker: artist } = item;

										return (
											<div key= { id } className = "art">
												<img src={webImage.url } alt = ""/>
												<h2 > { title} </h2> 
												<h3> { artist } </h3> 
											</div>
										);
									})
								}
							</div> 
						</div>
				) : (
						<div className = "noResults" >
							<p> Please enter a search term. </p> 
						</div>
				)

			}
			</div>
		);
	}


export default DisplayArea;