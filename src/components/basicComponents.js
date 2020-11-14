import styled from 'styled-components';

export const MainButton = styled.button`
    height: 45px;
    border-radius: 15px;
    outline: none;
    background-color: #133B5C;
    border: 3px solid #1E5F74;
    cursor: pointer;
    color: white;
    font-size: 23px;
    font-family: "Geo",sans-serif;
    &:hover{
        background-color: #0f3460;
    }
    &:disabled{
      opacity: 0.5;
      &:hover{
        background-color: #133B5C;
      }
    }
`


export const WalletConnectButton = styled.button`
cursor: pointer;
margin - top: 25px;
font - family: "Geo", sans - serif;
font - size: 1.6rem;
background: none;
color: white;
border: none;
`