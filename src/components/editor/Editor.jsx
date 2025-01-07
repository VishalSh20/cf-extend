import { toast, Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import { Dialog , DialogPanel, DialogTitle} from "@headlessui/react";
import { X } from "lucide-react";
import CodeBlock from "./CodeBlock";
import ProblemBlock from "./ProblemBlock";

Editor.propTypes = {
  problemDetails: PropTypes.object.isRequired,
  showEditor: PropTypes.bool.isRequired,
  setShowEditor: PropTypes.func.isRequired,
};

export default function Editor({ problemDetails, setShowEditor }) {
  toast.success("Editor loaded!");
  console.log(problemDetails);

  return (
    <Dialog
      open={true} // Always true since it's the full-screen modal
      onClose={() => {}} // Prevent closing on outside click or escape
      className="relative z-50"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-75" aria-hidden="true"></div>

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-4">

        <DialogPanel
          className="flex flex-col items-center w-full h-full border-2 border-indigo-600 bg-gradient-to-br from-indigo-900 to-black/50 rounded-lg overflow-y-scroll"
        >

          {/* Title */}
          <DialogTitle className="text-3xl text-white font-bold">
            {String(problemDetails.contestId) + "." + problemDetails.problemIndex + " " + problemDetails.title}
            </DialogTitle>
          {/* Close Button */}
          <div className="flex justify-end w-full p-2 focus-outline outline-1 outline-violet-500 rounded-full">
            <button
              className="text-gray-300 hover:text-gray-500"
              onClick={() => setShowEditor(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex w-full gap-4 p-2 bg-inherit">
            <ProblemBlock problemDetails={problemDetails} />
            <CodeBlock problemDetails={problemDetails} />
          </div>

          <Toaster />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
