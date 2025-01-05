import { StarIcon } from "lucide-react"
import { extractProblemDetails } from "../utils/extractProblemDetails.utils"

function Content() {
  console.log(extractProblemDetails());
  return (
    <div>
      <button className="p-2 rounded-full bg-gray-400 text-yellow-400">
        <StarIcon/>
      </button>
    </div>
  )
}

export default Content