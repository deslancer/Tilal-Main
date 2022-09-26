import styled from 'styled-components';
import { useModal } from '../../../hooks/useModal';

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    z-index: 4;
    background: rgba(0, 0, 0, 0.7);
`;

const ModalWrapper: React.FC<{ children: JSX.Element }> = function ({
    children,
}) {
    const { close } = useModal();
    return (
        <Wrapper onMouseDown={(e) => e.target === e.currentTarget && close()}>
            {children}
        </Wrapper>
    );
};

export default ModalWrapper;
