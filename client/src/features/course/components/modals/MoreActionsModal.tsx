import { Modal } from '@app/components';

interface MoreActionsModalProps {
  handleClose: () => void;
}

function MoreActionsModal({ handleClose }: MoreActionsModalProps) {
  return <Modal title="More Actions" onClose={handleClose}></Modal>;
}

export default MoreActionsModal;
