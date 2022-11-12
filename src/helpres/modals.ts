import LoadingScreen from '../components/modals/LoadingScreen';
import RegisterInterestsForm from '../components/modals/RegisterInterestsForm';
import ConfirmationModal from "../components/modals/ConfirmationModal";

export type modals = keyof typeof modalWindows;
const modalWindows = {
    loading: LoadingScreen,
    registerInterset: RegisterInterestsForm,
    confirmation: ConfirmationModal
};

export default modalWindows;
