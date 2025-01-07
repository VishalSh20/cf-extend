import PropTypes from "prop-types";
import { useState } from "react";
import { Disclosure,DisclosureButton,DisclosurePanel, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronDown, Edit, Trash2 } from "lucide-react";

TestInput.propTypes = {
  testCases: PropTypes.array.isRequired,
  setTestCases: PropTypes.func.isRequired,
};

function TestInput({ testCases, setTestCases }) {
  const [isUpdationModalOpen, setIsUpdationModalOpen] = useState(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] = useState(false);
  const [currentTestCase, setCurrentTestCase] = useState(null);
  const [savingAction, setSavingAction] = useState("Edit");

  const handleEdit = (index) => {
    if(index){
        setCurrentTestCase({ ...testCases[index], index });
        setIsUpdationModalOpen(true);
        setSavingAction("Edit");
    }
    else{
        setCurrentTestCase({ input: "", output: "" ,index:testCases.length});
        setIsUpdationModalOpen(true);
        setSavingAction("Add");
    }
  };

  const handleSave = () => {
    let updatedTestCases = [...testCases];
    updatedTestCases[currentTestCase.index] = {
      input: currentTestCase.input,
      output: currentTestCase.output,
    };
    setTestCases(updatedTestCases);
    setIsUpdationModalOpen(false);
  };

  const handleSaveWithDelete = () => {
    const deleteIndex = currentTestCase?.index;
    let updatedTestCases = [...testCases];
    updatedTestCases = updatedTestCases.filter((test,index)=>index!==deleteIndex);
    setTestCases(updatedTestCases);
  };

  const handleDelete = (deleteIndex) => {
    setCurrentTestCase({...testCases[deleteIndex],index:deleteIndex});
    setIsDeleteConfirmationModalOpen(true);
  }

  return (
    <div className="flex flex-col gap-4 p-2 items-start justify-start w-full max-h-screen bg-inherit overflow-y-scroll">
      <h2 className="text-xl text-gray-200">Test Cases:</h2>
      <div className="flex w-full justify-end p-2">
      <button
        className="flex items-center gap-2 mt-2 text-sm text-indigo-400 hover:text-indigo-500"
        onClick={() => handleEdit()}
      >
        <Edit size={16} />
            Add new testcase
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full items-start justify-start">
        {testCases?.map((testcase, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="w-full border border-gray-700 rounded-lg p-2 bg-gray-800/50">
                <DisclosureButton className="flex items-center justify-between w-full text-left">
                  <div className="flex w-full justify-between">
                  <span className="text-xl font-bold text-white">
                    Testcase {index + 1}
                  </span>
                   <button
                    className=" text-gray-400 hover:text-red-500"
                    onClick={()=>handleDelete(index)}
                   >
                    <Trash2 size={20}/>
                   </button>
                  </div>
                  <ChevronDown
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-300`}
                  />
                </DisclosureButton>
                <DisclosurePanel className="mt-2">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-end p-2">
                    <button
                      className="flex items-center gap-2 mt-2 text-sm text-indigo-400 hover:text-indigo-500"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit size={16} />
                      Edit Testcase
                    </button>
                    </div>
                    <label htmlFor={`input${index}`} className="text-white">
                      Input:
                    </label>
                    <pre className="overflow-x-auto text-gray-400">
                      {testcase.input}
                    </pre>
                    <label htmlFor={`output${index}`} className="text-white">
                      Expected Output:
                    </label>
                    <pre className="overflow-x-auto text-gray-400">
                      {testcase.output}
                    </pre>
                  </div>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog
        open={isUpdationModalOpen}
        onClose={() => setIsUpdationModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <DialogPanel className="w-[90%] max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg">
          <DialogTitle className="text-xl font-bold text-white mb-4">
            {savingAction} Testcase {currentTestCase?.index + 1}
          </DialogTitle>
          <div className="flex flex-col gap-4">
            <label htmlFor="editInput" className="text-white">
              Input:
            </label>
            <textarea
              id="editInput"
              value={currentTestCase?.input || ""}
              onChange={(e) =>
                setCurrentTestCase({
                  ...currentTestCase,
                  input: e.target.value,
                })
              }
              className="p-2 text-gray-800 bg-gray-300 rounded-md"
              rows={4}
            />
            <label htmlFor="editOutput" className="text-white">
              Expected Output+{savingAction==="Add" && "(optional)"}:
            </label>
            <textarea
              id="editOutput"
              value={currentTestCase?.output || ""}
              onChange={(e) =>
                setCurrentTestCase({
                  ...currentTestCase,
                  output: e.target.value,
                })
              }
              className="p-2 text-gray-800 bg-gray-300 rounded-md"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => setIsUpdationModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </DialogPanel>
      </Dialog>

    {/* Delete Confirmation Modal */}
    <Dialog
        open={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <DialogPanel className="w-[90%] max-w-lg bg-gray-900 p-6 rounded-lg shadow-lg">
            <DialogTitle className="text-xl font-bold text-white mb-4">
                Delete Testcase {currentTestCase?.index + 1}
            </DialogTitle>
            <div className="flex flex-col gap-4 bg-inherit text-white w-full">
            <span className="text-red-600 mb-4">
                Are you sure you want to delete this testcase?
            </span>
            <div className="flex justify-between gap-4">
                <button 
                className="p-4 hover:outline-1 outline-gray-200"
                onClick={() => setIsDeleteConfirmationModalOpen(false)}
                >
                    Cancel
                </button>
                <button
                className="p-4 text-white bg-red-600 hover:bg-red-500 rounded-md"
                onClick={()=>{
                    handleSaveWithDelete();
                }}
                >
                    Delete
                </button>
            </div>
            </div>
            </DialogPanel>
    </Dialog>

    </div>
  );
}


export default TestInput;
