import React, { useState } from "react";
import { Accordion, Button } from "@mantine/core";
import { Link } from "react-router-dom";

function Scores() {
	const scores = JSON.parse(localStorage.getItem("scores"));
	console.log(scores);
	if (scores == null) {
		return (
			<>
				<p>no scores right now</p>
				<Link to={`/game`}>PALY</Link>
			</>
		);
	}
	return (
		<div>
			<Button variant="outline" component={Link} to="/">
				Go to home
			</Button>
			<Accordion>
				{Object.entries(scores).map((item) => (
					<Accordion.Item label={`date : ${item[0]}`} key={item[0]}>
						Score: {item[1]}
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
}

export default Scores;
