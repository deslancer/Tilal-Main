import LoadingScreen from '../modals/LoadingScreen';

export type modals = keyof typeof modalWindows;
const modalWindows = {
    loading: LoadingScreen,
};

export default modalWindows;
