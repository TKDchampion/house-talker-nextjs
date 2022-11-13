import Modal from "react-bootstrap/Modal";

interface Props {
  title?: string;
  isOpen: boolean;
  setStatus:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<boolean>;
  children?: React.ReactNode;
}

const Dialogue: React.FC<Props> = ({ title, isOpen, setStatus, children }) => {
  const handleClose = () => setStatus(false);

  return (
    <Modal show={isOpen} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h1 className="modal-title">{title}</h1>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default Dialogue;
