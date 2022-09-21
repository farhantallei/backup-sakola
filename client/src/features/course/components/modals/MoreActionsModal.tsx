import { Modal } from '@app/components';

interface MoreActionsModalProps {
  open: boolean;
  handleClose: () => void;
}

function MoreActionsModal({ open, handleClose }: MoreActionsModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      Test
    </Modal>
  );
}

export default MoreActionsModal;
