import styled from 'styled-components';
export interface ButtonProps {
    mode?: keyof typeof theme;
}
const theme = {
    default: { bg: '#fff', color: 'inherit' },
    main: { bg: '#22366f', color: '#fff' },
    active: { bg: '#11B39B', color: '#fff' },
};
const Button = styled.button<ButtonProps>`
    background: ${({ mode }) => mode && theme[mode].bg};
    color: ${({ mode }) => mode && theme[mode].color};
`;

export default Button;
