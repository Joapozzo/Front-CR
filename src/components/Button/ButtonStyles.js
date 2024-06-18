import styled from "styled-components";

export const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 6px;
    background: ${({ bg }) => `var(--${bg})`};
    color: ${({ color }) => `var(--${color})`};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px
` 