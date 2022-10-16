import styled from 'styled-components';
const widthBoxes = "5%"
export const GameWrapper = styled.div`
    width: 100%;
    height: 100%;
    .play-ground{
        width: 50%;
        aspect-ratio: 1/1 ;
        background-color: red;
        position: relative;
    }
`
export const BoxElemment = styled.div`
    width: ${widthBoxes};
    aspect-ratio: 1/1;
    background-color:green;
    position: absolute;
    top: ${({top}) => `${top}%`};
    left: ${({left}) => `${left}%`};
`;