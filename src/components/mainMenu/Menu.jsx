import React from "react";
import { Button, SimpleGrid } from "@mantine/core";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import { MenuWrapper } from "../../assets/style/menuStyle.styled";
import { useMemo } from "react";
import { GiSnake, MdScore, AiTwotoneSetting} from "react-icons/all"

function Menu() {
	const { color } = useTheme();
	console.log(color);
	const gradientButton = useMemo(()=> ({
		 from: color.secondary, 
		 to: color.accent 
		}))

	return (
		<MenuWrapper theme={color}>
			<SimpleGrid cols={1}>
				<Button
					component={Link}
					variant="gradient"
					gradient={gradientButton}
					radius="lg"
					size="xl"
					to="/game"
				>
					
					Start &nbsp; <GiSnake/>
				</Button>
				<Button
					gradient={gradientButton}
					component={Link}
					className="menu-btn"
					variant="gradient"
					radius="lg"
					size="xl"
					to="/scores"
				>
					Score  &nbsp; <MdScore/>
				</Button>
				<Button
					gradient={gradientButton}
					component={Link}
					to="/settings"
					variant="gradient"
					radius="lg"
					size="xl"
				>
					Settings &nbsp; <AiTwotoneSetting/>
				</Button>
			</SimpleGrid>
		</MenuWrapper>
	);
}

export default Menu;
