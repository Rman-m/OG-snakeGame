import React, { useMemo } from "react";
import { GameWrapper } from "../../assets/style/gameStyle.styled";
import { Group } from "@mantine/core";
import BoxElemment from "./BoxElemment";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Badge } from "@mantine/core";
import { useTheme } from "styled-components";

function Snake() {
	const date = new Date()
	const [snakePosition, setSnakePosition] = useState({ top: 50, left: 50 });
	const [fruitPosition, setfruitPosition] = useState({ top: -50, left: -50 });
	const [bodyPart, setBodyPart] = useState([]);
	const [direction, setDirection] = useState("");
	const [score, setScore] = useState(0);
	const [dateKey] = useState(`${date.getMonth()}/${date.getDate()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
	const [lose, setLose] = useState(false)
	const redirect = useNavigate();

	let gameLoop = null
	useEffect(() => {
		 gameLoop = setTimeout(function () {
			if (direction == "w")
				setSnakePosition(({ top, left }) => ({
					top: top < 5 ? 95 : top - 5,
					left,
				}));
			if (direction == "s")
				setSnakePosition(({ top, left }) => ({
					top: top > 90 ? 0 : top + 5,
					left,
				}));
			if (direction == "d")
				setSnakePosition(({ top, left }) => ({
					top,
					left: left > 90 ? 0 : left + 5,
				}));
			if (direction == "a")
				setSnakePosition(({ top, left }) => ({
					top,
					left: left < 5 ? 95 : left - 5,
				}));
		}, 100);
		if (
			Object.is(snakePosition.top, fruitPosition.top) &&
			Object.is(snakePosition.left, fruitPosition.left)
		)
			setScore((prev) => prev + 1);
	}, [snakePosition, direction]);



	useEffect(()=>{
		setBodyPart((prev) => {
			if(score == 0) return prev
			const newBody = [...prev];
			(prev.length !== score)&& newBody.pop()
			
			newBody.unshift(snakePosition);
			return newBody;
		});
		if(bodyPart.some(item => (item.left == snakePosition.left) && item.top == snakePosition.top )){
			setLose(true)
		}
		return () => {
			clearTimeout(gameLoop)
		};
	},[snakePosition]);

	useEffect(() => {

		const newLeft = Math.floor(Math.random() * (20 + 1)) * 5;
		const newTop = Math.floor(Math.random() * (20 + 1)) * 5;
		setfruitPosition({
			top: newTop == 100 ? newTop - 5 : newTop,
			left: newLeft == 100 ? newLeft - 5 : newLeft,
		});
	}, [score]);
	const memoizedFruitPosition = useMemo(() => fruitPosition, [fruitPosition]);

	const keyDownEvent = ({ key }) => {
		clearTimeout(gameLoop);
		if (key === "Enter") {
			endHandler(score);
		}
		setDirection((prev) => {
			if ((prev == "w" || prev == "s") && (key == "w" || key == "s"))
				return prev;
			if ((prev == "a" || prev == "d") && (key == "a" || key == "d"))
				return prev;
			return key;
		});
	};

	useEffect(() => {
		window.addEventListener("keydown", keyDownEvent);
		return () => {
			window.removeEventListener("keydown", keyDownEvent);
		};
	}, []);


	useEffect(() =>{
		const prevScores = JSON.parse(localStorage.getItem("scores")) || {}

		prevScores[dateKey] =  score
		console.log(prevScores)
		localStorage.setItem(
			"scores",
			JSON.stringify(prevScores)
		);
	},[score])

	const endHandler = () => {
		redirect("/");
	};

	useEffect(() => {

	}, [score]);

	const { color } = useTheme();

	const gradientScore = {
		from: color.main,
		to: color.secondary,
	};
	

	return (
		<>
		 {!lose ?  <GameWrapper>
			<Badge size="xl" variant="gradient" radius="sm" gradient={gradientScore}>
				Score: {score}
			</Badge>
			<Group position="center">
				<div className="play-ground">
					<BoxElemment boxPosition={snakePosition} />
					<BoxElemment boxPosition={memoizedFruitPosition} />
					
					{bodyPart.length && bodyPart.map((item, index) => (
						<BoxElemment key={Math.random()} boxPosition={item} />
					))}
				</div>
			</Group>
		</GameWrapper> : <Navigate to="/scores"/>
		}
		</>
		 
	);
}

export default Snake;
