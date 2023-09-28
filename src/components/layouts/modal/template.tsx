import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { variantsHidden } from "../../../services/config";

interface PropsAux {
  open?: any;
  toggle?: any;
  children: any;
  disableClose?: any;
  preventHideClickOverlay?: any;
}
const ModalView = ({ open, toggle, children, disableClose, preventHideClickOverlay }: PropsAux) => {
  useEffect(() => {
    const handleClose = (event: any) => {
      const code = event.keyCode || event.which;
      if (code === 27) toggle();
    };
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={variantsHidden}
          initial="hidden"
          exit="hidden"
          animate="visible"
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
          className="fixed flex items-center md:justify-center z-[10000] top-0 left-0 w-screen h-screen"
        >
          <div onClick={disableClose || preventHideClickOverlay ? () => {} : toggle} className="absolute z-50 inset-0 top-0 left-0 w-screen h-screen bg-black/60"></div>
          <div className="relative z-50 md:mx-0 md:mx-[20px] w-full md:w-auto">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ModalView;
