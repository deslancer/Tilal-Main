import LoadingScreen from '../components/modals/LoadingScreen';
import RegisterInterestsForm from '../components/modals/RegisterInterestsForm';

export type modals = keyof typeof modalWindows;
const modalWindows = {
    loading: LoadingScreen,
    registerInterset: RegisterInterestsForm,
};

export default modalWindows;
